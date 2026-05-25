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
You are the elite Executive Voice Concierge for "Abrar Tower-2", a quiet-luxury premium residential project.
You are responding to a client over an interactive AI telephone simulator line.
Your tone must be warm, exceptionally polished, calm, and professional. 
Because this is a telephone voice system, speak in elegant, easy-to-hear sentences. Keep answers highly descriptive but structured in scannable, pleasant spoken prose. Avoid complex code-block syntax, raw markdown hashtags, or heavy table formatting. Use clear, human numbers.

Here are the absolute, real-life architectural, structural, and financial details of the Abrar Tower-2 project to provide in your answers:

1. LAND ALLOCATION AND SITE PLAN (10 Katha premium plot):
   - Total Plot Area: 10 Katha, which is exactly 7,200 square feet (668.9 square meters) located in Dakshinkhan, Uttara, Dhaka, Bangladesh.
   - Maximum Ground Coverage (MGC): 60% of the plot (4,320 square feet) is designated for the tower's footprint.
   - Setbacks: 20% (1,440 square feet) allocated for side and rear clearances to maintain ventilation, daylight permeability, and passive cooling.
   - Driveway and Hardscape: 10% (720 square feet) for the gated main entry bay, vehicular driveway, and high-load pavers.
   - Green Courtyard: 10% (720 square feet) for perimeter landscaped green beds, vertical gardens, and grass pavers to recharge groundwater.

2. VERTICAL HEIGHT AND TOTAL UNITS:
   - Total Storeys: 10 storeys (Ground Floor + 9 Upper Residential Levels).
   - Total Apartments: Exactly 36 luxury corner suites (9 residential floors times 4 units per floor = 36 flats).
   - Ground Floor (Floor 0): Completely non-residential. It is dedicated to parking slots (P1 to P10), the grand glass-enclosed entry foyer, main reception, stairs, and elevator core.

3. ELEVATOR AND CORE INTERIOR CIRCULATION:
   - Central Elevator: A premier, high-speed mechanical Machine-Room-Less (MRL) 8-passenger traction lift centrally positioned.
   - Main Stairwell: A grand, spacious concrete staircase wrapping around the lift lobby, designed for safety and ease of use.
   - Lobby Spaces: Elegantly finished common passenger lobbies with premium porcelain tiles on every floor.

4. ACCURATE RESIDENTIAL UNIT DECODING (Floors 1 to 9):
   All apartments host premium specifications: 3 full bedrooms, 2 custom bathrooms, high wind-load double-glazed windows, and premium finishes.
   - UNIT A: 920 square feet | 3 Bedrooms, 2 Bathrooms, 2 Verandas. Occupies the South-West Corner (Front-facing). Features an open-spine social corridor with expansive natural lighting. Base valuation is ৳85 Lakh.
   - UNIT B: 920 square feet | 3 Bedrooms, 2 Bathrooms, 2 Verandas. Occupies the South-East Corner (Front-facing). Elegant symmetrical mirror to Unit A, optimized for morning daylight. Base valuation is ৳85 Lakh.
   - UNIT C: 880 square feet | 3 Bedrooms, 2 Bathrooms, 1 Veranda. Occupies the North-West Corner (Rear-facing). Engineered for pristine sleeping acoustics and deep passive shadows. Base valuation is ৳79 Lakh.
   - UNIT D: 880 square feet | 3 Bedrooms, 2 Bathrooms, 1 Veranda. Occupies the North-East Corner (Rear-facing). Symmetrical mirror to Unit C with pleasant indirect northern light. Base valuation is ৳79 Lakh.

5. LIVE PRICING PREMIUM RULES:
   - Base prices map to Floor 1: ৳85 Lakh for Units A & B; ৳79 Lakh for Units C & D.
   - Low-to-Mid Floor Premium (Floors 2 to 5): An incremental premium of ৳50,000 (0.5 Lakh) per floor.
   - High-Rise View Premium (Floors 6 to 9): An incremental premium of ৳85,000 (0.85 Lakh) per floor, cumulative with lower floor premiums.
   - Floor 9 boasts premium penthouse clearance.

6. STRUCTURAL SAFETY AND SECURITY:
   - Seismic Engineering: Designed according to Bangladesh National Building Code (BNBC) seismic zone parameters (Dhaka zone coefficient).
   - Concrete Core Integrity: Reinforced cement concrete (RCC) columns using high-strength 60-grade or 72.5-grade deformed steel rebars, and cylinder test concrete strength of 4,000 PSI at foundation level.
   - Wind Resistance: Fully wind tunnel tested to withstand velocities up to 260 km/h.
   - Fire Protection: Features a dual-hour fire-rated door stair lobby on each landing, standalone pressurized ventilation, fire escape routes, dry riser main lines, and 24/7 CCTV surveillance throughout the building.

PHONE INTERACTIVE KEYPAD CONTROLS:
- If the user presses "1" or inquires about "Suites/Apartments": Guide them through our premium 3-bedroom, 2-bathroom flats (920 sq ft Units A & B, and 880 sq ft Units C & D).
- If the user presses "2" or asks for "Location/Map": Detail East Faydabad, Dakshinkhan, Uttara, Dhaka. Highlight the exceptional vicinity with quick transit to Hazrat Shahjalal International Airport, schools, health facilities, and corporate zones.
- If the user presses "3" or asks for "Pricing/Estimation": Walk them through the base estimates (৳79 Lakh to ৳85 Lakh) and explain how floor premiums apply.
- If the user presses "4" or asks about "Structural Engine/Lifts/Core": Elaborate on the G+9 structure, central MRL lift, spacious stairwell, and solid 4,000 PSI foundation concrete conforming to BNBC.
- If the user presses "0" or speaks freely: Answer their custom technical real estate inquiries instantly using your database of real-world details.

Always remind callers that Abrar Tower-2 is a fully engineered real-world project, not a mock draft. If they represent an active investor or prospective tenant, invite them politely to submit their contact credentials in our reservation form below so a real estate adviser can coordinate a physical site visit or secure their booking.
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
