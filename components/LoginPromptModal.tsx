
import React, { useState, useEffect } from 'react';
import { LogoIcon } from './icons';
import { ArrowLeftOnRectangleIcon, UserPlusIcon } from '@heroicons/react/24/outline';


interface LoginPromptModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin: () => void;
    onSignUp: () => void;
}

const LoginPromptModal: React.FC<LoginPromptModalProps> = ({ isOpen, onClose, onLogin, onSignUp }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => setVisible(true), 10);
            return () => clearTimeout(timer);
        } else {
            setVisible(false);
        }
    }, [isOpen]);

    const handleClose = () => {
        setVisible(false);
        setTimeout(onClose, 300);
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 transition-opacity duration-300"
            style={{ opacity: visible ? 1 : 0 }}
            onClick={handleClose}
        >
            <div
                className={`bg-white rounded-2xl p-6 w-full max-w-sm text-center transform transition-all duration-300 ease-out ${visible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-20 h-20 mx-auto flex items-center justify-center bg-cyan-50 rounded-full mb-4">
                   <LogoIcon className="w-12 h-12" />
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-2">ميزة للمستخدمين المسجلين</h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    للوصول لهذه الميزة والاستفادة من كامل خدماتنا، يرجى تسجيل الدخول أو إنشاء حساب جديد.
                </p>

                <div className="flex flex-col gap-3">
                    <button onClick={onLogin} className="w-full flex items-center justify-center gap-3 bg-cyan-500 text-white py-3 rounded-lg font-bold text-lg shadow-md hover:bg-cyan-600 transition">
                        <ArrowLeftOnRectangleIcon className="w-6 h-6 transform -scale-x-100" />
                        تسجيل الدخول
                    </button>
                    <button onClick={onSignUp} className="w-full flex items-center justify-center gap-3 bg-teal-500 text-white py-3 rounded-lg font-bold text-lg shadow-md hover:bg-teal-600 transition">
                        <UserPlusIcon className="w-6 h-6" />
                        إنشاء حساب جديد
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPromptModal;
