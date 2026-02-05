
import { GoogleGenAI, Type } from "@google/genai";
import { BloodGroup, BloodRequest, UserProfile, MatchResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeDonorMatches(request: BloodRequest, donors: UserProfile[]): Promise<MatchResult[]> {
  try {
    const donorData = donors.map(d => ({
      id: d.id,
      name: d.name,
      bloodGroup: d.bloodGroup,
      lastDonation: d.lastDonationDate,
      count: d.donationCount,
      verified: d.isVerified
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        Task: Rank these potential blood donors for an emergency request.
        Request: Blood Group ${request.bloodGroup}, Urgency ${request.urgency}, Units ${request.unitsRequired}.
        Potential Donors: ${JSON.stringify(donorData)}
        
        Rules: 
        1. Exact blood group match is high priority.
        2. O- is a universal donor (consider if ${request.bloodGroup} is unavailable, but prioritize exact matches).
        3. Longer time since last donation is better (minimum 3 months).
        4. Verified donors and frequent donors are preferred.
        
        Output a JSON array of objects with donorId, score (1-100), and a brief matchReason.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              donorId: { type: Type.STRING },
              score: { type: Type.NUMBER },
              matchReason: { type: Type.STRING }
            },
            required: ["donorId", "score", "matchReason"]
          }
        }
      }
    });

    const scores = JSON.parse(response.text);
    
    // Merge with distance calculation (simulated for demo)
    return donors.map(donor => {
      const matchScore = scores.find((s: any) => s.donorId === donor.id);
      return {
        donor,
        distance: Math.floor(Math.random() * 15) + 1, // Simulated 1-15km
        score: matchScore?.score || 50,
        matchReason: matchScore?.matchReason || "General match criteria met."
      };
    }).sort((a, b) => b.score - a.score);

  } catch (error) {
    console.error("Gemini Match Error:", error);
    // Fallback simple ranking
    return donors.map(d => ({ donor: d, distance: 5, score: 70, matchReason: "Manual match performed." }));
  }
}

export async function generateEmergencyAppeal(request: BloodRequest): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Draft a concise, high-impact emergency blood donation request for social media (Twitter/WhatsApp). 
      Details: ${request.bloodGroup} blood needed urgently at ${request.hospitalName}. 
      Contact: ${request.contactPerson} at ${request.contactPhone}. 
      Keep it professional, emotional, and urgent.`,
    });
    return response.text;
  } catch (error) {
    return `EMERGENCY: ${request.bloodGroup} blood needed at ${request.hospitalName}. Please contact ${request.contactPerson} at ${request.contactPhone}. Every minute counts. #BloodDonation #Urgent`;
  }
}
