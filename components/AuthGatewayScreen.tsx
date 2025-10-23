

import React from 'react';
import { LogoIcon } from './icons';
import { AuthGatewayIllustration } from './illustrations';

interface AuthGatewayScreenProps {
  onLoginClick: () => void;
  onSignUpClick: () => void;
  onGuestClick: () => void;
}

const AuthGatewayScreen: React.FC<AuthGatewayScreenProps> = ({ onLoginClick, onSignUpClick, onGuestClick }) => {
  return (
    <div className="flex flex-col h-full bg-cyan-50 text-center p-8 animate-fade-in">
       <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
      `}</style>

      <div className="flex-grow flex flex-col items-center justify-center -mt-8">
        <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center bg-white rounded-full mb-4 shadow-md">
          <LogoIcon className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24" />
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-cyan-700 font-cairo">نبض جوار</h1>
        <p className="text-lg md:text-xl lg:text-2xl text-cyan-600 mt-2">رعايتكم في راحة منزلكم</p>
        <div className="w-full max-w-sm md:max-w-md lg:max-w-lg mt-8">
            <AuthGatewayIllustration />
        </div>
      </div>

      <div className="flex-shrink-0 w-full max-w-sm mx-auto">
        <div className="space-y-4">
          <button
            onClick={onSignUpClick}
            className="w-full bg-cyan-500 text-white py-3.5 rounded-xl font-bold text-lg shadow-md shadow-cyan-500/30 hover:bg-cyan-600 transition"
          >
            إنشاء حساب جديد
          </button>
        </div>
        <p className="text-gray-500 mt-6">
          لديك حساب بالفعل؟{' '}
          <button onClick={onLoginClick} className="font-bold text-cyan-600 hover:underline">
            تسجيل الدخول
          </button>
        </p>
        <div className="mt-4">
          <button onClick={onGuestClick} className="font-semibold text-gray-500 hover:text-cyan-600 transition">
            الدخول كضيف
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthGatewayScreen;