
import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { DocumentCheckIcon, ClockIcon, ExclamationCircleIcon, DocumentTextIcon } from './icons';

interface NurseDocumentsScreenProps {
    onBack: () => void;
}

const DocumentStatus = ({ status }: { status: 'verified' | 'pending' | 'rejected' }) => {
    const config = {
        verified: { text: 'موثّق', icon: <DocumentCheckIcon className="w-5 h-5" />, color: 'text-green-600', bg: 'bg-green-100' },
        pending: { text: 'قيد المراجعة', icon: <ClockIcon className="w-5 h-5" />, color: 'text-orange-600', bg: 'bg-orange-100' },
        rejected: { text: 'مرفوض', icon: <ExclamationCircleIcon className="w-5 h-5" />, color: 'text-red-600', bg: 'bg-red-100' },
    }[status];

    return (
        <div className={`flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full ${config.bg} ${config.color}`}>
            {config.icon}
            <span>{config.text}</span>
        </div>
    );
};

const DocumentRow = ({ name, status }: { name: string, status: 'verified' | 'pending' | 'rejected' }) => (
    <div className="flex justify-between items-center p-4 bg-white rounded-lg border">
        <div className="flex items-center gap-3">
            <DocumentTextIcon active />
            <span className="font-semibold text-gray-700">{name}</span>
        </div>
        <DocumentStatus status={status} />
    </div>
);

const NurseDocumentsScreen: React.FC<NurseDocumentsScreenProps> = ({ onBack }) => {
    return (
        <div className="flex flex-col h-full bg-gray-50">
            <div className="p-4 flex items-center border-b bg-white sticky top-0 z-10">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100">
                    <ArrowRightIcon className="w-6 h-6 text-gray-600" />
                </button>
                <h1 className="text-xl font-bold text-gray-800 mx-auto">المستندات والوثائق</h1>
            </div>

            <div className="flex-grow overflow-y-auto p-4 space-y-4">
                <div className="space-y-3">
                    <DocumentRow name="البطاقة الشخصية" status="verified" />
                    <DocumentRow name="شهادة التخرج" status="verified" />
                    <DocumentRow name="رخصة مزاولة المهنة" status="pending" />
                    <DocumentRow name="شهادة الإنعاش القلبي الرئوي" status="rejected" />
                </div>
                
                {/* Note for rejected document */}
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md">
                    <p className="font-bold">شهادة الإنعاش القلبي الرئوي مرفوضة</p>
                    <p className="text-sm">السبب: الشهادة منتهية الصلاحية. يرجى رفع شهادة سارية.</p>
                </div>
            </div>
            
            <div className="p-4 bg-white border-t sticky bottom-0">
                <button className="w-full bg-teal-500 text-white py-3 rounded-lg font-bold text-lg shadow-md hover:bg-teal-600 transition">
                    رفع مستند جديد
                </button>
            </div>
        </div>
    );
};

export default NurseDocumentsScreen;
