import React from 'react';

const mockAppointments = [
    { id: 1, service: 'العناية بالجروح', patient: 'محمد علي', nurse: 'فاطمة الزهراني', time: '02:00 PM' },
    { id: 2, service: 'رعاية كبار السن', patient: 'فاطمة عبدالله', nurse: 'أحمد خالد', time: '05:30 PM' },
    { id: 3, service: 'إعطاء حقنة', patient: 'سارة الفيصل', nurse: 'فاطمة الزهراني', time: '07:00 PM' },
];

const mockAlerts = [
    { id: 1, message: "A nurse's license is about to expire.", level: 'warning' },
    { id: 2, message: 'High number of pending requests in Al-Yasmin district.', level: 'info' },
];


const AppointmentsView: React.FC = () => {
    const lang = document.documentElement.lang as 'ar' | 'en';

    const translations = {
        ar: {
            title: "المواعيد والتنبيهات",
            upcoming: "المواعيد القادمة",
            alerts: "التنبيهات الإدارية",
            service: "الخدمة",
            patient: "المريض",
            nurse: "الممرض",
            time: "الوقت"
        },
        en: {
            title: "Appointments & Alerts",
            upcoming: "Upcoming Appointments",
            alerts: "Administrative Alerts",
            service: "Service",
            patient: "Patient",
            nurse: "Nurse",
            time: "Time"
        }
    }
    const T = translations[lang];

    return (
        <div>
            <h1 className="mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">{T.title}</h1>

            <div className="grid gap-8 md:grid-cols-2">
                {/* Upcoming Appointments */}
                <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">{T.upcoming}</h2>
                    <div className="space-y-4">
                        {mockAppointments.map(appt => (
                            <div key={appt.id} className="p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
                                <p className="font-semibold">{appt.service}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{T.patient}: {appt.patient} | {T.nurse}: {appt.nurse}</p>
                                <p className="text-sm font-bold text-blue-600 dark:text-blue-400">{T.time}: {appt.time}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Administrative Alerts */}
                <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">{T.alerts}</h2>
                     <div className="space-y-4">
                        {mockAlerts.map(alert => (
                            <div key={alert.id} className={`p-3 rounded-lg ${alert.level === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200' : 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200'}`}>
                                <p className="font-semibold">{alert.message}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentsView;
