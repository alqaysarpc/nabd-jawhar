
import React from 'react';
import { ChevronLeftIcon, StarIcon } from '@heroicons/react/24/solid';
import { 
    PencilSquareIcon, 
    QuestionMarkCircleIcon, 
    ArrowLeftOnRectangleIcon, 
    DocumentCheckIcon, 
    BanknotesIcon,
    MapPinIcon
} from './icons';
import { Review } from '../types';

interface NurseProfileScreenComponentProps {
    onLogout: () => void;
    onEditProfile: () => void;
    onViewReviews: () => void;
    onManageDocuments: () => void;
    onManageAddress: () => void;
    onHelpAndSupport: () => void;
    reviews: Review[];
}

const ProfileOption = ({ label, icon, hasArrow = true, onClick }: { label: string, icon: React.ReactNode, hasArrow?: boolean, onClick?: () => void }) => (
    <button onClick={onClick} className="w-full flex items-center justify-between p-4 bg-white rounded-lg border hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-teal-500 text-right">
        <div className="flex items-center gap-4">
            <span className="text-teal-600">{icon}</span>
            <span className="font-semibold text-gray-700">{label}</span>
        </div>
        {hasArrow && <ChevronLeftIcon className="w-5 h-5 text-gray-400" />}
    </button>
);

const NurseProfileScreenComponent: React.FC<NurseProfileScreenComponentProps> = ({ 
    onLogout, 
    onEditProfile, 
    onViewReviews,
    onManageDocuments,
    onManageAddress,
    onHelpAndSupport,
    reviews
}) => {
    const averageRating = reviews.length > 0
        ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
        : 'N/A';

    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:gap-6 lg:gap-8 md:items-start">
            <div className="md:col-span-1 flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border">
                <img src="/9.png" alt="Profile" className="w-24 h-24 rounded-full mb-4" />
                <h2 className="text-xl font-bold text-gray-800">خولة بارجاش </h2>
                <p className="text-gray-500">ممرضة أطفال</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                    <StarIcon className="w-5 h-5 text-yellow-400" />
                    <span className="font-bold text-gray-700">{averageRating}</span>
                    <span className="text-sm text-gray-400">({reviews.length} تقييم)</span>
                </div>
            </div>

            <div className="md:col-span-2 space-y-3">
                <ProfileOption label="تعديل الملف الشخصي" icon={<PencilSquareIcon className="w-6 h-6" />} onClick={onEditProfile} />
                <ProfileOption label="تقييماتي" icon={<StarIcon className="w-6 h-6" />} onClick={onViewReviews} />
                <ProfileOption label="المستندات والوثائق" icon={<DocumentCheckIcon className="w-6 h-6" />} onClick={onManageDocuments} />
                <ProfileOption label="العنوان" icon={<MapPinIcon className="w-6 h-6" />} onClick={onManageAddress} />
                <ProfileOption label="المساعدة والدعم" icon={<QuestionMarkCircleIcon className="w-6 h-6" />} onClick={onHelpAndSupport} />
                <ProfileOption label="تسجيل الخروج" icon={<ArrowLeftOnRectangleIcon className="w-6 h-6 text-red-500" />} hasArrow={false} onClick={onLogout} />
            </div>
        </div>
    );
};

export default NurseProfileScreenComponent;
