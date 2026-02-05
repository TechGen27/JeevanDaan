
import React, { useState } from 'react';
import { PlusCircle, MapPin, Building, User, Phone, Droplets, AlertTriangle } from 'lucide-react';
import { BLOOD_GROUPS, URGENCY_LEVELS } from '../constants';
import { UrgencyLevel, BloodGroup } from '../types';

interface RequestFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const BloodRequestForm: React.FC<RequestFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    bloodGroup: BloodGroup.OPos,
    unitsRequired: 1,
    hospitalName: '',
    hospitalAddress: '',
    contactPerson: '',
    contactPhone: '',
    urgency: UrgencyLevel.Normal
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
      <div className="bg-red-600 p-8 text-white">
        <h2 className="text-2xl font-bold">New Emergency Request</h2>
        <p className="text-red-100 text-sm mt-1">Every second counts. Fill in the details to alert donors nearby.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <Droplets className="h-4 w-4 text-red-500" /> Blood Group Needed
            </label>
            <select
              value={formData.bloodGroup}
              onChange={(e) => setFormData({...formData, bloodGroup: e.target.value as BloodGroup})}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 focus:outline-none appearance-none bg-no-repeat bg-[right_1rem_center]"
              style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23cbd5e1\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundSize: '1.25rem'}}
            >
              {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <PlusCircle className="h-4 w-4 text-slate-400" /> Units Required
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={formData.unitsRequired}
              onChange={(e) => setFormData({...formData, unitsRequired: parseInt(e.target.value)})}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <Building className="h-4 w-4 text-slate-400" /> Hospital Name
            </label>
            <input
              type="text"
              required
              value={formData.hospitalName}
              onChange={(e) => setFormData({...formData, hospitalName: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="e.g. City General Hospital"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-slate-400" /> Hospital Address
            </label>
            <textarea
              required
              rows={2}
              value={formData.hospitalAddress}
              onChange={(e) => setFormData({...formData, hospitalAddress: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 focus:outline-none resize-none"
              placeholder="Full address of the medical facility"
            ></textarea>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <User className="h-4 w-4 text-slate-400" /> Contact Person
            </label>
            <input
              type="text"
              required
              value={formData.contactPerson}
              onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="Name of attendant"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <Phone className="h-4 w-4 text-slate-400" /> Contact Phone
            </label>
            <input
              type="tel"
              required
              value={formData.contactPhone}
              onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="e.g. +91 9876543210"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-slate-400" /> Urgency Level
          </label>
          <div className="flex flex-wrap gap-2">
            {URGENCY_LEVELS.map(level => (
              <button
                key={level}
                type="button"
                onClick={() => setFormData({...formData, urgency: level})}
                className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all ${
                  formData.urgency === level 
                  ? 'bg-red-600 border-red-600 text-white shadow-md' 
                  : 'bg-white border-slate-200 text-slate-600 hover:border-red-200'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 flex flex-col-reverse sm:flex-row gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-6 py-4 rounded-2xl font-bold text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-[2] bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-red-200 flex items-center justify-center gap-2"
          >
            Submit Request & Alert Donors
          </button>
        </div>
      </form>
    </div>
  );
};

export default BloodRequestForm;
