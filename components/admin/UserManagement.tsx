import React, { useState } from 'react';
import { TrashIcon, PencilSquareIcon, SearchIcon } from '../icons';

const mockUsers = [
    { id: 1, name: 'عبدالله محمد', email: 'abdullah.m@example.com', role: 'user', status: 'active' },
    { id: 2, name: 'فاطمة الزهراني', email: 'fatima.z@example.com', role: 'nurse', status: 'active' },
    { id: 3, name: 'خالد عبدالعزيز', email: 'khalid.a@example.com', role: 'user', status: 'inactive' },
    { id: 4, name: 'نورة إبراهيم', email: 'noura.i@example.com', role: 'user', status: 'active' },
    { id: 5, name: 'أحمد خالد', email: 'ahmed.k@example.com', role: 'nurse', status: 'active' },
];


const UserManagement: React.FC = () => {
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const lang = document.documentElement.lang as 'ar' | 'en';

    const filteredUsers = mockUsers.filter(user => {
        const roleMatch = filter === 'all' || user.role === filter;
        const searchMatch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        return roleMatch && searchMatch;
    });

    const translations = {
        ar: {
            title: 'إدارة المستخدمين',
            all: 'الكل',
            user: 'مستخدم',
            nurse: 'ممرض',
            addUser: 'إضافة مستخدم جديد',
            name: 'الاسم',
            email: 'البريد الإلكتروني',
            role: 'الدور',
            status: 'الحالة',
            actions: 'إجراءات',
            active: 'نشط',
            inactive: 'غير نشط',
            searchPlaceholder: 'ابحث بالاسم أو البريد الإلكتروني...',
        },
        en: {
            title: 'User Management',
            all: 'All',
            user: 'User',
            nurse: 'Nurse',
            addUser: 'Add New User',
            name: 'Name',
            email: 'Email',
            role: 'Role',
            status: 'Status',
            actions: 'Actions',
            active: 'Active',
            inactive: 'Inactive',
            searchPlaceholder: 'Search by name or email...',
        }
    };
    const T = translations[lang];

    return (
        <div>
            <h1 className="mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">{T.title}</h1>
            
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                <div className="w-full md:w-auto flex flex-wrap gap-2">
                    <button onClick={() => setFilter('all')} className={`px-4 py-2 text-sm font-medium rounded-md ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}>{T.all}</button>
                    <button onClick={() => setFilter('user')} className={`px-4 py-2 text-sm font-medium rounded-md ${filter === 'user' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}>{T.user}</button>
                    <button onClick={() => setFilter('nurse')} className={`px-4 py-2 text-sm font-medium rounded-md ${filter === 'nurse' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}>{T.nurse}</button>
                </div>
                <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-2">
                     <div className="relative w-full sm:w-64">
                        <input 
                            type="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={T.searchPlaceholder}
                            className="w-full ps-10 pe-4 py-2 text-sm border-gray-200 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <SearchIcon className="w-5 h-5 text-gray-400"/>
                        </div>
                    </div>
                    <button className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 flex-shrink-0">{T.addUser}</button>
                </div>
            </div>

            <div className="w-full overflow-hidden rounded-lg shadow-xs">
                <div className="w-full overflow-x-auto">
                    <table className="w-full whitespace-no-wrap">
                        <thead>
                            <tr className="text-xs font-semibold tracking-wide text-start text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                <th className="px-4 py-3">{T.name}</th>
                                <th className="px-4 py-3">{T.email}</th>
                                <th className="px-4 py-3">{T.role}</th>
                                <th className="px-4 py-3">{T.status}</th>
                                <th className="px-4 py-3">{T.actions}</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                            {filteredUsers.map(user => (
                                <tr key={user.id} className="text-gray-700 dark:text-gray-400">
                                    <td className="px-4 py-3 text-sm">{user.name}</td>
                                    <td className="px-4 py-3 text-sm">{user.email}</td>
                                    <td className="px-4 py-3 text-sm">{user.role === 'user' ? T.user : T.nurse}</td>
                                    <td className="px-4 py-3 text-xs">
                                        <span className={`px-2 py-1 font-semibold leading-tight rounded-full ${user.status === 'active' ? 'text-green-700 bg-green-100 dark:bg-green-700 dark:text-green-100' : 'text-red-700 bg-red-100 dark:text-red-100 dark:bg-red-700'}`}>
                                            {user.status === 'active' ? T.active : T.inactive}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                            <button className="text-blue-500 hover:text-blue-700"><PencilSquareIcon className="w-5 h-5"/></button>
                                            <button className="text-red-500 hover:text-red-700"><TrashIcon className="w-5 h-5"/></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;