import { GoogleGenerativeAI } from "@google/generative-ai";
import { useSettingsStore } from '../store/settingsStore';
import { GeminiModel } from '../types';

/**
 * Gets a configured Google Generative AI client using the stored API key
 * @returns GoogleGenerativeAI client instance
 * @throws Error if API key is not found
 */
export async function getGenAIClient() {
  const apiKey = useSettingsStore.getState().geminiApiKey;
  if (!apiKey) {
    throw new Error("Gemini API Key not found. Please set it in settings.");
  }
  return new GoogleGenerativeAI(apiKey);
}

/**
 * Lists available Gemini models
 * @returns Array of available models
 * @throws Error if API key is invalid or request fails
 */
export async function listAvailableModels(): Promise<GeminiModel[]> {
  try {
    const genAI = await getGenAIClient();
    const result = await genAI.listModels();
    
    // Filter for Gemini models only
    return result
      .filter(model => model.name.includes('gemini'))
      .map(model => ({
        name: model.name,
        description: model.description || 'N/A',
        inputTokenLimit: model.inputTokenLimit || 'N/A',
        outputTokenLimit: model.outputTokenLimit || 'N/A',
      }));
  } catch (error) {
    console.error("Error listing Gemini models:", error);
    throw error;
  }
}

/**
 * Generates content using the Gemini API
 * @param prompt The prompt to send to the model
 * @param context Optional context to include with the prompt (e.g., PDF text chunks)
 * @returns Generated text response
 */
export async function generateContent(prompt: string, context?: string[]): Promise<string> {
  try {
    const genAI = await getGenAIClient();
    const modelName = useSettingsStore.getState().selectedGeminiModel;
    const model = genAI.getGenerativeModel({ model: modelName });
    
    // Build the prompt with context if provided
    let fullPrompt = prompt;
    if (context && context.length > 0) {
      fullPrompt = `Context information:\n${context.join('\n\n')}\n\nBased on the above context, ${prompt}`;
    }
    
    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating content with Gemini:", error);
    throw error;
  }
}

/**
 * Summarizes text content using the Gemini API
 * @param text The text to summarize
 * @returns Summarized text
 */
export async function summarizeText(text: string): Promise<string> {
  try {
    const prompt = `Please provide a concise summary of the following text:\n\n${text}`;
    return await generateContent(prompt);
  } catch (error) {
    console.error("Error summarizing text with Gemini:", error);
    throw error;
  }
}

/**
 * Translates text content using the Gemini API
 * @param text The text to translate
 * @param targetLanguage The language to translate to
 * @returns Translated text
 */
export async function translateText(text: string, targetLanguage: string): Promise<string> {
  try {
    const prompt = `Translate the following text to ${targetLanguage}:\n\n${text}`;
    return await generateContent(prompt);
  } catch (error) {
    console.error("Error translating text with Gemini:", error);
    throw error;
  }
}

/**
 * Generates questions based on text content using the Gemini API
 * @param text The text to generate questions from
 * @param numQuestions Number of questions to generate
 * @returns Array of generated questions
 */
export async function generateQuestions(text: string, numQuestions: number = 5): Promise<string[]> {
  try {
    const prompt = `Based on the following text, generate ${numQuestions} insightful questions that could be asked about the content:\n\n${text}`;
    const response = await generateContent(prompt);
    
    // Parse the response into an array of questions
    const questions = response
      .split('\n')
      .filter(line => line.trim().length > 0 && (line.includes('?') || /^\d+\./.test(line)))
      .map(line => line.replace(/^\d+\.\s*/, '').trim());
    
    return questions.slice(0, numQuestions);
  } catch (error) {
    console.error("Error generating questions with Gemini:", error);
    throw error;
  }
}
