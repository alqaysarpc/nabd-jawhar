
import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { JobRequest } from '../types';
import { MapPinIcon, WalletIcon, MapIcon } from './icons';

interface NurseRequestDetailScreenProps {
    request: JobRequest;
    onBack: () => void;
    onAccept: (requestId: number) => void;
    onReject: (requestId: number) => void;
    onStartNavigation: (requestId: number) => void;
    onMarkAsCompleted: (requestId: number) => void;
}

const InfoRow = ({ label, value }: {label: string, value: React.ReactNode}) => (
    <div className="flex justify-between items-center py-2 text-sm">
        <span className="text-gray-500">{label}</span>
        <span className="font-semibold text-gray-800 text-right">{value}</span>
    </div>
);

const ActionFooter: React.FC<{ request: JobRequest; onAccept: any; onReject: any; onStartNavigation: any; onMarkAsCompleted: any }> = ({ request, onAccept, onReject, onStartNavigation, onMarkAsCompleted }) => {
    switch (request.status) {
        case 'new':
            return (
                <div className="p-4 bg-white border-t sticky bottom-0 grid grid-cols-2 gap-3">
                    <button onClick={() => onReject(request.id)} className="w-full bg-red-100 text-red-700 py-3 rounded-lg font-bold text-lg hover:bg-red-200 transition">
                        رفض
                    </button>
                    <button onClick={() => onAccept(request.id)} className="w-full bg-teal-500 text-white py-3 rounded-lg font-bold text-lg shadow-md hover:bg-teal-600 transition">
                        قبول
                    </button>
                </div>
            );
        case 'accepted':
            return (
                <div className="p-4 bg-white border-t sticky bottom-0 grid grid-cols-2 gap-3">
                    <button onClick={() => onStartNavigation(request.id)} className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold text-lg shadow-md hover:bg-blue-600 transition">
                        بدء التنقل
                    </button>
                    <button onClick={() => onMarkAsCompleted(request.id)} className="w-full bg-green-500 text-white py-3 rounded-lg font-bold text-lg shadow-md hover:bg-green-600 transition">
                        تم إكمال الخدمة
                    </button>
                </div>
            );
        case 'completed':
             return (
                <div className="p-4 bg-white border-t sticky bottom-0">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="font-bold text-lg text-green-700">الطلب مكتمل</p>
                        <p className="text-sm text-gray-600">الأرباح: <span className="font-bold">{request.price.toLocaleString('ar-SA')} ﷼</span></p>
                    </div>
                </div>
            );
        case 'cancelled':
            return (
                <div className="p-4 bg-white border-t sticky bottom-0">
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                        <p className="font-bold text-lg text-red-700">الطلب ملغي</p>
                    </div>
                </div>
            );
        default:
            return null;
    }
}

const NurseRequestDetailScreen: React.FC<NurseRequestDetailScreenProps> = ({ request, onBack, onAccept, onReject, onStartNavigation, onMarkAsCompleted }) => {
    
    // Mocked arrival time and distance for visual representation
    const arrivalTime = (request.id % 15) + 10; // e.g. 10-24 minutes
    const distance = ((request.id % 200) / 10 + 2).toFixed(1); // e.g. 2.0-21.9 km
    const isCompleted = request.status === 'completed';

    return (
        <div className="flex flex-col h-full bg-gray-50">
            <div className="p-4 flex items-center border-b bg-white sticky top-0 z-10">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100"><ArrowRightIcon className="w-6 h-6 text-gray-600" /></button>
                <h1 className="text-xl font-bold text-gray-800 mx-auto">تفاصيل الطلب</h1>
            </div>
            
            <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm border md:col-span-2">
                    <h3 className="font-bold text-lg text-gray-800 mb-4">موقع المريض</h3>
                    <div className="flex justify-around items-center mb-4 text-center">
                        <div>
                            <p className="font-bold text-xl text-teal-600">{distance} كم</p>
                            <p className="text-sm text-gray-500">المسافة المقدرة</p>
                        </div>
                        <div className="border-l h-10"></div>
                        <div>
                            <p className="font-bold text-xl text-teal-600">{arrivalTime} دقيقة</p>
                            <p className="text-sm text-gray-500">الوقت المتوقع للوصول</p>
                        </div>
                    </div>
                    <button 
                        disabled={isCompleted}
                        className={`w-full flex items-center justify-center gap-2 bg-cyan-500 text-white py-2.5 rounded-lg font-semibold transition ${isCompleted ? 'opacity-50 cursor-not-allowed' : 'hover:bg-cyan-600'}`}
                    >
                        <MapIcon className="w-5 h-5" />
                        استعراض موقع المريض على الخريطة
                    </button>
                </div>

                 <div className="bg-white p-4 rounded-lg shadow-sm border md:col-span-2">
                    <h2 className="font-bold text-lg text-gray-800 mb-1">{request.service}</h2>
                    <p className="text-sm text-gray-600">{request.serviceDescription}</p>
                    {request.isUrgent && <div className="mt-2 text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full inline-block">حالة عاجلة</div>}
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <h3 className="font-bold text-lg text-gray-800 mb-2">معلومات المريض</h3>
                    <InfoRow label="الاسم" value={request.patientName} />
                    <InfoRow label="عدد متلقي الخدمة" value={`${request.patientCount} ${request.patientCount > 1 ? 'أشخاص' : 'شخص'}`} />
                    <InfoRow label="العمر" value={`${request.patientInfo?.age || 'N/A'} سنة`} />
                    <InfoRow label="الجنس" value={request.patientInfo?.gender || 'N/A'} />
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <h3 className="font-bold text-lg text-gray-800 mb-2">تفاصيل الموعد</h3>
                    <InfoRow label="الوقت المطلوب" value={request.time} />
                    <InfoRow label="العنوان" value={<span className="flex items-center gap-1 justify-end"><MapPinIcon /> {request.address || request.location}</span>} />
                    {request.notes && <InfoRow label="ملاحظات" value={request.notes} />}
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border md:col-span-2">
                    <h3 className="font-bold text-lg text-gray-800 mb-2">العائد المادي</h3>
                    <div className="flex justify-between items-center text-center p-3 bg-teal-50 rounded-lg">
                        <WalletIcon className="w-8 h-8 text-teal-500" />
                        <div>
                            <p className="text-sm text-gray-500">ستحصل على</p>
                            <p className="font-bold text-2xl text-teal-600">{request.price.toLocaleString('ar-SA')} ﷼</p>
                        </div>
                        <div className="w-8"></div>
                    </div>
                </div>

            </div>
            
            <ActionFooter 
                request={request}
                onAccept={onAccept}
                onReject={onReject}
                onStartNavigation={onStartNavigation}
                onMarkAsCompleted={onMarkAsCompleted}
            />
        </div>
    );
};

export default NurseRequestDetailScreen;
