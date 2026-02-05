
import React from 'react';
import { Heart, Activity, User, Bell, Menu, PlusCircle } from 'lucide-react';

interface NavigationProps {
  onNavigate: (view: string) => void;
  activeView: string;
}

const Navigation: React.FC<NavigationProps> = ({ onNavigate, activeView }) => {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => onNavigate('dashboard')}>
              <div className="bg-red-600 p-1.5 rounded-lg mr-2">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">JeevenDaan</span>
            </div>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-4">
              <button
                onClick={() => onNavigate('dashboard')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${activeView === 'dashboard' ? 'text-red-600 bg-red-50' : 'text-slate-600 hover:text-red-600 hover:bg-slate-50'}`}
              >
                Dashboard
              </button>
              <button
                onClick={() => onNavigate('requests')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${activeView === 'requests' ? 'text-red-600 bg-red-50' : 'text-slate-600 hover:text-red-600 hover:bg-slate-50'}`}
              >
                Browse Requests
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
             <button
                onClick={() => onNavigate('create-request')}
                className="hidden md:flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-lg shadow-red-200"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Request Blood
              </button>
            <button className="p-2 text-slate-400 hover:text-red-600 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button 
              onClick={() => onNavigate('profile')}
              className="flex items-center space-x-2 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
            >
              <div className="h-8 w-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold border border-slate-300">
                <User className="h-4 w-4" />
              </div>
            </button>
            <button className="md:hidden p-2 text-slate-600">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
