import UserProgress from '../models/userProgressModel.js';
import LessonsProgress from '../models/lessonsProgressModel.js';


export const getUserProgress = async (req, res) => {
    try {
        const userId = req.user._id;
        console.log("Fetching progress for userId:", userId);
        const progressDoc = await UserProgress.findOne({ userId: userId });
        if (!progressDoc) {
            return res.status(404).json({
                success: false,
                message: "User progress not found"
            });
        }
        const lessonsList = await LessonsProgress.find({userId: userId});

        if (!lessonsList) {
            return res.status(404).json({
                success: false,
                message: "Lessons progress not found"
            });
        }

        const requiredLessonList = lessonsList.map(lesson => ({
            lessonId: lesson.lessonId,
            bestScore: lesson.bestScore,
            totalSuccAttempts: lesson.totalSuccAttempts
        }));

        res.json({
            success: true,
            lessonsStats : requiredLessonList,
            categoryStats: progressDoc.categoryStats,
            dailyCount: progressDoc.dailyCount
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ 
            success: false,
            message: "Server error" 
        });
    }
};



//============================= Update Operations =============================


export const updateProgressStats = async (req, res) => {
    console.log("=== UPDATE-PROGRESS-STATS : Starting ===");
    
    try {
        // ================= Step 1: Validate Input Data =================
        let { lessonId, category, difficulty, currentScore } = req.body;
        const userId = req.user._id;
        
        // Log received data
        console.log("Received data:");
        console.log("- userId:", userId);
        console.log("- lessonId:", lessonId);
        console.log("- category:", category);
        console.log("- difficulty:", difficulty);
        console.log("- currentScore:", currentScore);
        
        // Validate required fields
        if (!lessonId || !category || !difficulty || currentScore === undefined) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: lessonId, category, difficulty, currentScore"
            });
        }
        
        // Parse and validate data
        difficulty = parseInt(difficulty);
        currentScore = parseInt(currentScore);
        
        if (difficulty < 1 || difficulty > 12) {
            return res.status(400).json({
                success: false,
                message: "Difficulty must be between 1 and 12"
            });
        }
        
        if (currentScore < 0 || currentScore > 100) {
            return res.status(400).json({
                success: false,
                message: "Score must be between 0 and 100"
            });
        }
        
        const PASSING_SCORE = 80;
        const hasPassed = currentScore >= PASSING_SCORE;
        
        console.log("Passing criteria check:");
        console.log("- Required score:", PASSING_SCORE);
        console.log("- User score:", currentScore);
        console.log("- Has passed:", hasPassed); 
        
        // ================= Step 2: Check LessonsProgress =================
        console.log("\n--- Checking LessonsProgress ---");
        
        let lessonProgress = await LessonsProgress.findOne({ 
            userId, 
            lessonId 
        });
        
        let shouldUpdateTotalCount = false;
        let isNewAchievement = false;
        
        if (!lessonProgress) {
            // New lesson attempt
            console.log("Creating new LessonsProgress entry");
            lessonProgress = await LessonsProgress.create({
                userId,
                lessonId,
                bestScore: currentScore,
                totalSuccAttempts: hasPassed ? 1 : 0
            });
            
            // Should update total count only if passed
            shouldUpdateTotalCount = hasPassed;
            isNewAchievement = hasPassed;
            console.log("✓ Created new LessonsProgress");
            
        } else {
            // Existing lesson
            console.log("Found existing LessonsProgress");
            console.log("- Previous bestScore:", lessonProgress.bestScore);
            console.log("- Current score:", currentScore);
            
            const previouslyPassed = lessonProgress.bestScore >= PASSING_SCORE;
            
            // Update best score if current is better
            if (currentScore > lessonProgress.bestScore) {
                lessonProgress.bestScore = currentScore;
                console.log("✓ Updated bestScore to:", currentScore);
            }
            
            // Increment successful attempts if passed
            if (hasPassed) {
                lessonProgress.totalSuccAttempts += 1;
                console.log("✓ Incremented totalSuccAttempts to:", lessonProgress.totalSuccAttempts);
            }
            
            // Should update total count only if:
            // 1. User passed this time AND
            // 2. Previously didn't have a passing score
            shouldUpdateTotalCount = hasPassed && !previouslyPassed;
            isNewAchievement = shouldUpdateTotalCount;
            
            console.log("Should update total count:", shouldUpdateTotalCount);
            console.log("(Previously passed:", previouslyPassed, ", Currently passed:", hasPassed, ")");
            
            await lessonProgress.save();
        }
        
        // ================= Step 3: Update UserProgress =================
        console.log("\n--- Updating UserProgress ---");
        
        let userProgress = await UserProgress.findOne({ userId });
        
        if (!userProgress) {
            console.log("Creating new UserProgress document");
            userProgress = await UserProgress.create({
                userId,
                categoryStats: [],
                dailyCount: [],
            });
        }
        
        // ================= Step 3.1: Update Daily Count (ALWAYS) =================
        if(hasPassed) {
            console.log("\n--- Updating dailyCount (every attempt) ---");
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const todayStr = today.toISOString().split('T')[0];
            
            console.log("Today's date:", todayStr);
            
            let dailyEntry = userProgress.dailyCount.find(
                entry => {
                    const entryDate = new Date(entry.date);
                    entryDate.setHours(0, 0, 0, 0);
                    return entryDate.toISOString().split('T')[0] === todayStr;
                }
            );
            
            if (dailyEntry) {
                dailyEntry.count += 1;
                console.log("✓ Updated existing daily entry, new count:", dailyEntry.count);
            } else {
                userProgress.dailyCount.push({
                    date: today,
                    count: 1
                });
                console.log("✓ Created new daily entry");
                
                // Keep only last 7 days
                if (userProgress.dailyCount.length > 7) {
                    userProgress.dailyCount.sort((a, b) => new Date(b.date) - new Date(a.date));
                    userProgress.dailyCount = userProgress.dailyCount.slice(0, 7);
                    console.log("✓ Trimmed dailyCount to last 7 days");
                }
            }
            
            userProgress.markModified('dailyCount');
        }

        // ================= Step 3.2: Update Category Stats (Only on first pass) =================
        if (shouldUpdateTotalCount) {
            console.log("\n--- Updating categoryStats (first time passing) ---");
            console.log("Category:", category, "Difficulty:", difficulty);
            
            let categoryEntry = userProgress?.categoryStats?.find(
                item => item.category === category
            );
            
            if (!categoryEntry) {
                console.log("Creating new category entry");
                categoryEntry = {
                    category,
                    difficulty: Array(12).fill(0)
                };
                userProgress.categoryStats.push(categoryEntry);
            } else {
                console.log("Found existing category entry");
            }
            
            const difficultyIndex = difficulty - 1;
            console.log("Difficulty index:", difficultyIndex);
            console.log("Current count:", categoryEntry.difficulty[difficultyIndex]);
            
            categoryEntry.difficulty[difficultyIndex] += 1;
            console.log("Updated count:", categoryEntry.difficulty[difficultyIndex]);
            
            userProgress.markModified('categoryStats');
        } else {
            console.log("\n--- Skipping totalCount update ---");
            console.log("Reason: Score below passing threshold or already achieved passing score previously");
        }
        
        
        
        // Save UserProgress
        await userProgress.save();
        console.log("✓ UserProgress saved successfully");
        
        // ================= Step 4: Return Response =================
        return res.status(200).json({
            success: true,
            message: "Progress stats updated successfully",
            data: {
                passed: hasPassed,
                isNewAchievement,
                currentScore,
                bestScore: lessonProgress.bestScore,
                totalSuccessfulAttempts: lessonProgress.totalSuccAttempts,
                dailyCountUpdated: true,
                totalCountUpdated: shouldUpdateTotalCount
            }
        });
        
    } catch (error) {
        console.error("✗ Error in updateProgressStats:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};
     