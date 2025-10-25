import React, { useState } from 'react';

type NotificationType = 'order_update' | 'payment' | 'reminder' | 'offer';

interface Notification {
    id: number;
    type: NotificationType;
    title: string;
    description: string;
    isRead: boolean;
}

const mockNotifications: Notification[] = [
    {
        id: 1,
        type: 'order_update',
        title: 'تم قبول طلبك!',
        description: 'الممرض سلطان باهبري  في طريقه إليك. رقم الطلب #2.',
        isRead: false,
    },
    {
        id: 2,
        type: 'payment',
        title: 'الدفع ناجح',
        description: 'تم استلام 80 ر.ي بنجاح لخدمة قياس السكر.',
        isRead: false,
    },
    {
        id: 3,
        type: 'order_update',
        title: 'اكتمل طلبك',
        description: 'تم إكمال خدمة قياس السكر بنجاح. نتمنى لك دوام الصحة.',
        isRead: true,
    },
    {
        id: 4,
        type: 'reminder',
        title: 'تذكير بالموعد',
        description: 'لديك موعد غداً الساعة 3:30 مساءً لإعطاء حقنة.',
        isRead: false,
    },
    {
        id: 5,
        type: 'offer',
        title: 'عرض خاص لك!',
        description: 'احصل على خصم 15% على خدمة الرعاية الشاملة القادمة.',
        isRead: true,
    },
     {
        id: 6,
        type: 'order_update',
        title: 'اكتمل طلبك',
        description: 'تم إكمال خدمة رعاية الجروح  بنجاح. نتمنى لك دوام الصحة.',
        isRead: false,
    },
];

const notificationTypeStyles: { [key in NotificationType]: { text: string; bg: string; label: string } } = {
    order_update: { text: 'text-blue-600', bg: 'bg-blue-100', label: 'تحديث طلب' },
    payment: { text: 'text-green-600', bg: 'bg-green-100', label: 'دفع' },
    reminder: { text: 'text-orange-600', bg: 'bg-orange-100', label: 'تذكير' },
    offer: { text: 'text-purple-600', bg: 'bg-purple-100', label: 'عرض' },
};

const FilterButton = ({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-full text-sm font-semibold transition flex-grow basis-0 ${active ? 'bg-cyan-500 text-white' : 'bg-gray-200 text-gray-700'}`}
    >
        {label}
    </button>
);

const NotificationsScreen: React.FC = () => {
    const [notifications, setNotifications] = useState(mockNotifications);
    const [filter, setFilter] = useState<NotificationType | 'all'>('all');
    
    const filteredNotifications = filter === 'all' 
        ? notifications 
        : notifications.filter(n => n.type === filter);

    return (
        <div className="p-4 md:p-6 space-y-4">
            <div className="flex justify-around p-1 bg-gray-100 rounded-full gap-1 flex-wrap">
                <FilterButton label="الكل" active={filter === 'all'} onClick={() => setFilter('all')} />
                <FilterButton label="تحديثات" active={filter === 'order_update'} onClick={() => setFilter('order_update')} />
                <FilterButton label="دفع" active={filter === 'payment'} onClick={() => setFilter('payment')} />
                <FilterButton label="تذكيرات" active={filter === 'reminder'} onClick={() => setFilter('reminder')} />
                <FilterButton label="عروض" active={filter === 'offer'} onClick={() => setFilter('offer')} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredNotifications.length > 0 ? (
                    filteredNotifications.map(notification => {
                        const typeStyle = notificationTypeStyles[notification.type];
                        return (
                            <div 
                                key={notification.id}
                                className={`w-full text-right p-4 rounded-lg shadow-sm border transition ${!notification.isRead ? 'bg-cyan-50 border-cyan-300' : 'bg-white'}`}
                            >
                                <div className="flex justify-between items-start gap-4">
                                    <div className="flex-grow">
                                        <h3 className="font-bold text-gray-800">{notification.title}</h3>
                                        <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                                    </div>
                                    <span className={`flex-shrink-0 px-3 py-1 text-xs font-bold rounded-full whitespace-nowrap ${typeStyle.bg} ${typeStyle.text}`}>
                                        {typeStyle.label}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-center text-gray-500 pt-8 col-span-1 md:col-span-2 lg:col-span-3">
                        {notifications.length === 0 ? 'لا توجد إشعارات جديدة.' : 'لا توجد إشعارات تطابق هذا الفلتر.'}
                    </p>
                )}
            </div>
        </div>
    );
};

export default NotificationsScreen;