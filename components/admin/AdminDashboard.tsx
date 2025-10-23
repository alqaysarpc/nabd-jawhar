import React from 'react';
import { AdminChartBarIcon, AdminUsersGroupIcon, AdminCalendarIcon, ArrowUpIcon, ArrowDownIcon } from '../icons';
import BarChart from './BarChart';
import { AdminWelcomeIllustration } from '../illustrations';

const StatCard = ({ title, value, icon, trend, trendType }: { title: string, value: string, icon: React.ReactNode, trend: string, trendType: 'up' | 'down' }) => (
    <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full dark:bg-blue-900/40 text-blue-500 dark:text-blue-300">{icon}</div>
            <div className="mx-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
                <h4 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">{value}</h4>
            </div>
        </div>
         <div className={`flex items-center mt-2 text-sm ${trendType === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            {trendType === 'up' ? <ArrowUpIcon className="w-4 h-4"/> : <ArrowDownIcon className="w-4 h-4"/>}
            <span className="mx-1">{trend}</span>
         </div>
    </div>
);

const appointmentsData = [
    { label: 'Sat', value: 18 }, { label: 'Sun', value: 25 }, { label: 'Mon', value: 22 },
    { label: 'Tue', value: 30 }, { label: 'Wed', value: 28 }, { label: 'Thu', value: 35 },
    { label: 'Fri', value: 15 },
];


const AdminDashboard: React.FC = () => {
    const lang = document.documentElement.lang as 'ar' | 'en';
    
    const translations = {
        ar: {
            dashboard: 'لوحة التحكم',
            welcomeTitle: 'أهلاً بك مجدداً، أيها المدير!',
            welcomeDesc: 'هنا نظرة سريعة على أداء التطبيق اليوم.',
            totalPatients: 'إجمالي المرضى',
            totalNurses: 'إجمالي الممرضين',
            activeCases: 'الحالات النشطة',
            completedAppointments: 'المواعيد المكتملة (آخر 7 أيام)',
        },
        en: {
            dashboard: 'Dashboard',
            welcomeTitle: 'Welcome Back, Admin!',
            welcomeDesc: 'Here is a quick overview of the app\'s performance today.',
            totalPatients: 'Total Patients',
            totalNurses: 'Total Nurses',
            activeCases: 'Active Cases',
            completedAppointments: 'Completed Appointments (Last 7 Days)',
        }
    };
    
    const T = translations[lang];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="text-center md:text-right">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{T.welcomeTitle}</h1>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">{T.welcomeDesc}</p>
                </div>
                <div className="w-48 h-auto flex-shrink-0">
                    <AdminWelcomeIllustration />
                </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <StatCard title={T.totalPatients} value="320" icon={<AdminUsersGroupIcon className="w-6 h-6" />} trend="+15 هذا الشهر" trendType="up" />
                <StatCard title={T.totalNurses} value="52" icon={<AdminUsersGroupIcon className="w-6 h-6" />} trend="+2 هذا الشهر" trendType="up" />
                <StatCard title={T.activeCases} value="18" icon={<AdminCalendarIcon className="w-6 h-6" />} trend="-3 عن الأمس" trendType="down" />
            </div>
            
            <BarChart data={appointmentsData} title={T.completedAppointments} />
        </div>
    );
};

export default AdminDashboard;