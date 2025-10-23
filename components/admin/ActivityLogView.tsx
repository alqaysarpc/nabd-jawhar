import React from 'react';

const mockLogs = [
    { id: 1, user: 'Admin', action: 'Deleted user "Khalid Abdulaziz"', timestamp: '2024-08-05 10:30 AM' },
    { id: 2, user: 'Fatima Al-Zahrani', action: 'Updated profile information', timestamp: '2024-08-05 09:15 AM' },
    { id: 3, user: 'System', action: 'Completed appointment #100', timestamp: '2024-08-04 09:45 PM' },
    { id: 4, user: 'Admin', action: 'Changed user "Noura Ibrahim" to inactive', timestamp: '2024-08-04 03:20 PM' },
];

const ActivityLogView: React.FC = () => {
    const lang = document.documentElement.lang as 'ar' | 'en';

    const translations = {
        ar: {
            title: "سجل النشاطات",
            user: "المستخدم",
            action: "الإجراء",
            timestamp: "الوقت والتاريخ",
            actions: {
                'Deleted user "Khalid Abdulaziz"': 'حذف المستخدم "خالد عبدالعزيز"',
                'Updated profile information': 'تحديث معلومات الملف الشخصي',
                'Completed appointment #100': 'إكمال الموعد رقم #100',
                'Changed user "Noura Ibrahim" to inactive': 'تغيير حالة المستخدم "نورة إبراهيم" إلى غير نشط',
            }
        },
        en: {
            title: "Activity Logs",
            user: "User",
            action: "Action",
            timestamp: "Timestamp",
            actions: {}
        }
    }
    const T = translations[lang];

    const translateAction = (action: string) => {
        if (lang === 'ar' && T.actions[action as keyof typeof T.actions]) {
            return T.actions[action as keyof typeof T.actions];
        }
        return action;
    }

    return (
        <div>
            <h1 className="mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">{T.title}</h1>
            <div className="w-full overflow-hidden rounded-lg shadow-xs">
                <div className="w-full overflow-x-auto">
                    <table className="w-full whitespace-no-wrap">
                        <thead>
                            <tr className="text-xs font-semibold tracking-wide text-start text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                <th className="px-4 py-3">{T.user}</th>
                                <th className="px-4 py-3">{T.action}</th>
                                <th className="px-4 py-3">{T.timestamp}</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                            {mockLogs.map(log => (
                                <tr key={log.id} className="text-gray-700 dark:text-gray-400">
                                    <td className="px-4 py-3 text-sm">{log.user}</td>
                                    <td className="px-4 py-3 text-sm">{translateAction(log.action)}</td>
                                    <td className="px-4 py-3 text-sm">{log.timestamp}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ActivityLogView;
