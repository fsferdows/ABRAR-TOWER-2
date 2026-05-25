/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ApartmentType {
  id: string; // "A", "B", "C", "D", "E"
  name: string; // "Type A", etc.
  sizeSqFt: number; // 1350, 1100, etc.
  bedrooms: number;
  bathrooms: number;
  verandas: number;
  isCorner: boolean;
  idealFor: string;
  description: string;
  highlights: string[];
}

export interface Landmark {
  name: string;
  distance: string; // "5 mins", "1.2 km"
  type: 'religion' | 'commerce' | 'transport' | 'leisure';
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  interestedSize: string;
  message: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'reserved';
}
