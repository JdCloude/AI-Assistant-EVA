import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Validate Google AI API key
if (!process.env.GOOGLE_GENAI_API_KEY) {
  console.warn('GOOGLE_GENAI_API_KEY is not set. AI features will be disabled.');
  console.warn('Please set the GOOGLE_GENAI_API_KEY environment variable in your Vercel deployment.');
}

export const ai = genkit({
  promptDir: './prompts',
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY || '',
    }),
  ],
  model: 'googleai/gemini-2.0-flash',
});
