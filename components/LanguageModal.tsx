import React, { useState, useEffect } from 'react';

interface LanguageModalProps {
    onClose: () => void;
}

const LanguageModal: React.FC<LanguageModalProps> = ({ onClose }) => {
    const [visible, setVisible] = useState(false);
    const [selectedLang, setSelectedLang] = useState('ar');

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 10);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setVisible(false);
        setTimeout(onClose, 300);
    };
    
    const handleSelect = (lang: string) => {
        setSelectedLang(lang);
        alert(lang === 'ar' ? 'تم تغيير اللغة إلى العربية.' : 'Language changed to English.');
        handleClose();
    };

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
                <h2 className="text-xl font-bold text-gray-800 mb-6">تغيير اللغة / Change Language</h2>
                <div className="space-y-3">
                    <button 
                        onClick={() => handleSelect('ar')}
                        className={`w-full py-3 rounded-lg font-bold text-lg border-2 transition ${selectedLang === 'ar' ? 'bg-cyan-500 text-white border-cyan-500' : 'bg-white text-gray-700 border-gray-300'}`}
                    >
                        العربية
                    </button>
                    <button 
                        onClick={() => handleSelect('en')}
                        className={`w-full py-3 rounded-lg font-bold text-lg border-2 transition ${selectedLang === 'en' ? 'bg-cyan-500 text-white border-cyan-500' : 'bg-white text-gray-700 border-gray-300'}`}
                    >
                        English
                    </button>
                </div>
                <button onClick={handleClose} className="w-full mt-6 bg-gray-100 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-200 transition">
                    إغلاق
                </button>
            </div>
        </div>
    );
};

export default LanguageModal;