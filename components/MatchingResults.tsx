
import React from 'react';
import { User, Shield, MapPin, Droplets, Star, TrendingUp, Mail, Phone, MessageSquare } from 'lucide-react';
import { MatchResult, BloodRequest } from '../types';

interface MatchingResultsProps {
  request: BloodRequest;
  matches: MatchResult[];
  emergencyAppeal: string;
}

const MatchingResults: React.FC<MatchingResultsProps> = ({ request, matches, emergencyAppeal }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-red-600 font-bold mb-1">
              <Shield className="h-5 w-5" /> Matching Algorithm Active
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Found {matches.length} matches for {request.bloodGroup}</h1>
            <p className="text-slate-500 mt-1">Ranking based on proximity, eligibility, and donor history.</p>
          </div>
          <div className="flex gap-2">
            <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
              <Mail className="h-4 w-4" /> Email Alerts
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
              <MessageSquare className="h-4 w-4" /> SMS Broadcast
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {matches.map((match, i) => (
            <div key={match.donor.id} className={`bg-white rounded-3xl border transition-all ${i === 0 ? 'border-red-200 ring-2 ring-red-50 shadow-lg' : 'border-slate-100 shadow-sm'}`}>
              {i === 0 && (
                <div className="bg-red-600 text-white px-4 py-1 text-[10px] font-bold uppercase tracking-widest rounded-t-2xl w-full text-center">
                  Best Match Recommendation
                </div>
              )}
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex gap-4">
                    <div className="relative">
                      <div className="h-16 w-16 bg-slate-100 rounded-2xl flex items-center justify-center font-bold text-2xl text-slate-400">
                        {match.donor.name.charAt(0)}
                      </div>
                      {match.donor.isVerified && (
                        <div className="absolute -top-2 -right-2 bg-blue-500 text-white p-1 rounded-full border-2 border-white">
                          <Shield className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-slate-900">{match.donor.name}</h3>
                        <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold">
                          {match.donor.bloodGroup}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {match.distance}km away</span>
                        <span className="flex items-center gap-1 font-semibold text-teal-600"><Star className="h-3.5 w-3.5" /> {match.donor.donationCount} Donations</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center min-w-[100px] border-l border-slate-100 pl-6">
                    <div className="text-2xl font-black text-red-600">{match.score}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Match Score</div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-4 w-4 text-red-500 mt-1" />
                    <p className="text-sm text-slate-600 italic">"{match.matchReason}"</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center gap-2">
                    <Phone className="h-4 w-4" /> Call Now
                  </button>
                  <button className="bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 px-6 py-2.5 rounded-xl text-sm font-bold transition-colors">
                    Send Direct Message
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-red-600" /> AI Emergency Appeal
            </h3>
            <div className="bg-red-50 p-4 rounded-2xl border border-red-100 relative">
              <p className="text-sm text-slate-800 leading-relaxed font-medium">
                {emergencyAppeal}
              </p>
              <div className="mt-4 flex justify-end gap-2">
                <button 
                  onClick={() => navigator.clipboard.writeText(emergencyAppeal)}
                  className="text-[10px] font-bold text-red-600 hover:underline"
                >
                  Copy to Clipboard
                </button>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4 leading-snug">
              Share this automated appeal on WhatsApp or social media to find more volunteers quickly.
            </p>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-3xl">
            <h3 className="font-bold mb-4">Request Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Blood Group</span>
                <span className="font-bold">{request.bloodGroup}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Quantity</span>
                <span className="font-bold">{request.unitsRequired} Units</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Urgency</span>
                <span className="font-bold text-red-400">{request.urgency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Matching Status</span>
                <span className="font-bold text-green-400">Active</span>
              </div>
            </div>
            <button className="w-full mt-6 bg-white/10 hover:bg-white/20 py-3 rounded-xl font-bold transition-colors border border-white/10">
              Edit Request Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchingResults;
