import React from 'react';
import { MainTab } from '../types';
import { HomeIcon, DocumentTextIcon, UserCircleIcon, LogoIcon, ServicesIcon, HeaderBellIcon, StethoscopeIcon } from './icons';

interface MainLayoutProps {
    children: React.ReactNode;
    activeTab: MainTab;
    onTabChange: (tab: MainTab) => void;
    onNotificationsClick: () => void;
    isGuest: boolean;
}

const navItems = [
    { id: 'home', label: 'الرئيسية', icon: HomeIcon },
    { id: 'allServices', label: 'الخدمات', icon: ServicesIcon },
    { id: 'orders', label: 'الطلبات', icon: DocumentTextIcon },
    { id: 'nurses', label: 'الممرضين', icon: StethoscopeIcon },
    { id: 'profile', label: 'البروفايل', icon: UserCircleIcon },
] as const;


const MainLayout: React.FC<MainLayoutProps> = ({ children, activeTab, onTabChange, onNotificationsClick, isGuest }) => {
    return (
        <div className="flex flex-col h-full bg-gray-50">
            {/* Header */}
            <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
                <div className="flex items-center gap-2">
                    <LogoIcon className="w-8 h-8" />
                    <span className="font-bold text-base md:text-lg text-cyan-600 whitespace-nowrap">نبض جوار</span>
                </div>
                <button onClick={onNotificationsClick} className="p-2 rounded-full hover:bg-gray-100 relative">
                    <HeaderBellIcon />
                    {!isGuest && <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>}
                </button>
            </header>

            {/* Main Content */}
            <main className="flex-grow overflow-y-auto">
                {children}
            </main>

            {/* Bottom Navigation */}
            <footer className="flex justify-around p-2 bg-white border-t border-gray-200 shadow-inner">
                {navItems.map(item => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    const isDisabledForGuest = isGuest && (item.id === 'orders' || item.id === 'profile');
                    return (
                        <button key={item.id} onClick={() => onTabChange(item.id)} className={`flex flex-col items-center justify-center w-16 text-xs transition-colors ${isDisabledForGuest ? 'opacity-50' : ''}`}>
                            <Icon active={isActive} />
                            <span className={isActive ? 'text-cyan-500' : 'text-gray-500'}>{item.label}</span>
                        </button>
                    )
                })}
            </footer>
        </div>
    );
};

export default MainLayout;