import React from 'react';
import { LogoIcon } from './icons';
import { UserWelcomeIllustration, NurseWelcomeIllustration } from './illustrations';

interface AuthBrandingProps {
    variant?: 'user' | 'nurse';
}


const AuthBranding: React.FC<AuthBrandingProps> = ({ variant = 'user' }) => {
  const Illustration = variant === 'nurse' ? NurseWelcomeIllustration : UserWelcomeIllustration;
  
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-cyan-50 flex-col items-center justify-center p-12 text-center">
      <div className="w-24 h-24 flex items-center justify-center bg-white rounded-full mb-6 shadow-lg">
        <LogoIcon className="w-16 h-16" />
      </div>
      <h2 className="text-3xl font-bold text-cyan-700">نبض جوار</h2>
      <p className="text-cyan-600 mt-2">رعايتكم في راحة منزلكم</p>
      <div className="mt-8 max-w-md w-full">
         <Illustration />
      </div>
    </div>
  );
};

export default AuthBranding;