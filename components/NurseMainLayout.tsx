import React from 'react';
import { NurseTab, AvailabilityStatus } from '../types';
import { DashboardIcon, NurseDocumentTextIcon, CalendarDaysIconNav, NurseUserCircleIcon } from './icons';

interface NurseMainLayoutProps {
    children: React.ReactNode;
    activeTab: NurseTab;
    onTabChange: (tab: NurseTab) => void;
    currentStatus: AvailabilityStatus;
    onStatusChangeClick: () => void;
}

const navItems = [
    { id: 'dashboard', label: 'الرئيسية', icon: DashboardIcon },
    { id: 'requests', label: 'الطلبات', icon: NurseDocumentTextIcon },
    { id: 'schedule', label: 'الجدول', icon: CalendarDaysIconNav },
    { id: 'profile', label: 'البروفايل', icon: NurseUserCircleIcon },
] as const;


const AvailabilityBadge: React.FC<{ status: AvailabilityStatus; onClick: () => void }> = ({ status, onClick }) => {
    const statusConfig = {
        available: { text: "متاح", color: "bg-green-500" },
        on_break: { text: "استراحة", color: "bg-orange-500" },
        offline: { text: "غير متصل", color: "bg-red-500" },
        busy: { text: "مشغول", color: "bg-gray-500" },
    };
    const config = statusConfig[status] || statusConfig.offline;

    return (
        <button onClick={onClick} className="flex items-center gap-2 text-sm bg-gray-100 px-3 py-1.5 rounded-full hover:bg-gray-200 transition">
            <div className={`w-2.5 h-2.5 rounded-full ${config.color} ring-2 ring-offset-1 ring-offset-gray-100 ring-white`}></div>
            <span className="font-semibold text-gray-700">{config.text}</span>
        </button>
    );
};


const NurseMainLayout: React.FC<NurseMainLayoutProps> = ({ children, activeTab, onTabChange, currentStatus, onStatusChangeClick }) => {
    return (
        <div className="flex flex-col h-full bg-gray-50">
            {/* Header */}
            <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-lg text-teal-600">وضع الممرض</span>
                </div>
                <AvailabilityBadge status={currentStatus} onClick={onStatusChangeClick} />
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
                    return (
                        <button key={item.id} onClick={() => onTabChange(item.id)} className="flex flex-col items-center justify-center w-16 text-xs transition-colors">
                            <Icon active={isActive} />
                            <span className={isActive ? 'text-teal-500' : 'text-gray-500'}>{item.label}</span>
                        </button>
                    )
                })}
            </footer>
        </div>
    );
};

export default NurseMainLayout;