// services/groqService.js
import axios from 'axios';
import 'dotenv/config'




class GroqService {
  constructor() {
    console.log('Initializing GroqService');
    console.log('Using Groq API Key:', process.env.GROQ_API_KEY );
    this.client = axios.create({
      baseURL: 'https://api.groq.com/openai/v1',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      timeout: 10000, 
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      response => response,
      error => {
        if (error.response) {
          // API responded with error status
          throw new Error(`Groq API Error: { your key : ${process.env.GROQ_API_KEY}} ${error.response.status} - ${error.response.data?.error?.message || 'Unknown error'}`);
        } else if (error.request) {
          // Request timeout or network error
          throw new Error('Groq API Request failed - Network or timeout error');
        } else {
          throw new Error(`Request setup error: ${error.message}`);
        }
      }
    );
  }

  async validateSpanishTranslation(originalText, spanishTranslation) {
    try {
      const response = await this.client.post('/chat/completions', {
        model: 'llama3-70b-8192',
        messages: [{
          role: 'system',
          content: 'You are a professional Spanish translator. Evaluate if the Spanish translation is accurate, natural, and contextually appropriate.'
        }, {
          role: 'user',
          content: `
            You must ONLY respond with valid JSON (no extra text). 

            Original text: "${originalText}"
            Spanish translation: "${spanishTranslation}"

            if there is minor issue like accent missing , minor spelling mistke or capitalization issue you can ignore them and mark status as correct but metion these in suggestions section

            Follow this exact format:

            {
            "status": "CORRECT: if translation is correct / WRONG : if translation is wrong",
            "correctTranslation": "correct translation (if already correct, just return the same translation)",
            "issue": ["list of minimal tags only, list all the issues in the form tags (at most 6), check whole given translation precisly (for spellings , articles, genders, singular prural , prepositions ) e.g., spelling mistake, missing article, wrong preposition, wrong word, different meaning, unnatural phrasing"],
            "suggestions": [
                "bullet points with concise notes",
                "if and only if  there is a more common/natural way used in spanish to say it, list it here",
                "if and only applicable give a reminder(if something import was missing) or usage(if it something(word) also has other common uses ),correct way to use(if something is used incorrectly them metion right way to use ) for article use,pronoun, gender, correct prural form, politeness, etc. (only if necessary) )"
            ]
            }

            Rules:
            - if there is just accent mark missing , there is minor spelling mistake or there is capitalization issue  , consider it as correct answer because these are just minor issues.
            - "issue" must be tags only, not sentences.
            - "suggestions" must be bullet-style, short, clear, and concise should not exceed 5, you can add suggestions even if translation is correct (eg. Great! this also can be said in this way) (remember not always just when suggestions are required).
            - Omit any field that is not applicable.
            - Do not leave correctTranslation section empty if the answer is correct put same answer as value of correctTranslation key
            - Focus extra on countries name, only accept original spanish countries name (like. UK is not acceptable as it is not original spanish name)
            - Provide only suggestions that are relevent to given originalText and spanishTranslation, do not provide irrelevent suggestions (like, if there is no requirement of accent in given translation then do not say anything about it)
`
        }],
        temperature: 1.2, // Low temperature for consistent evaluation
        top_p: 0.9
      });

      const content = response?.data?.choices?.[0]?.message?.content;
      if (!content) throw new Error("Groq API returned empty response");

      
      // Try to parse JSON response, fallback to text analysis
      try {
        return JSON.parse(content);
      } catch (parseError) {
        // Fallback parsing if model doesn't return valid JSON
        return this.parseTextResponse(content, originalText, spanishTranslation);
      }

    } catch (error) {
      console.error('Groq API Error:', error.message);
      throw error;
    }
  }

  // Fallback parser for non-JSON responses
  parseTextResponse(content, originalText, spanishTranslation) {
    const lowerContent = content.toLowerCase();
    
    let status = 'INCORRECT';
    if (lowerContent.includes('correct') && !lowerContent.includes('incorrect')) {
      status = lowerContent.includes('partially') ? 'PARTIALLY_CORRECT' : 'CORRECT';
    } else if (lowerContent.includes('partially')) {
      status = 'PARTIALLY_CORRECT';
    }

    return {
      status,
      correctTranslation : null,
      issue : content,
      suggestions : null,
      originalText,
      spanishTranslation
    };
  }

}

export default new GroqService();