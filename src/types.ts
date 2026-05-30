/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Lead {
  id: string;
  name: string;
  category: string;
  address: string;
  phone: string;
  email: string;
  rating: number;
  status: 'Uncontacted' | 'In Progress' | 'Deal Closed' | 'Not Interested';
}

export type LeadCategory =
  | 'Food & Restaurants'
  | 'Schools'
  | 'Salons & Barbers'
  | 'Coaching Centers'
  | 'Fashion Shops'
  | 'Milk & Grocery'
  | 'Government/State Offices'
  | 'Other';

export interface AdminUser {
  email: string;
  name: string;
}

export interface ContactSubmission {
  name: string;
  businessName: string;
  phone: string;
  serviceInterest: string;
}
