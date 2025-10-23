



import React, { useState, useMemo } from 'react';
import { ClockIcon, HeartIcon, BeakerIcon } from './icons';
import { UserGroupIcon } from '@heroicons/react/24/outline';
import { JobRequest } from '../types';

interface NurseScheduleScreenProps {
    appointments: JobRequest[];
}

const serviceIcons: { [key: string]: React.ReactNode } = {
    'قياس السكر بالدم': <span className="text-xl">🩸</span>,
    'العناية بالجروح': <span className="text-xl">🩹</span>,
    'إعطاء حقنة عضل': <span className="text-xl">💉</span>,
    'رعاية كبار السن': <UserGroupIcon className="w-5 h-5" />,
    'قياس العلامات الحيوية': <HeartIcon className="w-5 h-5" />,
    'سحب عينات مخبرية': <BeakerIcon className="w-5 h-5" />,
    'default': <span className="text-xl">🩺</span>,
};

const getServiceIcon = (serviceName: string) => {
    const foundIcon = Object.keys(serviceIcons).find(key => serviceName.includes(key));
    return foundIcon ? serviceIcons[foundIcon] : serviceIcons['default'];
};

const NurseScheduleScreen: React.FC<NurseScheduleScreenProps> = ({ appointments }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const weekDates = useMemo(() => {
        const dates = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize to start of day
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            dates.push(date);
        }
        return dates;
    }, []);
    
    const appointmentsByDate = useMemo(() => {
        const map = new Map<string, JobRequest[]>();
        appointments.forEach(appt => {
            if (appt.date) {
                const dateString = appt.date;
                const list = map.get(dateString) || [];
                list.push(appt);
                map.set(dateString, list);
            }
        });
        return map;
    }, [appointments]);

    const selectedDateString = selectedDate.toISOString().split('T')[0];
    const appointmentsForSelectedDay = appointmentsByDate.get(selectedDateString) || [];

    return (
        <div className="flex flex-col h-full bg-gray-50">
            <div className="bg-white p-4 border-b">
                <h2 className="font-bold text-lg mb-4">جدولي الأسبوعي</h2>
                <div className="flex justify-between items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4">
                    {weekDates.map((date, index) => {
                        const dateString = date.toISOString().split('T')[0];
                        const dayName = index === 0 ? 'اليوم' : date.toLocaleDateString('ar-SA', { weekday: 'short' });
                        const dayNumber = date.getDate();
                        const isSelected = selectedDate.toDateString() === date.toDateString();
                        const hasAppointments = appointmentsByDate.has(dateString);

                        return (
                            <button
                                key={dateString}
                                onClick={() => setSelectedDate(date)}
                                className={`flex flex-col items-center justify-center flex-shrink-0 w-16 h-20 rounded-xl p-2 transition-all duration-200 ${
                                    isSelected ? 'bg-teal-500 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-teal-50'
                                }`}
                            >
                                <span className="text-sm font-semibold">{dayName}</span>
                                <span className="text-xl font-bold">{dayNumber}</span>
                                {hasAppointments && <div className={`mt-1 h-1.5 w-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-teal-500'}`}></div>}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="flex-grow overflow-y-auto p-4">
                <h3 className="font-bold text-lg mb-3">
                    مواعيد يوم {selectedDate.toLocaleDateString('ar-SA', { weekday: 'long' })}
                </h3>
                {appointmentsForSelectedDay.length > 0 ? (
                    <div className="space-y-3 lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-3 lg:space-y-0">
                        {appointmentsForSelectedDay.sort((a,b) => a.time.localeCompare(b.time)).map(appt => (
                            <div key={appt.id} className="bg-white p-4 rounded-lg shadow-sm border flex items-center gap-4">
                                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-teal-50 text-teal-600 rounded-lg">
                                    {getServiceIcon(appt.service)}
                                </div>
                                <div className="flex-grow">
                                    <p className="font-bold text-gray-800">{appt.service}</p>
                                    <p className="text-sm text-gray-600">المريض: {appt.patientName}</p>
                                </div>
                                <div className="flex-shrink-0 flex items-center gap-2 text-sm font-semibold text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
                                    <ClockIcon className="w-4 h-4" />
                                    <span>{appt.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                         <span className="text-5xl">🗓️</span>
                        <p className="text-gray-600 font-semibold mt-4">لا توجد مواعيد في هذا اليوم.</p>
                        <p className="text-sm text-gray-400 mt-1">يمكنك أخذ قسط من الراحة أو تفقد الطلبات الجديدة.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NurseScheduleScreen;
