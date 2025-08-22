// User progress routes: track completed question IDs per authenticated user
import express from 'express';
import mongoose from 'mongoose';
import UserProgress from '../models/userProgressModel.js';
import Question from '../models/questionModel.js';
import { protect } from '../middleswares/auth.js';

const router = express.Router();

// @desc    Get user's progress (count and completed question IDs)
// @route   GET /api/progress
// @access  Private (Bearer token)
router.get('/', protect, async (req, res) => {
        console.log("==== client asked for user's progress data;")
    try {
        let progress = await UserProgress.findOne({ userId: req.user._id });
        
        // If no progress exists, create initial progress
        if (!progress) {
            progress = await UserProgress.create({
                userId: req.user._id,
                completedQuestions: []
            });
        }

        console.log("=== Sending progressData to client.....")

        console.log("=== Data sent to client! ",progress );
        res.json({
            success: true,
            data: {
                questionsCompleted: progress.questionsCompleted,
                completedQuestions: progress.completedQuestions
            }
        });
    } catch (error) {
        console.log("=== Error while sending progress Data ",error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// @desc    Mark a question as completed for the user
// @route   POST /api/progress/complete
// @access  Private (Bearer token)
// ...existing code...
router.post('/complete', protect, async (req, res) => {
        console.log('[POST /api/progress/complete] entering'); // 1: while entering
    try {
        const { questionId } = req.body;
        
        if (!questionId) {
            return res.status(400).json({
                success: false,
                message: 'Question ID is required'
            });
        }
        
        if (!mongoose.Types.ObjectId.isValid(questionId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Question ID'
            });
        }

        console.log('[POST /api/progress/complete] processing'); // 2: while processing

        // Atomically add the question to the set and upsert the progress document
        const updated = await UserProgress.findOneAndUpdate(
            { userId: req.user._id },
            {
                $setOnInsert: { userId: req.user._id }, // only userId on insert
                $addToSet: { completedQuestions: new mongoose.Types.ObjectId(questionId) }
            },
            { new: true, upsert: true }
        );
        
        
        console.log('[POST /api/progress/complete] response sent', { userId: req.user._id, questionsCompleted: updated.completedQuestions.length }); // 3: after response has been sent
        res.json({
            success: true,
            data: {
                questionsCompleted: updated.completedQuestions.length,
                completedQuestions: updated.completedQuestions
            },
            message: 'Question marked as completed!'
        });

    } catch (error) {
        console.error('[POST /api/progress/complete] error', error); // 4: on error
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});
// ...existing

// @desc    Check if a question is completed by the user
// @route   GET /api/progress/is-completed/:questionId
// @access  Private (Bearer token)
router.get('/is-completed/:questionId', protect, async (req, res) => {
    try {
        const { questionId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(questionId)) {
            return res.status(400).json({ success: false, message: 'Invalid Question ID' });
        }

        const exists = await UserProgress.exists({
            userId: req.user._id,
            completedQuestions: new mongoose.Types.ObjectId(questionId)
        });

        return res.json({ success: true, data: { isCompleted: Boolean(exists) } });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

// @desc    Unmark a question as completed
// @route   DELETE /api/progress/complete
// @access  Private (Bearer token)
router.delete('/complete', protect, async (req, res) => {
    try {
        const { questionId } = req.body;
        if (!questionId) {
            return res.status(400).json({ success: false, message: 'Question ID is required' });
        }
        if (!mongoose.Types.ObjectId.isValid(questionId)) {
            return res.status(400).json({ success: false, message: 'Invalid Question ID' });
        }

        const updated = await UserProgress.findOneAndUpdate(
            { userId: req.user._id },
            { $pull: { completedQuestions: new mongoose.Types.ObjectId(questionId) } },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ success: false, message: 'Progress not found' });
        }

        return res.json({
            success: true,
            data: {
                questionsCompleted: updated.completedQuestions.length,
                completedQuestions: updated.completedQuestions
            },
            message: 'Question unmarked as completed'
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

// @desc    Get completed count for a category for the user
// @route   GET /api/progress/count-by-category/:category
// @access  Private (Bearer token)
router.get('/count-by-category/:category', protect, async (req, res) => {
    try {
        const { category } = req.params;
        // Get user's completed question ids
        const progress = await UserProgress.findOne({ userId: req.user._id }, { completedQuestions: 1 });
        const completedIds = progress?.completedQuestions || [];

        // Compute total questions in this category
        const categoryMatch = { $elemMatch: { $regex: `^${category}$`, $options: 'i' } };
        const [totalCount, completedCount] = await Promise.all([
            Question.countDocuments({ categories: categoryMatch }),
            completedIds.length > 0
                ? Question.countDocuments({ _id: { $in: completedIds }, categories: categoryMatch })
                : Promise.resolve(0)
        ]);

        return res.json({
            success: true,
            data: { category, totalCount, completedCount }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

// @desc    Reset (delete) the user's progress document
// @route   DELETE /api/progress
// @access  Private (Bearer token)
router.delete('/', protect, async (req, res) => {
    try {
        const progress = await UserProgress.findOneAndDelete({ userId: req.user._id });

        if (!progress) {
            return res.status(404).json({
                success: false,
                message: 'Progress not found'
            });
        }

        res.json({
            success: true,
            message: 'Progress reset successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

export default router;
