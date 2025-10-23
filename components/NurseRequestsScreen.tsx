
import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { JobRequest } from '../types';

type StatusFilter = 'new' | 'accepted' | 'completed';

interface NurseRequestsScreenProps {
    requests: JobRequest[];
    onViewDetails: (requestId: number) => void;
    filter: StatusFilter | 'all';
    onFilterChange: (filter: StatusFilter | 'all') => void;
}

const statusStyles = {
    new: { text: 'text-orange-600', bg: 'bg-orange-100', label: 'جديد' },
    accepted: { text: 'text-blue-600', bg: 'bg-blue-100', label: 'مقبول' },
    completed: { text: 'text-green-600', bg: 'bg-green-100', label: 'مكتمل' },
};

const FilterButton = ({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-full text-sm font-semibold transition ${active ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-700'}`}
    >
        {label}
    </button>
);

const NurseRequestsScreen: React.FC<NurseRequestsScreenProps> = ({ requests, onViewDetails, filter, onFilterChange }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 500); // Short delay for UX
        return () => clearTimeout(timer);
    }, [requests]);

    const filteredRequests = filter === 'all' ? requests : requests.filter(o => o.status === filter);

    return (
        <div className="p-4 md:p-6 space-y-4">
            <div className="flex justify-around p-1 bg-gray-100 rounded-full">
                <FilterButton label="الكل" active={filter === 'all'} onClick={() => onFilterChange('all')} />
                <FilterButton label="جديد" active={filter === 'new'} onClick={() => onFilterChange('new')} />
                <FilterButton label="مقبول" active={filter === 'accepted'} onClick={() => onFilterChange('accepted')} />
                <FilterButton label="مكتمل" active={filter === 'completed'} onClick={() => onFilterChange('completed')} />
            </div>

            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                    {filteredRequests.length > 0 ? filteredRequests.map(req => {
                        const style = statusStyles[req.status as StatusFilter];
                        return (
                            <button 
                                key={req.id} 
                                onClick={() => onViewDetails(req.id)} 
                                className="w-full text-right bg-white p-4 rounded-lg shadow-sm border hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-gray-800">{req.service}</h3>
                                        <p className="text-sm text-gray-500">المريض: {req.patientName}</p>
                                        <p className="text-sm text-gray-500">الوقت: {req.time}</p>
                                    </div>
                                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${style.bg} ${style.text}`}>
                                        {style.label}
                                    </span>
                                </div>
                            </button>
                        );
                    }) : (
                         <p className="text-center text-gray-500 pt-8 col-span-full">لا توجد طلبات تطابق هذا الفلتر.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default NurseRequestsScreen;
