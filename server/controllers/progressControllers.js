import progressCountModel from "../models/progressCountModel";
import progressQuestionsModel from "../models/progressQuestionsModel";



//============================= Create Operations =============================


// add lesson to progress count
export const addToProgress = async (req, res) => {

    try {
        const { userId,lessonId,   category, difficulty } = req.body;
        // Find the user's progress count document
        let progressCountDoc = await progressCountModel.findOne({ userId });
        if (!progressCountDoc) {
            // If not found, create a new document
            progressCountDoc = new progressCountModel({ userId, totalCount: [], dailyCount: [] });
        }

        if (!progressCountDoc.totalCount) {
            let totalCountItem = { category, difficulty: Array(12).fill(0) };
            progressCountDoc.totalCount.push(totalCountItem);
        }

        if(difficulty >=1 && difficulty <=12){
            totalCountItem.difficulty[difficulty - 1] += 1;
        }

        
    // ------------------- Handle dailyCount -------------------
        const today = new Date();
        today.setHours(0, 0, 0, 0); // normalize date

        let todayStat = progressCountDoc.dailyCount.find(
            (stat) => stat.date.getTime() === today.getTime()
        );

        if (todayStat) {
        // If today's record exists, increment
        todayStat.count += 1;
        } else {
        // Otherwise, add a new record
        progressCountDoc.dailyCount.push({ date: today, count: 1 });

        // keep only last 7 entries (queue-like)
        if (progressCountDoc.dailyCount.length > 7) {
            progressCountDoc.dailyCount.shift(); 
        }
        }

        // ------------------- Save -------------------
        await progressCountDoc.save();

        let progressQuestionsDoc = await progressQuestionsModel.findOne({ userId });
        if (!progressQuestionsDoc) {
            // If not found, create a new document
            progressQuestionsDoc = new progressQuestionsModel({ userId });
        }
        progressQuestionsDoc.lessonId.push(lessonId);
        await progressQuestionsDoc.save();

        return res.status(200).json({ message: "Progress count updated successfully" });
    }
    
    catch (error) {
        console.error("Error updating progress count:", error);
        return res.status(500).json({ message: "Server error" });
    }

}




//============================= Read Operations =============================
export const getProgress = async (req, res) => {
    try {
        const { userId } = req.params;
        const progressCountDoc = await progressCountModel.findOne({ userId });
        const progressQuestionsDoc = await progressQuestionsModel.findOne({ userId });

        if (!progressCountDoc || !progressQuestionsDoc) {
            return res.status(404).json({ message: "Progress count not found" });
        }

        return res.status(200).json({ progressCount: progressCountDoc, progressQuestions: progressQuestionsDoc });
    }catch(err){
        return res.status(500).json({message : "user not found!"});
    }
}





