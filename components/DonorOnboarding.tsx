
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Droplets, Calendar, MapPin, Activity, Check } from 'lucide-react';
/* Fixed: BloodGroup is not exported from constants.ts. Removed it as it is not used as a type here. */
import { BLOOD_GROUPS } from '../constants';

interface OnboardingProps {
  onComplete: (data: any) => void;
}

const DonorOnboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    bloodGroup: '',
    age: '',
    weight: '',
    lastDonationDate: '',
    chronicConditions: false,
    city: '',
    zipCode: '',
    isAvailable: true
  });

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const updateForm = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const steps = [
    { title: 'Vital Info', icon: Droplets },
    { title: 'Medical', icon: Activity },
    { title: 'Location', icon: MapPin },
  ];

  const isStepValid = () => {
    if (step === 1) return formData.bloodGroup && formData.age && formData.weight;
    if (step === 2) return true; // optional
    if (step === 3) return formData.city && formData.zipCode;
    return false;
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 animate-fadeIn">
      <div className="p-8">
        <div className="flex justify-between items-center mb-10">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center flex-1 relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 z-10 ${
                step > i + 1 ? 'bg-green-500 text-white' : 
                step === i + 1 ? 'bg-red-600 text-white ring-4 ring-red-100 shadow-lg' : 
                'bg-slate-100 text-slate-400'
              }`}>
                {step > i + 1 ? <Check className="h-5 w-5" /> : <s.icon className="h-5 w-5" />}
              </div>
              <span className={`text-[10px] font-bold mt-2 uppercase tracking-wider ${step >= i + 1 ? 'text-slate-900' : 'text-slate-400'}`}>
                {s.title}
              </span>
              {i < steps.length - 1 && (
                <div className={`absolute top-5 left-1/2 w-full h-0.5 -z-0 ${step > i + 1 ? 'bg-green-200' : 'bg-slate-100'}`}></div>
              )}
            </div>
          ))}
        </div>

        <div className="min-h-[320px]">
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-bold text-slate-900">Vital Information</h2>
              <p className="text-slate-500 text-sm">Tell us your blood group and physical stats.</p>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Blood Group</label>
                <div className="grid grid-cols-4 gap-2">
                  {BLOOD_GROUPS.map(bg => (
                    <button
                      key={bg}
                      onClick={() => updateForm('bloodGroup', bg)}
                      className={`py-3 rounded-xl font-bold transition-all border ${
                        formData.bloodGroup === bg 
                        ? 'bg-red-600 border-red-600 text-white shadow-lg' 
                        : 'border-slate-200 text-slate-600 hover:border-red-300'
                      }`}
                    >
                      {bg}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => updateForm('age', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="e.g. 25"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Weight (kg)</label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => updateForm('weight', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="e.g. 70"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-bold text-slate-900">Medical History</h2>
              <p className="text-slate-500 text-sm">Help us determine your eligibility.</p>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Last Donation Date</label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.lastDonationDate}
                    onChange={(e) => updateForm('lastDonationDate', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  />
                  <Calendar className="absolute right-4 top-3.5 h-5 w-5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-slate-700">Any Chronic Conditions?</span>
                  <input
                    type="checkbox"
                    checked={formData.chronicConditions}
                    onChange={(e) => updateForm('chronicConditions', e.target.checked)}
                    className="w-5 h-5 accent-red-600 rounded"
                  />
                </div>
                <p className="text-xs text-slate-500">Chronic conditions like diabetes or heart issues may affect donation frequency.</p>
              </div>

              <div className="flex items-center gap-3 p-4 bg-red-50 text-red-700 rounded-2xl">
                <Activity className="h-5 w-5 flex-shrink-0" />
                <p className="text-xs font-medium">By proceeding, you confirm that you are currently healthy and eligible to donate blood according to medical standards.</p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-bold text-slate-900">Location Settings</h2>
              <p className="text-slate-500 text-sm">Set your location for proximity matching.</p>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => updateForm('city', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  placeholder="Enter city name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Zip Code</label>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => updateForm('zipCode', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  placeholder="e.g. 110001"
                />
              </div>

              <div className="bg-green-50 p-4 rounded-2xl border border-green-100 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-green-800">Available to Donate?</p>
                  <p className="text-xs text-green-600">You can toggle this status anytime.</p>
                </div>
                <button 
                  onClick={() => updateForm('isAvailable', !formData.isAvailable)}
                  className={`w-12 h-6 rounded-full transition-all relative ${formData.isAvailable ? 'bg-green-600' : 'bg-slate-300'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.isAvailable ? 'right-1' : 'left-1'}`}></div>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 flex gap-4">
          {step > 1 && (
            <button
              onClick={prevStep}
              className="flex-1 px-6 py-3.5 rounded-2xl font-bold text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center"
            >
              <ChevronLeft className="h-5 w-5 mr-2" />
              Back
            </button>
          )}
          <button
            onClick={step === 3 ? () => onComplete(formData) : nextStep}
            disabled={!isStepValid()}
            className={`flex-[2] px-6 py-3.5 rounded-2xl font-bold text-white transition-all flex items-center justify-center shadow-lg ${
              isStepValid() ? 'bg-red-600 hover:bg-red-700 shadow-red-200' : 'bg-slate-300 cursor-not-allowed'
            }`}
          >
            {step === 3 ? 'Complete Setup' : 'Continue'}
            {step < 3 && <ChevronRight className="h-5 w-5 ml-2" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonorOnboarding;
