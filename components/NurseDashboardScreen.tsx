
import React from 'react';
import { JobRequest } from '../types';
import { WalletIcon, DocumentCheckIcon, ClockIcon, SunIcon } from './icons';
import { StarIcon, ChevronLeftIcon } from '@heroicons/react/24/solid';

interface NurseDashboardScreenProps {
    newRequests: JobRequest[];
    onViewRequestDetails: (requestId: number) => void;
    completedRequestsCount: number;
    averageRating: number;
    totalEarnings: number;
    onViewFilteredRequests: (filter: 'new' | 'completed') => void;
}

const mockTodaysAppointments = [
    { id: 98, service: 'العناية بالجروح', patientName: 'محمد علي', time: '02:00 م' },
    { id: 99, service: 'رعاية كبار السن', patientName: 'فاطمة عبدالله', time: '05:30 م' },
];

const StatCard: React.FC<{
    icon: React.ReactNode;
    value: string | number;
    label: string;
    onClick?: () => void;
}> = ({ icon, value, label, onClick }) => (
    <button 
        onClick={onClick} 
        disabled={!onClick}
        className="w-full text-center bg-white p-4 rounded-lg shadow-sm border transition-all duration-200 hover:shadow-md hover:border-teal-300 disabled:cursor-default disabled:hover:shadow-sm disabled:hover:border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
    >
        <div className="w-10 h-10 flex items-center justify-center bg-teal-50 text-teal-500 rounded-full mx-auto">
            {icon}
        </div>
        <p className="text-2xl font-bold text-gray-800 mt-2">{value}</p>
        <p className="text-xs text-gray-500 font-medium">{label}</p>
    </button>
);

const NurseDashboardScreen: React.FC<NurseDashboardScreenProps> = ({ 
    newRequests, 
    onViewRequestDetails, 
    completedRequestsCount,
    averageRating,
    totalEarnings,
    onViewFilteredRequests
}) => {
    return (
        <div className="p-4 md:p-6 space-y-6 md:space-y-8 bg-gray-50">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-800">أهلاً بك، خولة</h1>
                <p className="text-gray-500">لديك {newRequests.length} طلبات جديدة اليوم.</p>
            </div>
            
            {/* Performance Summary */}
            <div>
                <h2 className="text-lg font-bold text-gray-800 mb-3">ملخص الأداء</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <StatCard 
                        icon={<ClockIcon className="w-6 h-6" />}
                        value={newRequests.length}
                        label="طلبات بإنتظارك"
                        onClick={() => onViewFilteredRequests('new')}
                    />
                     <StatCard 
                        icon={<SunIcon className="w-6 h-6" />}
                        value="45,000"
                        label="أرباح اليوم (﷼)"
                    />
                    <StatCard 
                        icon={<DocumentCheckIcon className="w-6 h-6" />}
                        value={completedRequestsCount}
                        label="طلبات مكتملة"
                        onClick={() => onViewFilteredRequests('completed')}
                    />
                     <StatCard 
                        icon={<StarIcon className="w-6 h-6" />}
                        value={averageRating.toFixed(1)}
                        label="متوسط التقييم"
                    />
                </div>
                <button 
                    onClick={() => onViewFilteredRequests('completed')}
                    className="w-full text-right flex justify-between items-center mt-3 bg-white p-4 rounded-lg shadow-sm border transition-all duration-200 hover:shadow-md hover:border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 flex items-center justify-center bg-green-50 text-green-500 rounded-full">
                            <WalletIcon className="w-6 h-6" />
                        </div>
                        <div>
                             <p className="text-sm text-gray-500 font-medium">إجمالي الأرباح</p>
                            <p className="text-xl font-bold text-gray-800">{totalEarnings.toLocaleString('ar-SA')} <span className="text-sm font-normal">﷼</span></p>
                        </div>
                    </div>
                    <ChevronLeftIcon className="w-6 h-6 text-gray-400" />
                </button>
            </div>

            <div className="md:grid md:grid-cols-2 md:gap-6 lg:gap-8 space-y-6 md:space-y-0">
                {/* New Requests */}
                <div>
                    <h2 className="text-lg font-bold text-gray-800 mb-3">طلبات جديدة</h2>
                    <div className="space-y-4">
                        {newRequests.length > 0 ? newRequests.map(req => (
                            <div key={req.id} className="bg-white p-4 rounded-lg shadow-sm border">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-gray-800">{req.service}</h3>
                                        <p className="text-sm text-gray-500">{req.patientName} - {req.location}</p>
                                        <p className="text-sm text-teal-600 font-semibold">{req.time}</p>
                                    </div>
                                    <span className="font-bold text-lg">{req.price.toLocaleString('ar-SA')} ﷼</span>
                                </div>
                                {req.isUrgent && <div className="mt-2 text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full inline-block">حالة عاجلة</div>}
                                <div className="mt-4">
                                    <button 
                                        onClick={() => onViewRequestDetails(req.id)}
                                        className="w-full py-2 bg-transparent border border-teal-500 text-teal-500 font-bold rounded-lg hover:bg-teal-50 transition"
                                    >
                                        عرض التفاصيل
                                    </button>
                                </div>
                            </div>
                        )) : <p className="text-center text-gray-500 py-4">لا توجد طلبات جديدة حالياً.</p>}
                    </div>
                </div>
                
                {/* Today's Appointments */}
                 <div>
                    <h2 className="text-lg font-bold text-gray-800 mb-3">مواعيد اليوم</h2>
                     <div className="space-y-4">
                        {mockTodaysAppointments.map(appt => (
                             <div key={appt.id} className="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-gray-800">{appt.service}</h3>
                                    <p className="text-sm text-gray-500">{appt.patientName}</p>
                                </div>
                                <span className="font-semibold text-teal-600">{appt.time}</span>
                             </div>
                        ))}
                     </div>
                </div>
            </div>

        </div>
    );
};

export default NurseDashboardScreen;
