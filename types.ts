
export enum BloodGroup {
  APos = 'A+',
  ANeg = 'A-',
  BPos = 'B+',
  BNeg = 'B-',
  ABPos = 'AB+',
  ABNeg = 'AB-',
  OPos = 'O+',
  ONeg = 'O-'
}

export enum UserRole {
  Donor = 'Donor',
  Requester = 'Requester',
  Admin = 'Admin'
}

export enum UrgencyLevel {
  Critical = 'Critical',
  High = 'High',
  Moderate = 'Moderate',
  Normal = 'Normal'
}

export interface Location {
  latitude: number;
  longitude: number;
  city: string;
  zipCode: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  bloodGroup: BloodGroup;
  age?: number;
  weight?: number;
  lastDonationDate?: string;
  isAvailable: boolean;
  location?: Location;
  donationCount: number;
  isVerified: boolean;
}

export interface BloodRequest {
  id: string;
  requesterId: string;
  bloodGroup: BloodGroup;
  unitsRequired: number;
  hospitalName: string;
  hospitalAddress: string;
  contactPerson: string;
  contactPhone: string;
  urgency: UrgencyLevel;
  status: 'Pending' | 'In-Progress' | 'Completed' | 'Cancelled';
  createdAt: string;
  location: { latitude: number; longitude: number };
}

export interface MatchResult {
  donor: UserProfile;
  distance: number; // in km
  score: number; // calculated score
  matchReason: string;
}
