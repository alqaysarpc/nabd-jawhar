import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import AdminDashboard from './AdminDashboard';
import UserManagement from './UserManagement';
import AppointmentsView from './AppointmentsView';
import ActivityLogView from './ActivityLogView';
import SettingsView from './SettingsView';
import { AdminPage } from '../../types';

interface AdminLayoutProps {
    onLogout: () => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ onLogout }) => {
    const [currentPage, setCurrentPage] = useState<AdminPage>('dashboard');
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [language, setLanguage] = useState<'ar' | 'en'>('ar');
    const [isDarkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const doc = document.documentElement;
        doc.lang = language;
        doc.dir = language === 'ar' ? 'rtl' : 'ltr';
        if (isDarkMode) {
            doc.classList.add('dark');
        } else {
            doc.classList.remove('dark');
        }
    }, [language, isDarkMode]);
    
    const fontClass = language === 'ar' ? 'font-cairo' : 'font-inter';

    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard': return <AdminDashboard />;
            case 'users': return <UserManagement />;
            case 'appointments': return <AppointmentsView />;
            case 'logs': return <ActivityLogView />;
            case 'settings': return <SettingsView language={language} isDarkMode={isDarkMode} setLanguage={setLanguage} setDarkMode={setDarkMode} />;
            default: return <AdminDashboard />;
        }
    };

    return (
        <div className={`flex h-screen bg-gray-100 dark:bg-gray-900 ${fontClass}`}>
            <AdminSidebar 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage}
                isOpen={isSidebarOpen}
                setIsOpen={setSidebarOpen}
                onLogout={onLogout}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <AdminHeader 
                    toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
                />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4 md:p-6 lg:p-8">
                    {renderPage()}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
