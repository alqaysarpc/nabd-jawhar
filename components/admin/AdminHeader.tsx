import React from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

interface AdminHeaderProps {
    toggleSidebar: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ toggleSidebar }) => {
    const lang = document.documentElement.lang as 'ar' | 'en';

    return (
        <header className="relative z-10 flex items-center justify-between flex-shrink-0 px-6 py-4 bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <button onClick={toggleSidebar} className="p-2 text-gray-600 rounded-md lg:hidden dark:text-gray-300">
                <Bars3Icon className="w-6 h-6" />
            </button>
            
            <div className="flex items-center">
                <div className="relative">
                    <button className="flex items-center gap-2">
                        <img
                            className="object-cover w-10 h-10 rounded-full"
                            src="https://picsum.photos/seed/admin/100/100"
                            alt="Admin Avatar"
                        />
                        <span className="hidden md:inline font-semibold text-gray-700 dark:text-gray-200">
                            {lang === 'ar' ? 'المدير العام' : 'Admin'}
                        </span>
                        <ChevronDownIcon className="hidden w-5 h-5 md:inline text-gray-500" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
