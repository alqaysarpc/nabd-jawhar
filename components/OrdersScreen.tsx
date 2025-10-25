
import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { CheckCircleIcon } from './icons';

type Status = 'pending' | 'accepted' | 'completed';

interface Order {
    id: number;
    service: string;
    nurse: string;
    date: string;
    status: Status;
}

interface OrdersScreenProps {
    onViewDetails: (orderId: number) => void;
}

const mockOrders: Order[] = [
    { id: 1, service: 'قياس السكر بالدم', nurse: 'ماريا باجبير ', date: '2024-07-25', status: 'completed' },
    { id: 2, service: 'إعطاء حقنة عضل', nurse: 'وليد بن قبوس ', date: '2024-07-28', status: 'accepted' },
    { id: 3, service: 'رعاية ما بعد الجراحة', nurse: 'في انتظار القبول', date: '2024-08-01', status: 'pending' },
    { id: 4, service: 'تغيير على جرح', nurse: 'شروق صالح ', date: '2024-07-22', status: 'completed' },
];

const statusStyles: { [key in Status]: { text: string; bg: string; label: string } } = {
    pending: { text: 'text-orange-600', bg: 'bg-orange-100', label: 'قيد الانتظار' },
    accepted: { text: 'text-blue-600', bg: 'bg-blue-100', label: 'مقبول' },
    completed: { text: 'text-green-600', bg: 'bg-green-100', label: 'مكتمل' },
};

const FilterButton = ({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-full text-sm font-semibold transition ${active ? 'bg-cyan-500 text-white' : 'bg-gray-200 text-gray-700'}`}
    >
        {label}
    </button>
);

const OrdersScreen: React.FC<OrdersScreenProps> = ({ onViewDetails }) => {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState<Order[]>([]);
    const [filter, setFilter] = useState<Status | 'all'>('all');

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setOrders(mockOrders);
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    const filteredOrders = filter === 'all' ? orders : orders.filter(o => o.status === filter);

    return (
        <div className="p-4 md:p-6 space-y-4">
            <div className="flex justify-around p-1 bg-gray-100 rounded-full">
                <FilterButton label="الكل" active={filter === 'all'} onClick={() => setFilter('all')} />
                <FilterButton label="قيد الانتظار" active={filter === 'pending'} onClick={() => setFilter('pending')} />
                <FilterButton label="مقبول" active={filter === 'accepted'} onClick={() => setFilter('accepted')} />
                <FilterButton label="مكتمل" active={filter === 'completed'} onClick={() => setFilter('completed')} />
            </div>

            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                    {filteredOrders.length > 0 ? filteredOrders.map(order => {
                        const isCompleted = order.status === 'completed';
                        return (
                            <button 
                                key={order.id} 
                                onClick={() => onViewDetails(order.id)} 
                                className={`w-full text-right bg-white p-4 rounded-lg shadow-sm border hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-cyan-500 ${isCompleted ? 'opacity-70 hover:opacity-100' : ''}`}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-gray-800">{order.service}</h3>
                                        <p className="text-sm text-gray-500">الممرض/ة: {order.nurse}</p>
                                        <p className="text-sm text-gray-500">التاريخ: {order.date}</p>
                                    </div>
                                    {isCompleted ? (
                                        <div className={`flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full ${statusStyles.completed.bg} ${statusStyles.completed.text}`}>
                                            <CheckCircleIcon className="w-4 h-4 animate-check-in" />
                                            <span className="animate-check-in" style={{ animationDelay: '100ms' }}>{statusStyles.completed.label}</span>
                                        </div>
                                    ) : (
                                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${statusStyles[order.status].bg} ${statusStyles[order.status].text}`}>
                                            {statusStyles[order.status].label}
                                        </span>
                                    )}
                                </div>
                            </button>
                        );
                    }) : (
                         <p className="text-center text-gray-500 pt-8 col-span-1 md:col-span-2 lg:col-span-3">لا توجد طلبات تطابق هذا الفلتر.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default OrdersScreen;
