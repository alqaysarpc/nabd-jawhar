

import React from 'react';
import { Role } from '../types';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { LogoIcon } from './icons';
import { LoginRoleSelectionIllustration } from './illustrations';

interface LoginRoleSelectionProps {
  onSelectRole: (role: Role) => void;
  onBack: () => void;
}

const LoginRoleSelection: React.FC<LoginRoleSelectionProps> = ({ onSelectRole, onBack }) => {
  return (
    <div className="flex flex-col min-h-screen bg-cyan-50 p-6">
      <div className="flex-none">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100">
          <ArrowRightIcon className="w-6 h-6 text-gray-600" />
        </button>
      </div>
      <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center bg-white rounded-full mb-6 mx-auto shadow-lg">
          <LogoIcon className="w-16 h-16 md:w-24 md:h-24" />
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">تسجيل الدخول</h1>
        <p className="text-gray-500 md:text-lg lg:text-xl mt-2 mb-8">اختر نوع حسابك للمتابعة</p>
        
        <div className="w-full max-w-sm md:max-w-md lg:max-w-lg mb-8">
            <LoginRoleSelectionIllustration />
        </div>
        
        <div className="w-full max-w-sm space-y-4">
          <button
            onClick={() => onSelectRole('user')}
            className="w-full bg-cyan-500 text-white py-4 rounded-xl font-bold text-lg shadow-md shadow-cyan-500/30 hover:bg-cyan-600 transition"
          >
            تسجيل الدخول كمستخدم
          </button>
          <button
            onClick={() => onSelectRole('nurse')}
            className="w-full bg-teal-500 text-white py-4 rounded-xl font-bold text-lg shadow-md shadow-teal-500/30 hover:bg-teal-600 transition"
          >
            تسجيل الدخول كممرض
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRoleSelection;