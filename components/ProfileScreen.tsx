
import React from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { PencilSquareIcon, GlobeAltIcon, QuestionMarkCircleIcon, ArrowLeftOnRectangleIcon, MapPinIcon } from './icons';

interface ProfileScreenProps {
    onLogout: () => void;
    onEditProfile: () => void;
    onManageAddress: () => void;
    onLanguageChange: () => void;
    onHelpAndSupport: () => void;
}

const ProfileOption = ({ label, icon, hasArrow = true, onClick }: { label: string, icon: React.ReactNode, hasArrow?: boolean, onClick?: () => void }) => (
    <button onClick={onClick} className="w-full flex items-center justify-between p-4 bg-white rounded-lg border hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-cyan-500 text-right">
        <div className="flex items-center gap-4">
            <span className="text-cyan-600">{icon}</span>
            <span className="font-semibold text-gray-700">{label}</span>
        </div>
        {hasArrow && <ChevronLeftIcon className="w-5 h-5 text-gray-400" />}
    </button>
);

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onLogout, onEditProfile, onManageAddress, onLanguageChange, onHelpAndSupport }) => {
    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:gap-6 lg:gap-8 md:items-start">
            <div className="md:col-span-1 flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border">
                <img src="https://picsum.photos/seed/avatar/100/100" alt="Profile" className="w-24 h-24 rounded-full mb-4" />
                <h2 className="text-xl font-bold text-gray-800">عبدالله محمد</h2>
                <p className="text-gray-500">abdullah.m@example.com</p>
            </div>

            <div className="md:col-span-2 space-y-3">
                <ProfileOption label="تعديل الملف الشخصي" icon={<PencilSquareIcon className="w-6 h-6" />} onClick={onEditProfile} />
                <ProfileOption label="العنوان" icon={<MapPinIcon className="w-6 h-6" />} onClick={onManageAddress} />
                <ProfileOption label="تغيير اللغة" icon={<GlobeAltIcon className="w-6 h-6" />} onClick={onLanguageChange} />
                <ProfileOption label="المساعدة والدعم" icon={<QuestionMarkCircleIcon className="w-6 h-6" />} onClick={onHelpAndSupport} />
                <ProfileOption label="تسجيل الخروج" icon={<ArrowLeftOnRectangleIcon className="w-6 h-6 text-red-500" />} hasArrow={false} onClick={onLogout} />
            </div>
        </div>
    );
};

export default ProfileScreen;
