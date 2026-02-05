
import { BloodGroup, UrgencyLevel } from './types';

export const BLOOD_GROUPS = Object.values(BloodGroup);
export const URGENCY_LEVELS = Object.values(UrgencyLevel);

export const COLORS = {
  primary: '#D32F2F',
  secondary: '#f8fafc',
  text: '#1e293b',
  accent: '#ef4444',
};

export const MOCK_DONORS = [
  {
    id: 'd1',
    name: 'Rahul Sharma',
    bloodGroup: BloodGroup.OPos,
    isAvailable: true,
    location: { latitude: 28.6139, longitude: 77.2090, city: 'Delhi', zipCode: '110001' },
    lastDonationDate: '2023-10-15',
    donationCount: 5,
    isVerified: true
  },
  {
    id: 'd2',
    name: 'Priya Patel',
    bloodGroup: BloodGroup.APos,
    isAvailable: true,
    location: { latitude: 19.0760, longitude: 72.8777, city: 'Mumbai', zipCode: '400001' },
    lastDonationDate: '2024-01-20',
    donationCount: 12,
    isVerified: true
  },
  {
    id: 'd3',
    name: 'Anish Kumar',
    bloodGroup: BloodGroup.BPos,
    isAvailable: true,
    location: { latitude: 12.9716, longitude: 77.5946, city: 'Bangalore', zipCode: '560001' },
    lastDonationDate: '2023-08-05',
    donationCount: 3,
    isVerified: false
  }
];
