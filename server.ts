/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialization pattern for Gemini API client to prevent startup failure if key is unset
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!geminiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is not defined. Please add it in the Secrets panel.');
    }
    geminiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return geminiClient;
}

// Base system instruction defining Abrar Tower-2 and the Phone Concierge persona
const CONCIERGE_SYSTEM_INSTRUCTION = `
You are the Voice Reception Concierge for "Abrar Tower-2", a quiet-luxury premium residential project.
You are responding to a user over an automated interactive AI phone line mockup.
Speak with supreme warmth, professional calmness, and quiet elegance. Keep your responses concise, highly structured, and easy to hear/understand via telephone voice (sentences of moderate length, no long lists of text, avoid weird markdown stars or tables since this is spoken).

Abrar Tower-2 Project details:
- NAME: Abrar Tower-2
- DEVELOPER: Premium Registered Real Estate Venture.
- DESCRIPTION: A premium 10-storied residential tower.
- LOCATION: East Faydabad, Dakshinkhan, Uttara, Dhaka, Bangladesh. Known for premium air quality and quick connectivity to the central hubs of Uttara. It is near transit zones (Airport Station), primary education networks, major corporate blocks, healthcare facilities, and local prayer spaces.
- STRUCTURAL LAYOUT:
  * Has a total of 10 Floors (a highly secure Ground Floor for lobbies/parking, and 9 residential levels).
  * Has a premium high-speed mechanical Machine-Room-Less (MRL) 8-passenger elevator/lift centrally positioned.
  * Standard Layout Tiers: 4 corner-positioned suites per floor (Flat A, B, C, D) centered around the lift/lobby, creating a total of 36 extreme corner apartments across the 9 residential stories. Perfect for daylight and cross ventilation.
  * Optional Expansion Tiers: The columns are pre-engineered to optionally support up to 36 micro-studio apartments per floor for corporate smart rental systems.
  * Landscaped Rooftop Community Garden at the crest of the tower.
  
RESIDENTIAL SUITES (FLOORS 1 TO 9):
- FLAT TYPE A: 920 sq ft | 2 Beds, 2 Baths, 2 Verandas | South-West Corner (Front). Open-plan social spine with panoramic exposure. Estimation: Approximately ৳85 Lakh.
- FLAT TYPE B: 920 sq ft | 2 Beds, 2 Baths, 2 Verandas | South-East Corner (Front). Symmetrical mirror to Unit A, morning daylight. Estimation: Approximately ৳85 Lakh.
- FLAT TYPE C: 880 sq ft | 2 Beds, 2 Baths, 1 Veranda | North-West Corner (Rear Privacy). Isolated sleeping corridors, acoustic separation. Estimation: Approximately ৳79 Lakh.
- FLAT TYPE D: 880 sq ft | 2 Beds, 2 Baths, 1 Veranda | North-East Corner (Rear Privacy). Symmetrical mirror to Unit C with northern light. Estimation: Approximately ৳79 Lakh.

FACILITIES (GROUND FLOOR):
- Safe covered parking slots (P1 to P10).
- Grand Reception desk, glass foyer, security command room with 24/7 CCTV surveillance, other mechanical wings (backups substation standby generator).

PHONE MENU LOGIC/OPTIONS (if the user clicks/presses digits on their phone pad):
- Press "1" or ask about "Suites/Apartment Models": Provide details of Residences (Units A, B, C, D).
- Press "2" or ask about "Location/Map": Provide address and location metrics in East Faydabad, Dakshinkhan, Uttara.
- Press "3" or ask about "Pricing": Provide price estimates (৳79 Lakh to ৳85 Lakh).
- Press "4" or ask about "Building details (Double Lift, Floors)": Explain the G+9 10-storied structure, and central 2 high-speed traction elevators.
- Press "0" or speak freely: Connect directly to your AI brain to answer custom inquiries.

When a user speaks or presses a number, translate it into helpful phone speech like: "Thank you for dialing our Residences Desk. We offer five distinct layouts..."
Keep responses short, premium and professional. If they want to reserve a physical booking or view, kindly guide them to submit their credentials in the Contact section at the bottom of the page, where an investment adviser will call them in person.
`;

// API Endpoint for phone chat communication
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message content is required.' });
    }

    const ai = getGeminiClient();

    // Map the history array into the correct format for chats
    // history should be an array of { role: 'user' | 'model', parts: [{ text: string }] }
    const formattedHistory = (history || []).map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.parts[0]?.text || msg.text || '' }],
    }));

    const chatInstance = ai.chats.create({
      model: 'gemini-3.5-flash',
      config: {
        systemInstruction: CONCIERGE_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: formattedHistory,
    });

    const response = await chatInstance.sendMessage({
      message: message,
    });

    const replyText = response.text || 'Thank you for your inquiry. Let me consult our registry.';
    return res.json({ reply: replyText });

  } catch (error: any) {
    console.error('Gemini Concierge API error:', error);
    // Be resilient and provide a friendly fallback in case of connection or API key issues
    return res.json({
      reply: `Thank you for choosing Abrar Tower-2. To assist you with reservation details, pricing, or our MRL lift systems, please leave your name and telephone number in our reservation form below. Our corporate concierge is ready to assist you.`,
      error: error.message || 'Error communicating with GenAI',
    });
  }
} );

// Integration of Vite Middleware/Static files
async function mountApplication() {
  if (process.env.NODE_ENV !== 'production') {
    // Development Mode
    const viteInstance = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    
    app.use(viteInstance.middlewares);
    console.log('Vite middleware mounted in development mode.');
  } else {
    // Production Mode
    const buildPath = path.join(process.cwd(), 'dist');
    app.use(express.static(buildPath));
    
    app.get('*', (req, res) => {
      res.sendFile(path.join(buildPath, 'index.html'));
    });
    console.log('Serving compiled static builds.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Abrar Tower-2 Fullstack Server online at http://0.0.0.0:${PORT}`);
  });
}

mountApplication().catch((err) => {
  console.error('Failed to mount application server:', err);
});
