// routes/translation.js
import express from 'express';
import GroqService from '../services/groqServices.js';

const router = express.Router();

// Middleware for request validation
const validateTranslationRequest = (req, res, next) => {
    console.log('Validation request received:');
  const { originalText, spanishTranslation } = req.body;
  
  if (!originalText || !spanishTranslation) {
    return res.status(400).json({
      error: 'Both originalText and spanishTranslation are required',
      received: { originalText: !!originalText, spanishTranslation: !!spanishTranslation }
    });
  }

  if (originalText.length > 1000 || spanishTranslation.length > 1000) {
    return res.status(400).json({
      error: 'Text length cannot exceed 1000 characters'
    });
  }

  next();
};

// Single translation validation
router.post('/validate', validateTranslationRequest, async (req, res) => {
    console.log('Received translation validation request:', req.body);
  try {
    const { originalText, spanishTranslation } = req.body;
    
    const startTime = Date.now();
    console.log(`Validating translation for by groq`)
    const validation = await GroqService.validateSpanishTranslation(originalText, spanishTranslation);
    const responseTime = Date.now() - startTime;
    console.log(`Translation validation completed in ${responseTime}ms`);
    console.log("sending response to user");
    res.json({
      success: true,
      data: validation,
      metadata: {
        responseTime: `${responseTime}ms`,
        model: 'llama-3.1-8b-instant',
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Translation validation error:', error);
    
    res.status(500).json({
      success: false,
      error: 'Translation validation failed',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});


// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'groq-translation',
    timestamp: new Date().toISOString(),
    apiKeyConfigured: !!process.env.GROQ_API_KEY
  });
});

export default router;