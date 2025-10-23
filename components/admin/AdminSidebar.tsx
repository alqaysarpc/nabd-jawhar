import React from 'react';
import { LogoIcon, AdminChartBarIcon, AdminUsersGroupIcon, AdminCalendarIcon, AdminClockIcon, AdminCog6ToothIcon, ArrowLeftOnRectangleIcon } from '../icons';
import { AdminPage } from '../../types';

interface AdminSidebarProps {
    currentPage: AdminPage;
    setCurrentPage: (page: AdminPage) => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onLogout: () => void;
}

const navItems = [
    { id: 'dashboard', label: { ar: 'لوحة التحكم', en: 'Dashboard' }, icon: AdminChartBarIcon },
    { id: 'users', label: { ar: 'إدارة المستخدمين', en: 'User Management' }, icon: AdminUsersGroupIcon },
    { id: 'appointments', label: { ar: 'المواعيد والتنبيهات', en: 'Appointments' }, icon: AdminCalendarIcon },
    { id: 'logs', label: { ar: 'سجل النشاطات', en: 'Activity Logs' }, icon: AdminClockIcon },
    { id: 'settings', label: { ar: 'الإعدادات', en: 'Settings' }, icon: AdminCog6ToothIcon },
];

const NavLink: React.FC<{
    item: typeof navItems[0],
    isActive: boolean,
    onClick: () => void
}> = ({ item, isActive, onClick }) => {
    const Icon = item.icon;
    const lang = document.documentElement.lang as 'ar' | 'en';
    
    return (
        <button
            onClick={onClick}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
        >
            <Icon className="w-6 h-6" />
            <span className="mx-4">{item.label[lang]}</span>
        </button>
    );
};


const AdminSidebar: React.FC<AdminSidebarProps> = ({ currentPage, setCurrentPage, isOpen, setIsOpen, onLogout }) => {
    const lang = document.documentElement.lang as 'ar' | 'en';

    const handleLinkClick = (page: AdminPage) => {
        setCurrentPage(page);
        if (window.innerWidth < 1024) { // Close sidebar on mobile after click
            setIsOpen(false);
        }
    };

    return (
        <>
            {/* Overlay for mobile */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsOpen(false)}
            />

            <aside className={`fixed lg:relative inset-y-0 z-30 flex flex-col w-64 px-4 py-8 bg-white dark:bg-gray-800 border-e dark:border-gray-700 rtl:border-e-0 rtl:border-s transform transition-transform duration-300 ease-in-out ${
                isOpen ? 'translate-x-0' : '-translate-x-full rtl:translate-x-full'
            } lg:translate-x-0`}>
                <div className="flex items-center justify-center gap-2">
                    <LogoIcon className="w-10 h-10" />
                    <span className="text-2xl font-bold text-gray-800 dark:text-white">
                        {lang === 'ar' ? 'نبض جوار' : 'Nabd Jwar'}
                    </span>
                </div>

                <div className="flex flex-col justify-between flex-1 mt-6">
                    <nav>
                        {navItems.map(item => (
                            <NavLink
                                key={item.id}
                                item={item}
                                isActive={currentPage === item.id}
                                onClick={() => handleLinkClick(item.id as AdminPage)}
                            />
                        ))}
                    </nav>
                     <button onClick={onLogout} className="flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                         <ArrowLeftOnRectangleIcon className="w-6 h-6" />
                         <span className="mx-4">{lang === 'ar' ? 'تسجيل الخروج' : 'Logout'}</span>
                     </button>
                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;
