import { GoogleGenAI, Type } from "@google/genai";
import { FeedbackItem, InsightCluster } from "../types";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeFeedbackClusters = async (feedback: FeedbackItem[]): Promise<InsightCluster[]> => {
  if (!process.env.API_KEY) {
    console.warn("No API Key provided, returning mock data simulation.");
    return mockAnalysis(feedback);
  }

  const feedbackText = feedback.map(f => `- [${f.source}] ${f.content} (ID: ${f.id})`).join('\n');

  const prompt = `
    Analyze the following product feedback items. 
    Group them into distinct "Insight Clusters" based on common themes, bugs, or feature requests.
    For each cluster, determine the severity, an impact score (1-100), and a suggested action for the engineering team.
    
    Feedback Data:
    ${feedbackText}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              severity: { type: Type.STRING, enum: ['low', 'medium', 'high', 'critical'] },
              impactScore: { type: Type.NUMBER },
              relatedFeedbackIds: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING } 
              },
              suggestedAction: { type: Type.STRING }
            },
            required: ['title', 'description', 'severity', 'impactScore', 'suggestedAction']
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as InsightCluster[];
    }
    return [];
  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    return mockAnalysis(feedback); // Fallback to mock on error
  }
};

// Fallback/Mock generator for demo purposes if API key is missing or fails
const mockAnalysis = (feedback: FeedbackItem[]): InsightCluster[] => {
  return [
    {
      id: "cluster-1",
      title: "Dark Mode Inconsistencies",
      description: "Users are reporting white flashes when switching pages in dark mode.",
      severity: "medium",
      impactScore: 45,
      relatedFeedbackIds: feedback.slice(0, 2).map(f => f.id),
      suggestedAction: "Audit CSS variables for background colors on route transitions."
    },
    {
      id: "cluster-2",
      title: "API Latency Spikes",
      description: "Critical reports of 500 errors and timeouts during peak hours.",
      severity: "critical",
      impactScore: 92,
      relatedFeedbackIds: feedback.slice(2, 4).map(f => f.id),
      suggestedAction: "Scale database read replicas and investigate slow queries in the reporting module."
    }
  ];
}
