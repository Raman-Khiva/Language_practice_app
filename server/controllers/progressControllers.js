import UserProgress from '../models/userProgressModel.js';

//============================= Utility Functions =============================

// Helper function to clean ObjectId strings
const cleanObjectId = (objectIdString) => {
    if (typeof objectIdString === 'string' && objectIdString.startsWith('ObjectId(')) {
        const match = objectIdString.match(/ObjectId\('([^']+)'\)/);
        return match ? match[1] : objectIdString;
    }
    return objectIdString;
};

//============================= Create Operations =============================

// verified 


// add lesson to progress count
export const addToProgress = async (req, res) => {
    console.log("=== ADD-TO-PROGRESS : Starting ===");
    
    try {
        // ================= Step 1: Validate Input Data =================
        let { lessonId, category, difficulty, correctCount } = req.body;
        
        // Log received data
        console.log("Received data:");
        console.log("- lessonId:", lessonId);
        console.log("- category:", category);
        console.log("- difficulty:", difficulty, "Type:", typeof difficulty);
        console.log("- correctCount:", correctCount);
        
        // Validate and parse data
        if (!lessonId || !category || !difficulty || correctCount === undefined) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: lessonId, category, difficulty, correctCount"
            });
        }
        
        difficulty = parseInt(difficulty);
        correctCount = parseInt(correctCount);
        
        console.log("After parsing:");
        console.log("- difficulty:", difficulty, "Type:", typeof difficulty);
        console.log("- correctCount:", correctCount, "Type:", typeof correctCount);
        
        // Validate parsed data
        if (difficulty < 1 || difficulty > 12) {
            return res.status(400).json({
                success: false,
                message: "Difficulty must be between 1 and 12"
            });
        }
        
        if (correctCount < 0) {
            return res.status(400).json({
                success: false,
                message: "CorrectCount cannot be negative"
            });
        }
        
        const userId = req.user._id;
        lessonId = cleanObjectId(lessonId);
        
        // ================= Step 1.5: Check Passing Criteria =================
        const PASSING_SCORE = 9;
        const hasPassed = correctCount >= PASSING_SCORE;
        console.log("Passing criteria check:");
        console.log("- Required score:", PASSING_SCORE);
        console.log("- User score:", correctCount);
        console.log("- Has passed:", hasPassed);
        
        // ================= Step 2: Find or Create Progress Document =================
        let progressDoc = await UserProgress.findOne({ userId });
        console.log("Found existing progressDoc:", !!progressDoc);
        
        if (!progressDoc) {
            console.log("Creating new UserProgress document...");
            try {
                progressDoc = await UserProgress.create({ 
                    userId, 
                    totalCount: [],
                    dailyCount: [],
                    lessonsList: []
                });
                console.log("✓ Created new UserProgress document");
            } catch (err) {
                console.error("✗ Error creating UserProgress:", err);
                return res.status(500).json({ 
                    success: false, 
                    message: "Failed to create progress document",
                    error: err.message 
                });
            }
        }
        
        // ================= Step 3: Check if Lesson Already Exists =================
        console.log("\n--- Checking existing lessons ---");
        console.log("Current lessonsList:", progressDoc.lessonsList);
        
        const existingLessonIndex = progressDoc.lessonsList.findIndex(
            lesson => lesson.lessonId.toString() === lessonId.toString()
        );
        
        console.log("Existing lesson index:", existingLessonIndex);
        
        if (hasPassed) {
            console.log("\n=== USER PASSED (Score >= 9) ===");
            
            // Update daily count for passing score
            updateDailyCount(progressDoc);
            
            if (existingLessonIndex !== -1) {
                // ================= Case A: Lesson Exists & User Passed =================
                console.log("\n=== CASE A: Lesson Exists & User Passed ===");
                
                const existingLesson = progressDoc.lessonsList[existingLessonIndex];
                const oldScore = existingLesson.solved;
                
                console.log("Current solved count:", oldScore);
                console.log("New correct count:", correctCount);
                
                if (oldScore < PASSING_SCORE) {
                    console.log("Old score was below passing criteria - updating category & difficulty count");
                    // Previously didn't pass, now passes - update totalCount
                    updateTotalCount(progressDoc, category, difficulty);
                } else {
                    console.log("Old score was already passing - only updating lesson with max count");
                }
                
                // Update solved to max(currentSolved, newCorrectCount)
                const newSolvedCount = Math.max(existingLesson.solved, correctCount);
                existingLesson.solved = newSolvedCount;
                
                console.log("Updated solved count to:", newSolvedCount);
                
            } else {
                // ================= Case B: New Lesson & User Passed =================
                console.log("\n=== CASE B: New Lesson & User Passed ===");
                
                // Add to lessonsList
                progressDoc.lessonsList.push({
                    lessonId: lessonId,
                    solved: correctCount
                });
                console.log("✓ Added lesson to lessonsList with solved count:", correctCount);
                
                // Update totalCount for category and difficulty
                updateTotalCount(progressDoc, category, difficulty);
            }
            
        } else {
            console.log("\n=== USER FAILED (Score < 9) ===");
            
            if (existingLessonIndex !== -1) {
                // ================= Case C: Lesson Exists & User Failed =================
                console.log("\n=== CASE C: Lesson Exists & User Failed ===");
                
                const existingLesson = progressDoc.lessonsList[existingLessonIndex];
                console.log("Current solved count:", existingLesson.solved);
                console.log("New correct count:", correctCount);
                
                // Update solved to max(currentSolved, newCorrectCount) but don't affect counts
                const newSolvedCount = Math.max(existingLesson.solved, correctCount);
                existingLesson.solved = newSolvedCount;
                
                console.log("Updated solved count to:", newSolvedCount);
                console.log("No daily/category count updates (score below passing criteria)");
                
            } else {
                // ================= Case D: New Lesson & User Failed =================
                console.log("\n=== CASE D: New Lesson & User Failed ===");
                
                // Add to lessonsList but don't update counts
                progressDoc.lessonsList.push({
                    lessonId: lessonId,
                    solved: correctCount
                });
                console.log("✓ Added lesson to lessonsList with solved count:", correctCount);
                console.log("No daily/category count updates (score below passing criteria)");
            }
        }
        
        // ================= Step 4: Save Document =================
        console.log("\n--- Saving document ---");
        progressDoc.markModified('lessonsList');
        progressDoc.markModified('totalCount');
        progressDoc.markModified('dailyCount');
        
        await progressDoc.save();
        console.log("✓ Document saved successfully");
        
        return res.status(200).json({ 
            success: true,
            message: "Progress updated successfully",
            passed: hasPassed,
            progress: progressDoc
        });
        
    } catch (error) {
        console.error("✗ Error in addToProgress:", error);
        return res.status(500).json({ 
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

// ================= Helper Functions =================

/**
 * Updates the totalCount for given category and difficulty
 */
function updateTotalCount(progressDoc, category, difficulty) {
    console.log("\n--- Updating totalCount ---");
    console.log("Category:", category, "Difficulty:", difficulty);
    
    // Find existing category or create new one
    let totalCountItem = progressDoc.totalCount.find(item => item.category === category);
    
    if (!totalCountItem) {
        // Create new category entry
        console.log("Creating new category entry");
        totalCountItem = { 
            category, 
            difficulty: Array(12).fill(0) 
        };
        progressDoc.totalCount.push(totalCountItem);
        progressDoc.markModified('totalCount');
        console.log("✓ Created new category:", category);
    } else {
        console.log("Found existing category");
    }
    
    // Update difficulty count (difficulty is 1-12, array is 0-11)
    const arrayIndex = difficulty - 1;
    console.log("Array index:", arrayIndex);
    console.log("Current count:", totalCountItem.difficulty[arrayIndex]);
    
    totalCountItem.difficulty[arrayIndex] += 1;
    console.log("Updated count:", totalCountItem.difficulty[arrayIndex]);
    console.log("✓ TotalCount updated");
}

/**
 * Updates the daily count for today (only called when score >= 9)
 */
function updateDailyCount(progressDoc) {
    console.log("\n--- Updating dailyCount (Passing Score Only) ---");
    
    // Get today's date (normalized to start of day)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    console.log("Today's date:", today);
    
    // Find today's entry
    let todayStat = progressDoc.dailyCount.find(
        stat => stat.date.getTime() === today.getTime()
    );
    
    if (todayStat) {
        // Update existing entry
        console.log("Found today's entry, current count:", todayStat.count);
        todayStat.count += 1;
        console.log("Updated today's count to:", todayStat.count);
    } else {
        // Create new entry for today
        console.log("Creating new entry for today");
        progressDoc.dailyCount.push({ 
            date: today, 
            count: 1
        });
        
        // Keep only last 7 entries (maintain queue-like behavior)
        if (progressDoc.dailyCount.length > 7) {
            const removed = progressDoc.dailyCount.shift();
            console.log("Removed old entry:", removed.date);
        }
        
        console.log("✓ Added today's entry with count: 1");
    }
    
    console.log("Current dailyCount length:", progressDoc.dailyCount.length);
}


//============================= Read Operations =============================

export const getProgress = async (req, res) => {
    try {
        let progressDoc = await UserProgress.findOne({ userId: req.user._id });
        
        // Create document if it doesn't exist
        if (!progressDoc) {
            try {
                progressDoc = await UserProgress.create({
                    userId: req.user._id,
                    totalCount:[] ,
                    dailyCount:[],
                    lessonsList : []
                });
            } catch (error) {
                if (error.code === 11000) {
                    // Document was created by another request, fetch it
                    progressDoc = await UserProgress.findOne({ userId: req.user._id });
                } else {
                    throw error;
                }
            }
        }

        res.json({
            success: true,
            progress: progressDoc
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ 
            success: false,
            message: "Server error" 
        });
    }
};



// Optional: Get specific progress data
export const getProgressCount = async (req, res) => {
    try {
        const progressDoc = await UserProgress.findOne({ userId: req.user._id });
        
        res.json({
            success: true,
            totalCount: progressDoc?.totalCount || [],
            dailyCount: progressDoc?.dailyCount || []
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ 
            success: false,
            message: "Server error" 
        });
    }
};

export const getProgressLessons = async (req, res) => {
    try {
        const progressDoc = await UserProgress.findOne({ userId: req.user._id }).populate('lessonsList');
        
        res.json({
            success: true,
            lessonsList: progressDoc?.lessonsList || []
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ 
            success: false,
            message: "Server error" 
        });
    }
};