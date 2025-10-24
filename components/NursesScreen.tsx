
import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import NurseFilterModal from './NurseFilterModal';
import { StarIcon } from '@heroicons/react/24/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Nurse } from '../types';
import MapScreen from './MapScreen';
import { MapIcon, ListIcon, FilterIcon, LanguageIcon } from './icons';

interface NursesScreenProps {
    onViewProfile: (nurseId: number) => void;
}

const mockNurses: Nurse[] = [
    { id: 1, name: 'جنى بن ماضي', img: 'https://picsum.photos/seed/nurse5/100/100', rating: 4.6, specialty: 'رعاية أطفال', experience: 4, availability: 'busy', languages: ['العربية'] },
    { id: 2, name: 'وليد بن قبوس', img: 'https://picsum.photos/seed/nurse1/100/100', rating: 4.9, specialty: 'خدمات التمريض ', experience: 7, availability: 'available', languages: ['العربية', 'الإنجليزية'] },
    { id: 3, name: 'ماريا باجبير', img: 'https://picsum.photos/seed/nurse2/100/100', rating: 4.8, specialty: 'رعاية أمراض مزمنة', experience: 5, availability: 'busy', languages: ['العربية'] },
    { id: 4, name: 'شروق صالح', img: 'https://picsum.photos/seed/nurse3/100/100', rating: 4.7, specialty: 'العناية بالجروح', experience: 6, availability: 'available', languages: ['العربية'] },
    { id: 5, name: 'سلطان باهبري', img: 'https://picsum.photos/seed/nurse4/100/100', rating: 4.9, specialty: 'رعاية كبار السن', experience: 10, availability: 'offline', languages: ['العربية', 'الإنجليزية'] },
    { id: 6, name: 'جنى القعيطي', img: 'https://picsum.photos/seed/nurse5/100/100', rating: 4.6, specialty: 'رعاية أطفال', experience: 4, availability: 'busy', languages: ['العربية'] },
    { id: 7, name: 'ماريا هبة باسلوم', img: 'https://picsum.photos/seed/nurse2/100/100', rating: 4.0, specialty: 'رعاية أمراض مزمنة', experience: 3, availability: 'busy', languages: ['العربية'] },
    { id: 7, name: 'خولة الزبيدي', img: 'https://picsum.photos/seed/nurse2/100/100', rating: 4.7, specialty: 'رعاية أمراض الحروق', experience: 5, availability: 'busy', languages: ['العربية'] }


];

const NursesScreen: React.FC<NursesScreenProps> = ({ onViewProfile }) => {
    const [loading, setLoading] = useState(true);
    const [nurses, setNurses] = useState<Nurse[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [filters, setFilters] = useState<any>({});
    const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setNurses(mockNurses);
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const filteredNurses = nurses
        .filter(nurse => nurse.name.toLowerCase().includes(searchQuery.toLowerCase()))
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

    const handleApplyFilters = (newFilters: any) => {
        setFilters(newFilters);
        setIsFilterModalOpen(false);
    };

    return (
        <div className="flex flex-col h-full">
            <div className="p-4 bg-white border-b sticky top-0 z-10 space-y-3">
                <div className="flex gap-2 items-center">
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            placeholder="ابحث بالاسم..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-gray-100 border border-transparent rounded-full pl-12 pr-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white transition"
                        />
                        <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                    </div>
                    <button onClick={() => setIsFilterModalOpen(true)} className="p-3 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition shadow flex-shrink-0">
                        <FilterIcon />
                    </button>
                </div>
                 <div className="flex justify-center">
                    <div className="inline-flex rounded-full bg-gray-100 p-1">
                        <button 
                            onClick={() => setViewMode('list')}
                            className={`px-6 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 transition-colors ${viewMode === 'list' ? 'bg-white text-cyan-600 shadow-sm' : 'text-gray-500'}`}
                        >
                            <ListIcon className="w-5 h-5" />
                            قائمة
                        </button>
                        <button 
                            onClick={() => setViewMode('map')}
                            className={`px-6 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 transition-colors ${viewMode === 'map' ? 'bg-white text-cyan-600 shadow-sm' : 'text-gray-500'}`}
                        >
                            <MapIcon className="w-5 h-5" />
                            خريطة
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="flex-grow overflow-y-auto">
                {loading ? (
                    <LoadingSpinner />
                ) : viewMode === 'list' ? (
                    <div className="p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                        {filteredNurses.length > 0 ? filteredNurses.map(nurse => (
                            <button key={nurse.id} onClick={() => onViewProfile(nurse.id)} className="w-full text-right bg-white p-4 rounded-lg shadow-sm border flex items-center gap-4 hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-cyan-500">
                                <img src={nurse.img} alt={nurse.name} className="w-16 h-16 rounded-full object-cover" />
                                <div className="flex-grow">
                                    <h3 className="font-bold text-gray-800 text-lg">{nurse.name}</h3>
                                    <p className="text-sm text-cyan-600 font-semibold">{nurse.specialty}</p>
                                    <p className="text-sm text-gray-500">خبرة {nurse.experience} سنوات</p>
                                    <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-500">
                                        <LanguageIcon className="w-4 h-4" />
                                        <span>{nurse.languages.join('، ')}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="flex items-center gap-1">
                                        <StarIcon className="w-5 h-5 text-yellow-400" />
                                        <span className="font-bold text-gray-700">{nurse.rating}</span>
                                    </div>
                                    <span className="text-xs text-gray-400">تقييم</span>
                                </div>
                            </button>
                        )) : (
                             <p className="text-center text-gray-500 pt-8 col-span-full">لا يوجد ممرضين يطابقون بحثك.</p>
                        )}
                    </div>
                ) : (
                    <MapScreen nurses={filteredNurses} onViewProfile={onViewProfile} />
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

export default NursesScreen;
