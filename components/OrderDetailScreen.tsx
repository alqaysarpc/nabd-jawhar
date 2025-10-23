
import React, { useState, useEffect } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import LoadingSpinner from './LoadingSpinner';
import { MapPinIcon } from './icons';

type Status = 'pending' | 'accepted' | 'completed';

interface DetailedOrder {
    id: number;
    service: string;
    serviceDescription: string;
    nurse: {
        name: string;
        img: string;
        rating: number;
        specialty: string;
    };
    date: string;
    time: string;
    status: Status;
    patientCount: number;
    cost: {
        service: number;
        visit: number;
        total: number;
    };
}

const mockOrderDetails: DetailedOrder[] = [
    { 
        id: 1, 
        service: 'قياس السكر بالدم', 
        serviceDescription: 'فحص مستوى السكر في الدم باستخدام جهاز قياس دقيق وتقديم إرشادات أولية.',
        nurse: { name: 'نورة محمد', img: 'https://picsum.photos/seed/nurse2/80/80', rating: 4.8, specialty: 'رعاية أمراض مزمنة' },
        date: '2024-07-25',
        time: '10:00 صباحاً',
        status: 'completed',
        patientCount: 1,
        cost: { service: 4000, visit: 1000, total: 5000 }
    },
    { 
        id: 2, 
        service: 'إعطاء حقنة عضل', 
        serviceDescription: 'إعطاء الحقن العضلية الموصوفة من قبل الطبيب المعالج بأمان واحترافية.',
        nurse: { name: 'أحمد خالد', img: 'https://picsum.photos/seed/nurse1/80/80', rating: 4.9, specialty: 'خدمات التمريض العامة' },
        date: '2024-07-28',
        time: '03:30 مساءً',
        status: 'accepted',
        patientCount: 1,
        cost: { service: 3000, visit: 1000, total: 4000 }
    },
    { 
        id: 3, 
        service: 'رعاية ما بعد الجراحة', 
        serviceDescription: 'متابعة الحالة الصحية للمريض بعد العملية، العناية بالجروح، والمساعدة في الحركة.',
        nurse: { name: 'في انتظار القبول', img: 'https://picsum.photos/seed/placeholder/80/80', rating: 0, specialty: '-' },
        date: '2024-08-01',
        time: '11:00 صباحاً',
        status: 'pending',
        patientCount: 1,
        cost: { service: 15000, visit: 2000, total: 17000 }
    },
    { 
        id: 4, 
        service: 'تغيير على جرح',
        serviceDescription: 'تنظيف وتغيير الضمادات على الجروح لمنع العدوى وتسريع الشفاء.',
        nurse: { name: 'سارة عبدالله', img: 'https://picsum.photos/seed/nurse3/80/80', rating: 4.7, specialty: 'العناية بالجروح' },
        date: '2024-07-22',
        time: '01:00 ظهراً',
        status: 'completed',
        patientCount: 2,
        cost: { service: 6000, visit: 1000, total: 13000 } // (6000*2) + 1000
    }
];

const statusStyles: { [key in Status]: { text: string; bg: string; label: string } } = {
    pending: { text: 'text-orange-600', bg: 'bg-orange-100', label: 'قيد الانتظار' },
    accepted: { text: 'text-blue-600', bg: 'bg-blue-100', label: 'مقبول' },
    completed: { text: 'text-green-600', bg: 'bg-green-100', label: 'مكتمل' },
};

interface OrderDetailScreenProps {
    orderId: number;
    onBack: () => void;
    onRateService: (orderId: number) => void;
    onTrackNurse: (orderId: number) => void;
    onRequestCancelOrder: (orderId: number) => void;
}

const InfoRow = ({ label, value, valueClass = 'text-gray-800' }: {label: string, value: React.ReactNode, valueClass?: string}) => (
    <li className="flex justify-between items-center py-2">
        <span className="text-gray-500">{label}</span>
        <span className={`font-semibold ${valueClass}`}>{value}</span>
    </li>
);

const OrderDetailScreen: React.FC<OrderDetailScreenProps> = ({ orderId, onBack, onRateService, onTrackNurse, onRequestCancelOrder }) => {
    const [order, setOrder] = useState<DetailedOrder | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            const foundOrder = mockOrderDetails.find(o => o.id === orderId);
            setOrder(foundOrder || null);
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [orderId]);

    const renderFooterActions = () => {
        if (!order) return null;

        switch (order.status) {
            case 'completed':
                return (
                    <div className="p-4 bg-white border-t">
                        <button onClick={() => onRateService(order.id)} className="w-full flex items-center justify-center gap-2 bg-yellow-500 text-white py-3 rounded-lg font-bold shadow-md hover:bg-yellow-600 transition">
                            <StarIcon className="w-6 h-6" />
                            تقييم الخدمة
                        </button>
                    </div>
                );
            case 'accepted':
                return (
                    <div className="p-4 bg-white border-t space-y-3">
                        <button onClick={() => onTrackNurse(order.id)} className="w-full flex items-center justify-center gap-2 bg-cyan-500 text-white py-3 rounded-lg font-bold text-lg shadow-md hover:bg-cyan-600 transition">
                            <MapPinIcon />
                            تتبع موقع الممرض
                        </button>
                        <button onClick={() => onRequestCancelOrder(order.id)} className="w-full bg-transparent text-red-500 py-2 rounded-lg font-semibold hover:bg-red-50 transition">
                            إلغاء الطلب
                        </button>
                    </div>
                );
            case 'pending':
                return (
                    <div className="p-4 bg-white border-t">
                        <button onClick={() => onRequestCancelOrder(order.id)} className="w-full bg-red-500 text-white py-3 rounded-lg font-bold shadow-md hover:bg-red-600 transition">
                            إلغاء الطلب
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col h-full bg-white">
                 <div className="p-4 flex items-center border-b">
                     <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100"><ArrowRightIcon className="w-6 h-6 text-gray-600" /></button>
                     <h1 className="text-xl font-bold text-gray-800 mx-auto">تفاصيل الطلب</h1>
                </div>
                <LoadingSpinner />
            </div>
        );
    }
    
    if (!order) {
        return <div className="p-8 text-center text-red-500">لم يتم العثور على الطلب.</div>;
    }

    const currentStatusStyle = statusStyles[order.status];

    return (
        <div className="flex flex-col h-full bg-gray-50">
            <div className="p-4 flex items-center border-b bg-white">
                 <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100">
                    <ArrowRightIcon className="w-6 h-6 text-gray-600" />
                </button>
                <h1 className="text-xl font-bold text-gray-800 mx-auto">تفاصيل الطلب</h1>
            </div>

            <div className="flex-grow overflow-y-auto p-4 md:p-6 lg:p-8 space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm border md:col-span-2">
                    <h2 className="font-bold text-lg text-gray-800 mb-1">{order.service}</h2>
                    <p className="text-sm text-gray-600">{order.serviceDescription}</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border md:col-span-1">
                     <h2 className="font-bold text-lg text-gray-800 mb-3">الممرض/ة المسؤول</h2>
                    {order.status === 'pending' ? (
                        <p className="text-gray-500 text-center py-4">بانتظار قبول الطلب من قبل أحد الممرضين.</p>
                    ) : (
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <img src={order.nurse.img} alt={order.nurse.name} className="w-14 h-14 rounded-full object-cover"/>
                                <div>
                                    <h3 className="font-bold text-gray-800">{order.nurse.name}</h3>
                                    <p className="text-sm text-gray-500">{order.nurse.specialty}</p>
                                    <div className="flex items-center gap-1 text-sm">
                                        <StarIcon className="w-4 h-4 text-yellow-400"/>
                                        <span className="font-semibold">{order.nurse.rating}</span>
                                    </div>
                                </div>
                            </div>
                            <button className="text-cyan-600 font-semibold text-sm hover:underline">عرض الملف الشخصي</button>
                        </div>
                    )}
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border md:col-span-1">
                    <h2 className="font-bold text-lg text-gray-800 mb-1">معلومات الطلب</h2>
                    <ul className="divide-y">
                        <InfoRow label="رقم الطلب" value={`#${order.id}`} />
                        <InfoRow label="التاريخ والوقت" value={`${order.date} - ${order.time}`} />
                         <InfoRow label="عدد المرضى" value={`${order.patientCount} ${order.patientCount > 1 ? 'أشخاص' : 'شخص'}`} />
                        <InfoRow label="الحالة" value={
                            <span className={`px-3 py-1 text-xs font-bold rounded-full ${currentStatusStyle.bg} ${currentStatusStyle.text}`}>
                                {currentStatusStyle.label}
                            </span>
                        } />
                    </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border md:col-span-2 md:mt-6">
                    <h2 className="font-bold text-lg text-gray-800 mb-1">ملخص الدفع</h2>
                    <ul className="text-sm">
                         <InfoRow label="تكلفة الخدمة" value={`${order.cost.service.toLocaleString('ar-SA')} ﷼`} />
                         <InfoRow label="رسوم الزيارة" value={`${order.cost.visit.toLocaleString('ar-SA')} ﷼`} />
                         <li className="flex justify-between items-center py-2 mt-2 border-t border-dashed">
                             <span className="font-bold text-gray-800">الإجمالي</span>
                             <span className="font-bold text-cyan-600 text-lg">{order.cost.total.toLocaleString('ar-SA')} ﷼</span>
                         </li>
                    </ul>
                </div>
            </div>
            
            {renderFooterActions()}
        </div>
    );
};

export default OrderDetailScreen;
