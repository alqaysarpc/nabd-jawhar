import React, { useState } from 'react';
import { SunIcon, MoonIcon, GlobeAltIcon, TrashIcon } from '../icons';

interface SettingsViewProps {
    language: 'ar' | 'en';
    setLanguage: (lang: 'ar' | 'en') => void;
    isDarkMode: boolean;
    setDarkMode: (isDark: boolean) => void;
}

type Permission = 'read' | 'write' | 'delete';
interface Role {
    name: string;
    permissions: Permission[];
}

const availablePermissions: Permission[] = ['read', 'write', 'delete'];

const SettingsView: React.FC<SettingsViewProps> = ({ language, setLanguage, isDarkMode, setDarkMode }) => {
    
    const [roles, setRoles] = useState<Role[]>([
        { name: 'Admin', permissions: ['read', 'write', 'delete'] },
        { name: 'Nurse Manager', permissions: ['read', 'write'] },
        { name: 'Support Agent', permissions: ['read'] },
    ]);
    const [newRoleName, setNewRoleName] = useState('');
    
    const lang = document.documentElement.lang as 'ar' | 'en';

    const translations = {
        ar: {
            title: "إعدادات النظام",
            language: "لغة الواجهة",
            arabic: "العربية",
            english: "الإنجليزية",
            appearance: "مظهر الواجهة",
            light: "فاتح",
            dark: "داكن",
            permissions: "إدارة الصلاحيات",
            permissionsDesc: "إدارة صلاحيات الأدوار المختلفة في النظام.",
            addRole: "إضافة دور",
            newRoleName: "اسم الدور الجديد",
            permissionsForRole: "صلاحيات دور",
            read: "قراءة",
            write: "كتابة",
            delete: "حذف",
            deleteRole: "حذف الدور",
        },
        en: {
            title: "System Settings",
            language: "Interface Language",
            arabic: "Arabic",
            english: "English",
            appearance: "Appearance",
            light: "Light",
            dark: "Dark",
            permissions: "Permissions Management",
            permissionsDesc: "Manage roles and permissions within the system.",
            addRole: "Add Role",
            newRoleName: "New role name",
            permissionsForRole: "Permissions for",
            read: "Read",
            write: "Write",
            delete: "Delete",
            deleteRole: "Delete Role",
        }
    }
    const T = translations[lang];

    const handleAddNewRole = () => {
        if (newRoleName.trim() && !roles.some(r => r.name.toLowerCase() === newRoleName.trim().toLowerCase())) {
            setRoles([...roles, { name: newRoleName.trim(), permissions: [] }]);
            setNewRoleName('');
        }
    };

    const handleDeleteRole = (roleNameToDelete: string) => {
        if (roleNameToDelete === 'Admin') {
            alert('Cannot delete the default Admin role.');
            return;
        }
        setRoles(roles.filter(role => role.name !== roleNameToDelete));
    };
    
    const handleTogglePermission = (roleName: string, permission: Permission) => {
        setRoles(roles.map(role => {
            if (role.name === roleName) {
                const newPermissions = role.permissions.includes(permission)
                    ? role.permissions.filter(p => p !== permission)
                    : [...role.permissions, permission];
                return { ...role, permissions: newPermissions };
            }
            return role;
        }));
    };


    return (
        <div>
            <h1 className="mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">{T.title}</h1>
            
            <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 space-y-8">
                {/* Language Settings */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">{T.language}</h2>
                    <div className="flex mt-4 space-x-4 rtl:space-x-reverse">
                        <button onClick={() => setLanguage('ar')} className={`px-6 py-2 rounded-md font-semibold ${language === 'ar' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>{T.arabic}</button>
                        <button onClick={() => setLanguage('en')} className={`px-6 py-2 rounded-md font-semibold ${language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>{T.english}</button>
                    </div>
                </div>

                {/* Theme Settings */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">{T.appearance}</h2>
                    <div className="flex mt-4 space-x-4 rtl:space-x-reverse">
                        <button onClick={() => setDarkMode(false)} className={`flex items-center gap-2 px-6 py-2 rounded-md font-semibold ${!isDarkMode ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                            <SunIcon className="w-5 h-5"/>
                            {T.light}
                        </button>
                        <button onClick={() => setDarkMode(true)} className={`flex items-center gap-2 px-6 py-2 rounded-md font-semibold ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                            <MoonIcon className="w-5 h-5"/>
                            {T.dark}
                        </button>
                    </div>
                </div>

                {/* Permissions Management */}
                <div className="pt-6 border-t dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">{T.permissions}</h2>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">{T.permissionsDesc}</p>
                    
                    <div className="mt-4 flex gap-2">
                        <input 
                            type="text" 
                            value={newRoleName}
                            onChange={(e) => setNewRoleName(e.target.value)}
                            placeholder={T.newRoleName}
                            className="flex-grow px-4 py-2 text-sm border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button onClick={handleAddNewRole} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">{T.addRole}</button>
                    </div>

                    <div className="mt-6 space-y-4">
                        {roles.map(role => (
                            <div key={role.name} className="p-4 border rounded-lg dark:border-gray-600">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">{role.name}</h3>
                                    {role.name !== 'Admin' && (
                                        <button onClick={() => handleDeleteRole(role.name)} className="text-red-500 hover:text-red-700" aria-label={`${T.deleteRole} ${role.name}`}>
                                            <TrashIcon className="w-5 h-5"/>
                                        </button>
                                    )}
                                </div>
                                <div className="mt-3 space-y-2">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{T.permissionsForRole} "{role.name}":</p>
                                    <div className="flex flex-wrap gap-4">
                                        {availablePermissions.map(permission => (
                                            <label key={permission} className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer">
                                                <input 
                                                    type="checkbox"
                                                    checked={role.permissions.includes(permission)}
                                                    onChange={() => handleTogglePermission(role.name, permission)}
                                                    disabled={role.name === 'Admin'}
                                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                                                />
                                                <span className="text-gray-700 dark:text-gray-300 capitalize">{T[permission]}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsView;