
import React from 'react';
/* Added Heart to the import list */
import { Activity, Users, MapPin, CheckCircle, Droplets, ArrowUpRight, Clock, AlertTriangle, Heart } from 'lucide-react';
import { BloodGroup, UrgencyLevel, BloodRequest } from '../types';

interface DashboardProps {
  requests: BloodRequest[];
  onAction: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ requests, onAction }) => {
  const stats = [
    { label: 'Active Requests', value: requests.length, icon: Activity, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Verified Donors', value: '1,248', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Donations Today', value: '42', icon: Droplets, color: 'text-teal-600', bg: 'bg-teal-50' },
    { label: 'Lives Saved', value: '8,902', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  const getUrgencyBadge = (urgency: UrgencyLevel) => {
    switch (urgency) {
      case UrgencyLevel.Critical:
        return <span className="px-2 py-0.5 rounded text-xs font-bold bg-red-100 text-red-700 uppercase animate-pulse flex items-center"><AlertTriangle className="h-3 w-3 mr-1" /> Critical</span>;
      case UrgencyLevel.High:
        return <span className="px-2 py-0.5 rounded text-xs font-bold bg-orange-100 text-orange-700">High</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-xs font-bold bg-slate-100 text-slate-700">Normal</span>;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Emergency Dashboard</h1>
          <p className="text-slate-500">Real-time blood requirements in your area.</p>
        </div>
        <div className="flex items-center space-x-2 text-xs text-slate-400 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-ping"></div>
          <span>Live: Monitoring active requests</span>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className={`${stat.bg} ${stat.color} p-2.5 rounded-xl`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-slate-300" />
            </div>
            <div className="mt-4">
              <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-slate-800">Urgent Requirements</h2>
            <button className="text-sm font-medium text-red-600 hover:text-red-700">View All</button>
          </div>
          
          <div className="space-y-4">
            {requests.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-2xl border border-dashed border-slate-300">
                <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-slate-300 h-8 w-8" />
                </div>
                <p className="text-slate-500">No active emergency requests in your vicinity.</p>
              </div>
            ) : (
              requests.map((req) => (
                <div key={req.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:border-red-200 transition-colors group">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="h-16 w-16 bg-red-600 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg shadow-red-200">
                        <span className="text-lg font-bold leading-tight">{req.bloodGroup}</span>
                        <span className="text-[10px] uppercase font-bold tracking-tighter opacity-80">Group</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-slate-900">{req.hospitalName}</h4>
                          {getUrgencyBadge(req.urgency)}
                        </div>
                        <p className="text-sm text-slate-500 flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {req.hospitalAddress}
                        </p>
                        <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                          <span className="flex items-center gap-1 font-medium text-slate-500">
                            <Droplets className="h-3 w-3 text-red-500" /> {req.unitsRequired} Units needed
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> Post 2h ago
                          </span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => onAction(req.id)}
                      className="bg-slate-900 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-red-600 transition-all transform hover:scale-105"
                    >
                      I can help
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-3xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold text-xl mb-2">Be a Hero</h3>
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                Your one donation can save up to 3 lives. Check your eligibility and join our verified donor network today.
              </p>
              <button className="bg-white text-slate-900 px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-red-50 transition-colors">
                Become a Donor
              </button>
            </div>
            <Droplets className="absolute -bottom-4 -right-4 h-32 w-32 text-white opacity-10" />
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4">Top Contributors</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500">
                      {String.fromCharCode(65 + i)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">User {i + 1}</p>
                      <p className="text-xs text-slate-400">8 Donations</p>
                    </div>
                  </div>
                  <div className="bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-yellow-100">
                    Elite
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
