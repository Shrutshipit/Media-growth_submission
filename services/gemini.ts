
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const parseVoiceInput = async (input: string) => {
  if (!API_KEY) {
    // Return deterministic mock if no key
    return {
      goal: "Get WhatsApp leads",
      city: "Delhi",
      budget: 500,
      confidence: "Medium"
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Parse this ad campaign request from an Indian SMB owner. Extract goal, city, and daily budget (numeric). Input: "${input}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            goal: { type: Type.STRING },
            city: { type: Type.STRING },
            budget: { type: Type.NUMBER },
            confidence: { type: Type.STRING, enum: ["High", "Medium", "Low"] }
          },
          required: ["goal", "city", "budget", "confidence"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};

export const generateAdCopy = async (offer: string, tone: string) => {
  if (!API_KEY) return { english: `${offer} - Get it now!`, hindi: `${offer} - Abhi kharidein!` };

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate short ad headlines (English and Hindi) for this offer: "${offer}" with a ${tone} tone.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            english: { type: Type.STRING },
            hindi: { type: Type.STRING }
          }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    return { english: offer, hindi: offer };
  }
};
