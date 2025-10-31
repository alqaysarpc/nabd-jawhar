import React, { useState } from 'react';
import { Role } from '../types';
import { ArrowRightIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { LogoIcon } from './icons';
import { CareIllustration } from './illustrations';

// إضافة المكون الخاص بالنافذة المنبثقة
interface CustomModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    body: string;
}

const CustomAlertModal: React.FC<CustomModalProps> = ({ isOpen, onClose, title, body }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 z-[9999] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-xs w-full p-6 text-right transform transition-all duration-300 scale-100">
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">{body}</p>
                <div className="flex justify-end">
                    <button onClick={onClose} className="bg-cyan-500 text-white py-2 px-6 rounded-xl font-semibold hover:bg-cyan-600 transition">
                        حسناً
                    </button>
                </div>
            </div>
        </div>
    );
};

interface LoginScreenProps {
  role: Role;
  onBack: () => void;
  onLoginSuccess: (role: Role) => void;
  onAdminLoginSuccess: () => void; // هذه الدالة هي مفتاح التوجيه للوحة المشرف
}

const LoginScreen: React.FC<LoginScreenProps> = ({ role, onBack, onLoginSuccess, onAdminLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  // حالة لعرض رسالة خطأ
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const isUser = role === 'user';
  const themeColor = isUser ? 'cyan' : 'teal';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // التحقق من المشرف السري
    if (email.toLowerCase() === 'admin' && password === 'admin') {
        onAdminLoginSuccess();
        return;
    }
    // Mock login logic
    if (email && password) {
      onLoginSuccess(role);
    } else {
      // استبدال alert() بنافذة منبثقة مخصصة
      setAlertMessage('الرجاء إدخال اسم المستخدم وكلمة المرور.');
      setIsAlertOpen(true);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-cyan-50 p-6 overflow-y-auto">
      <div className="flex-none">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100">
          <ArrowRightIcon className="w-6 h-6 text-gray-600" />
        </button>
      </div>
      <div className="flex-grow flex flex-col items-center justify-center px-4">
        <div className={`w-24 h-24 md:w-28 md:h-28 flex items-center justify-center bg-white rounded-full mb-6 mx-auto shadow-lg`}>
          <LogoIcon className="w-16 h-16 md:w-20 md:h-20" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">تسجيل الدخول</h1>
        <p className="text-gray-500 mt-2 mb-8 text-center">
          {isUser ? 'أهلاً بك مجدداً، قم بتسجيل الدخول للمتابعة' : 'أهلاً بكِ أيتها الممرضة، سجلي دخولك لإدارة عملك'}
        </p>
        <form onSubmit={handleLogin} className="w-full max-w-sm md:max-w-md space-y-4 text-right">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">اسم المستخدم أو البريد الإلكتروني</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
              placeholder="admin or example@mail.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">كلمة المرور</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                placeholder="********"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-3 top-1/2 -translate-y-1/2">
                {showPassword ? <EyeSlashIcon className="w-6 h-6 text-gray-400" /> : <EyeIcon className="w-6 h-6 text-gray-400" />}
              </button>
            </div>
          </div>
          <button type="button" className="text-sm font-medium text-cyan-600 hover:underline">
            هل نسيت كلمة المرور؟
          </button>
          <button type="submit" className={`w-full bg-${themeColor}-500 text-white py-3.5 rounded-xl font-bold text-lg shadow-md shadow-${themeColor}-500/30 hover:bg-${themeColor}-600 transition !mt-6`}>
            تسجيل الدخول
          </button>
        </form>
      </div>
       {/* إضافة النافذة المنبثقة للتحذير */}
       <CustomAlertModal
         isOpen={isAlertOpen}
         onClose={() => setIsAlertOpen(false)}
         title="خطأ في تسجيل الدخول"
         body={alertMessage}
       />
    </div>
  );
};

export default LoginScreen;

