import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import { FilterIcon } from './icons';
import NurseFilterModal from './NurseFilterModal';


interface HomeScreenProps {
    onViewAllServices: () => void;
    onServiceSelect: (serviceId: string) => void;
    onViewProfile: (nurseId: number) => void;
    onSearch: (query: string) => void;
}

const featuredNursesData = [
    { id: 1, name: 'أحمد خالد', img: 'https://picsum.photos/seed/nurse1/100/100', rating: 4.9, specialty: 'خدمات التمريض العامة', experience: 7, availability: 'available', languages: ['العربية', 'الإنجليزية'] },
    { id: 2, name: 'نورة محمد', img: 'https://picsum.photos/seed/nurse2/100/100', rating: 4.8, specialty: 'رعاية أمراض مزمنة', experience: 5, availability: 'busy', languages: ['العربية'] },
    { id: 4, name: 'خالد الغامدي', img: 'https://picsum.photos/seed/nurse4/100/100', rating: 4.9, specialty: 'رعاية كبار السن', experience: 10, availability: 'offline', languages: ['العربية', 'الإنجليزية'] },
    { id: 3, name: 'سارة عبدالله', img: 'https://picsum.photos/seed/nurse3/100/100', rating: 4.7, specialty: 'العناية بالجروح', experience: 6, availability: 'available', languages: ['العربية'] },
];

const comprehensiveServices = [
    { id: 'spec-postop', name: 'رعاية ما بعد العمليات', icon: '🏨', color: 'bg-blue-100' },
    { id: 'spec-elderly', name: 'رعاية كبار السن', icon: '👵', color: 'bg-green-100' },
    { id: 'spec-maternity', name: 'رعاية حالات الولادة', icon: '🤱', color: 'bg-pink-100' },
];

const individualServices = [
    { id: 'gen-injection', name: 'إعطاء حقنة', icon: '💉', color: 'bg-cyan-100' },
    { id: 'gen-vitals', name: 'قياس الضغط', icon: '🩺', color: 'bg-red-100' },
    { id: 'gen-glucose', name: 'قياس السكر', icon: '🩸', color: 'bg-red-100' },
    { id: 'gen-wound', name: 'العناية بالجروح', icon: '🩹', color: 'bg-yellow-100' },
    { id: 'adv-catheter', name: 'تركيب قسطرة', icon: '⚕️', color: 'bg-blue-100' },
    { id: 'adv-iv', name: 'محلول وريدي', icon: '💧', color: 'bg-sky-100' },
    { id: 'adv-cannula', name: 'تركيب كانيولا', icon: '➕', color: 'bg-green-100' },
    { id: 'adv-catheter-remove', name: 'إزالة قسطرة', icon: '➖', color: 'bg-purple-100' },
];

const SectionHeader: React.FC<{ title: string; onViewAll: () => void }> = ({ title, onViewAll }) => (
    <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <button onClick={onViewAll} className="text-sm font-semibold text-cyan-600 hover:underline">
            عرض الكل
        </button>
    </div>
);

const HomeScreen: React.FC<HomeScreenProps> = ({ onViewAllServices, onServiceSelect, onViewProfile, onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [filters, setFilters] = useState<any>({});

    const fuzzyMatch = (query: string, text: string): boolean => {
        const searchQuery = query.toLowerCase().replace(/\s/g, '');
        if (!searchQuery) return true; // Show all if query is empty
        const targetText = text.toLowerCase();
        let queryIndex = 0;
        for (let i = 0; i < targetText.length && queryIndex < searchQuery.length; i++) {
            if (targetText[i] === searchQuery[queryIndex]) {
                queryIndex++;
            }
        }
        return queryIndex === searchQuery.length;
    };

    const handleApplyFilters = (newFilters: any) => {
        setFilters(newFilters);
        setIsFilterModalOpen(false);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            onSearch(searchQuery.trim());
        }
    };

    const filteredNurses = featuredNursesData
        .filter(nurse => fuzzyMatch(searchQuery, nurse.name))
        .filter(nurse => {
            if (filters.specialties?.length > 0 && !filters.specialties.includes(nurse.specialty)) {
                return false;
            }
            if (filters.rating && nurse.rating < filters.rating) {
                return false;
            }
            if (filters.availability === 'available' && nurse.availability !== 'available') {
                return false;
            }
            if (filters.languages?.length > 0) {
                const hasAllLanguages = filters.languages.every((lang: string) => nurse.languages.includes(lang));
                if (!hasAllLanguages) {
                    return false;
                }
            }
            return true;
        });

    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
            {/* Welcome Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-800">أهلاً بك، خولة بارجاش</h1>
                <p className="text-gray-500">كيف يمكننا خدمتك اليوم؟</p>
            </div>
            
            {/* Search and Filters */}
            <div className="flex gap-2 items-center">
                <form onSubmit={handleSearchSubmit} className="relative flex-grow">
                    <input 
                        type="text" 
                        placeholder="ابحث عن خدمة أو ممرض..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-100 border border-transparent rounded-full pl-12 pr-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white transition"
                    />
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                </form>
                <button onClick={() => setIsFilterModalOpen(true)} className="p-3 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition shadow flex-shrink-0">
                    <FilterIcon />
                </button>
            </div>

            {/* Comprehensive Care Services */}
            <div>
                <SectionHeader title="خدمات الرعاية الشاملة" onViewAll={onViewAllServices} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {comprehensiveServices.map(service => (
                         <button 
                            key={service.id} 
                            onClick={() => onServiceSelect(service.id)}
                            className="w-full text-right bg-white p-3 rounded-lg shadow-sm border border-gray-200 flex items-center gap-4 cursor-pointer hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        >
                            <div className={`w-12 h-12 flex items-center justify-center rounded-lg text-2xl ${service.color}`}>
                                {service.icon}
                            </div>
                             <div className="flex-grow">
                                 <h3 className="font-bold text-gray-800">{service.name}</h3>
                             </div>
                         </button>
                     ))}
                </div>
            </div>

            {/* Individual Services */}
            <div>
                <SectionHeader title="الخدمات الفردية" onViewAll={onViewAllServices} />
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 text-center">
                    {individualServices.map(service => (
                        <button 
                            key={service.id}
                            onClick={() => onServiceSelect(service.id)}
                            className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        >
                            <div className={`w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-2 text-2xl ${service.color}`}>
                                {service.icon}
                            </div>
                            <span className="text-xs font-semibold text-gray-700">{service.name}</span>
                        </button>
                    ))}
                     <button onClick={onViewAllServices} className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-cyan-500">
                        <div className={`w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-2 text-2xl bg-gray-100`}>
                            ➕
                        </div>
                        <span className="text-xs font-semibold text-gray-700">خدمات أخرى</span>
                    </button>
                </div>
            </div>

            {/* Featured Nurses */}
            <div>
                <h2 className="text-lg font-bold text-gray-800 mb-3">الممرضين المميزين</h2>
                {filteredNurses.length > 0 ? (
                    <div className="grid grid-flow-col auto-cols-[10rem] gap-4 overflow-x-auto pb-3 -mx-4 px-4 md:grid-flow-row sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:mx-0 md:px-0">
                        {filteredNurses.map(nurse => (
                            <button 
                                key={nurse.id} 
                                onClick={() => onViewProfile(nurse.id)}
                                className="flex-shrink-0 w-40 md:w-auto bg-white p-3 rounded-xl shadow-sm border cursor-pointer hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-cyan-500 text-center"
                            >
                                <img src={nurse.img} alt={nurse.name} className="w-24 h-24 rounded-full mx-auto mb-2 border-2 border-cyan-100" />
                                <h3 className="font-bold text-center text-gray-800 truncate">{nurse.name}</h3>
                                <p className="text-xs text-center text-gray-500 mb-2">{nurse.specialty}</p>
                                <div className="flex items-center justify-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                                    <StarIcon className="w-4 h-4 text-yellow-400" />
                                    <span className="text-xs font-bold text-gray-700">{nurse.rating}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 py-4">لا يوجد ممرضين يطابقون بحثك.</p>
                )}
            </div>
            
            <NurseFilterModal 
                isOpen={isFilterModalOpen} 
                onClose={() => setIsFilterModalOpen(false)}
                onApplyFilters={handleApplyFilters}
            />
        </div>
    );
};

export default HomeScreen;