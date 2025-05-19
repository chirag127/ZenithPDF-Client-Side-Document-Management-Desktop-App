import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { GeminiModel } from '../types';

interface SettingsState {
  geminiApiKey: string | null;
  selectedGeminiModel: string;
  userConsentForAI: boolean;
  isLoadingSettings: boolean;
  
  // Actions
  setGeminiApiKey: (key: string | null) => Promise<void>;
  setSelectedGeminiModel: (model: string) => Promise<void>;
  setUserConsentForAI: (consent: boolean) => Promise<void>;
  loadSettings: () => Promise<void>;
}

// Secure storage keys
const GEMINI_API_KEY = 'geminiApiKey';
const SELECTED_GEMINI_MODEL = 'selectedGeminiModel';
const USER_CONSENT_FOR_AI = 'userConsentForAI';

// Default Gemini model
const DEFAULT_GEMINI_MODEL = 'models/gemini-1.5-pro';

export const useSettingsStore = create<SettingsState>((set, get) => ({
  geminiApiKey: null,
  selectedGeminiModel: DEFAULT_GEMINI_MODEL,
  userConsentForAI: false,
  isLoadingSettings: false,
  
  setGeminiApiKey: async (key: string | null) => {
    try {
      if (key) {
        await SecureStore.setItemAsync(GEMINI_API_KEY, key);
      } else {
        await SecureStore.deleteItemAsync(GEMINI_API_KEY);
      }
      set({ geminiApiKey: key });
    } catch (error) {
      console.error('Error saving Gemini API key:', error);
      throw error;
    }
  },
  
  setSelectedGeminiModel: async (model: string) => {
    try {
      await SecureStore.setItemAsync(SELECTED_GEMINI_MODEL, model);
      set({ selectedGeminiModel: model });
    } catch (error) {
      console.error('Error saving selected Gemini model:', error);
      throw error;
    }
  },
  
  setUserConsentForAI: async (consent: boolean) => {
    try {
      await SecureStore.setItemAsync(USER_CONSENT_FOR_AI, String(consent));
      set({ userConsentForAI: consent });
    } catch (error) {
      console.error('Error saving user consent for AI:', error);
      throw error;
    }
  },
  
  loadSettings: async () => {
    set({ isLoadingSettings: true });
    try {
      // Load Gemini API key
      const apiKey = await SecureStore.getItemAsync(GEMINI_API_KEY);
      
      // Load selected Gemini model
      const model = await SecureStore.getItemAsync(SELECTED_GEMINI_MODEL);
      
      // Load user consent for AI
      const consentStr = await SecureStore.getItemAsync(USER_CONSENT_FOR_AI);
      const consent = consentStr === 'true';
      
      set({
        geminiApiKey: apiKey,
        selectedGeminiModel: model || DEFAULT_GEMINI_MODEL,
        userConsentForAI: consent,
        isLoadingSettings: false,
      });
    } catch (error) {
      console.error('Error loading settings:', error);
      set({ isLoadingSettings: false });
      throw error;
    }
  },
}));
