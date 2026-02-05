
import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import DonorOnboarding from './components/DonorOnboarding';
import BloodRequestForm from './components/BloodRequestForm';
import MatchingResults from './components/MatchingResults';
import { BloodGroup, UrgencyLevel, BloodRequest, MatchResult, UserRole, UserProfile } from './types';
import { MOCK_DONORS } from './constants';
import { analyzeDonorMatches, generateEmergencyAppeal } from './services/geminiService';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  /* Fixed: Renamed appeal to emergencyAppeal in the state type definition */
  const [activeMatch, setActiveMatch] = useState<{ request: BloodRequest, matches: MatchResult[], emergencyAppeal: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize with dummy requests
  useEffect(() => {
    const initialRequests: BloodRequest[] = [
      {
        id: 'req1',
        requesterId: 'u123',
        bloodGroup: BloodGroup.OPos,
        unitsRequired: 2,
        hospitalName: 'Apollo Speciality Hospital',
        hospitalAddress: 'Gream Road, Chennai',
        contactPerson: 'Suresh Raina',
        contactPhone: '+91 9990001112',
        urgency: UrgencyLevel.Critical,
        status: 'Pending',
        createdAt: new Date().toISOString(),
        location: { latitude: 13.0612, longitude: 80.2505 }
      }
    ];
    setRequests(initialRequests);
  }, []);

  const handleRequestSubmit = async (data: any) => {
    setIsLoading(true);
    const newRequest: BloodRequest = {
      id: `req-${Date.now()}`,
      requesterId: 'currentUser',
      ...data,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      location: { latitude: 12.9716, longitude: 77.5946 } // Mocked location
    };

    setRequests(prev => [newRequest, ...prev]);

    // Trigger AI Matching
    const eligibleDonors = MOCK_DONORS.filter(d => 
      d.isAvailable && (d.bloodGroup === newRequest.bloodGroup || d.bloodGroup === BloodGroup.ONeg)
    ) as any[];

    /* Fixed: Renamed variable to emergencyAppeal to match state requirement */
    const [matches, emergencyAppeal] = await Promise.all([
      analyzeDonorMatches(newRequest, eligibleDonors),
      generateEmergencyAppeal(newRequest)
    ]);

    setActiveMatch({ request: newRequest, matches, emergencyAppeal });
    setActiveView('matching-results');
    setIsLoading(false);
  };

  const renderView = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-16 h-16 border-4 border-red-100 border-t-red-600 rounded-full animate-spin mb-4"></div>
          <p className="text-slate-500 font-medium animate-pulse">Running smart match algorithms...</p>
        </div>
      );
    }

    switch (activeView) {
      case 'dashboard':
        return <Dashboard requests={requests} onAction={(id) => setActiveView('requests')} />;
      case 'onboarding':
        return <DonorOnboarding onComplete={(data) => {
          setUser({ ...data, id: 'u1', role: UserRole.Donor, donationCount: 0, isVerified: false });
          setActiveView('dashboard');
        }} />;
      case 'create-request':
        return <BloodRequestForm onSubmit={handleRequestSubmit} onCancel={() => setActiveView('dashboard')} />;
      case 'matching-results':
        return activeMatch ? <MatchingResults {...activeMatch} /> : <Dashboard requests={requests} onAction={() => {}} />;
      case 'profile':
        return (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
             <div className="h-24 w-24 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl font-black">A</span>
             </div>
             <h2 className="text-2xl font-bold text-slate-900">Guest User</h2>
             <p className="text-slate-500 mb-8">You are currently in guest mode. Register as a donor to start saving lives.</p>
             <button 
              onClick={() => setActiveView('onboarding')}
              className="bg-red-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-red-100 hover:bg-red-700 transition-all"
             >
               Setup Donor Profile
             </button>
          </div>
        );
      default:
        return <Dashboard requests={requests} onAction={() => {}} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation onNavigate={setActiveView} activeView={activeView} />
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {renderView()}
      </main>
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">© 2024 JeevenDaan – Every Drop Counts.</p>
          <div className="flex gap-6 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-red-600">Safety Guidelines</a>
            <a href="#" className="hover:text-red-600">Privacy Policy</a>
            <a href="#" className="hover:text-red-600">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
