import React, { useState } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface EditProfileScreenProps {
    onBack: () => void;
    onSave: () => void;
}

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ onBack, onSave }) => {
    const [profileData, setProfileData] = useState({
        name: 'عبدالله محمد',
        email: 'abdullah.m@example.com',
        phone: '777123456',
        dob: '1990-05-15',
        gender: 'male',
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="flex flex-col h-full bg-gray-50">
            <div className="p-4 flex items-center border-b bg-white sticky top-0 z-10">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100">
                    <ArrowRightIcon className="w-6 h-6 text-gray-600" />
                </button>
                <h1 className="text-xl font-bold text-gray-800 mx-auto">تعديل الملف الشخصي</h1>
            </div>

            <div className="flex-grow overflow-y-auto p-4 md:p-6 lg:p-8 flex flex-col items-center">
                <div className="w-full max-w-2xl space-y-4">
                    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border">
                        <div className="relative">
                            <img src="https://picsum.photos/seed/avatar/100/100" alt="Profile" className="w-24 h-24 rounded-full" />
                            <button className="absolute bottom-0 left-0 bg-cyan-500 text-white w-8 h-8 rounded-full flex items-center justify-center border-2 border-white" aria-label="تغيير الصورة الشخصية">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
                            </button>
                        </div>
                    </div>
                    
                    <form className="bg-white p-4 md:p-6 rounded-lg shadow-sm border space-y-4 text-right">
                         <fieldset className="space-y-4">
                            <legend className="text-lg font-semibold text-gray-600 border-b pb-1 w-full mb-2">المعلومات الشخصية</legend>
                             <div>
                                <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1 block">الاسم الكامل</label>
                                <input id="name" name="name" type="text" value={profileData.name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 transition" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="dob" className="text-sm font-medium text-gray-700 mb-1 block">تاريخ الميلاد</label>
                                    <input id="dob" name="dob" type="date" value={profileData.dob} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 transition" required />
                                </div>
                                <div>
                                    <label htmlFor="gender" className="text-sm font-medium text-gray-700 mb-1 block">الجنس</label>
                                    <select id="gender" name="gender" value={profileData.gender} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 transition bg-white" required>
                                        <option value="male">ذكر</option>
                                        <option value="female">أنثى</option>
                                    </select>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset className="space-y-4 pt-4">
                             <legend className="text-lg font-semibold text-gray-600 border-b pb-1 w-full mb-2">معلومات التواصل</legend>
                             <div>
                                <label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-1 block">رقم الجوال</label>
                                <input id="phone" name="phone" type="tel" value={profileData.phone} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 transition" placeholder="7xxxxxxxx" required />
                            </div>
                            <div>
                                <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1 block">البريد الإلكتروني</label>
                                <input id="email" name="email" type="email" value={profileData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 transition" placeholder="example@mail.com" required />
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>

            <div className="p-4 bg-white border-t sticky bottom-0">
                <button onClick={onSave} className="w-full bg-cyan-500 text-white py-3 rounded-lg font-bold text-lg shadow-md hover:bg-cyan-600 transition">
                    حفظ التغييرات
                </button>
            </div>
        </div>
    );
};

export default EditProfileScreen;