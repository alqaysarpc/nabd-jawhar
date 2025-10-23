import React, { useState, useEffect } from 'react';
import { AvailabilityStatus } from '../types';
import { SunIcon, MoonIcon, PauseCircleIcon } from './icons';

interface AvailabilityStatusModalProps {
    onClose: () => void;
    onUpdateStatus: (status: AvailabilityStatus) => void;
    currentStatus: AvailabilityStatus;
}

const StatusOption: React.FC<{
    icon: React.ReactNode;
    title: string;
    description: string;
    isSelected: boolean;
    onClick: () => void;
}> = ({ icon, title, description, isSelected, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`w-full text-right p-4 border-2 rounded-xl flex items-center gap-4 transition-all duration-200 ${
                isSelected ? 'border-teal-500 bg-teal-50' : 'border-gray-200 bg-white hover:border-teal-300'
            }`}
        >
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gray-100 text-gray-600 rounded-lg">
                {icon}
            </div>
            <div className="flex-grow">
                <h3 className={`font-bold ${isSelected ? 'text-teal-700' : 'text-gray-800'}`}>{title}</h3>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
        </button>
    );
};

const AvailabilityStatusModal: React.FC<AvailabilityStatusModalProps> = ({ onClose, onUpdateStatus, currentStatus }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 10);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = (e?: React.MouseEvent) => {
        if (e && e.target !== e.currentTarget) return;
        setVisible(false);
        setTimeout(onClose, 300);
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end transition-opacity duration-300"
            style={{ opacity: visible ? 1 : 0 }}
            onClick={handleClose}
        >
            <div
                className={`bg-white w-full rounded-t-2xl p-6 flex flex-col transform transition-transform duration-300 ease-out ${
                    visible ? 'translate-y-0' : 'translate-y-full'
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex-shrink-0 flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">تغيير حالة التوفر</h2>
                    <button onClick={() => handleClose()} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                </div>

                <div className="space-y-3">
                    <StatusOption
                        icon={<SunIcon className="w-7 h-7 text-yellow-500" />}
                        title="متاح لاستقبال الطلبات"
                        description="ستظهر للمستخدمين وستتلقى إشعارات بالطلبات."
                        isSelected={currentStatus === 'available'}
                        onClick={() => onUpdateStatus('available')}
                    />
                    <StatusOption
                        icon={<PauseCircleIcon className="w-7 h-7 text-orange-500" />}
                        title="أخذ استراحة"
                        description="لن تتلقى طلبات جديدة مؤقتاً."
                        isSelected={currentStatus === 'on_break'}
                        onClick={() => onUpdateStatus('on_break')}
                    />
                    <StatusOption
                        icon={<MoonIcon className="w-7 h-7 text-slate-500" />}
                        title="غير متصل"
                        description="لن تظهر في البحث ولن تستقبل أي طلبات."
                        isSelected={currentStatus === 'offline'}
                        onClick={() => onUpdateStatus('offline')}
                    />
                </div>
            </div>
        </div>
    );
};

export default AvailabilityStatusModal;
