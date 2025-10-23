import React, { useState } from 'react';

interface NurseFilterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApplyFilters: (filters: any) => void;
}

const specialties = [
    'خدمات التمريض العامة',
    'رعاية أمراض مزمنة',
    'العناية بالجروح',
    'رعاية كبار السن',
    'رعاية أطفال',
];

const languages = ['العربية', 'الإنجليزية'];

const NurseFilterModal: React.FC<NurseFilterModalProps> = ({ isOpen, onClose, onApplyFilters }) => {
    const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
    const [minRating, setMinRating] = useState(0);
    const [availability, setAvailability] = useState(false);
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

    const handleSpecialtyChange = (specialty: string) => {
        setSelectedSpecialties(prev =>
            prev.includes(specialty)
                ? prev.filter(s => s !== specialty)
                : [...prev, specialty]
        );
    };

    const handleLanguageChange = (language: string) => {
        setSelectedLanguages(prev =>
            prev.includes(language)
                ? prev.filter(l => l !== language)
                : [...prev, language]
        );
    };
    
    const handleApply = () => {
        onApplyFilters({
            specialties: selectedSpecialties,
            rating: minRating,
            availability: availability ? 'available' : undefined,
            languages: selectedLanguages
        });
    };
    
    const handleReset = () => {
        setSelectedSpecialties([]);
        setMinRating(0);
        setAvailability(false);
        setSelectedLanguages([]);
        onApplyFilters({}); // Apply empty filters to reset
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end" onClick={onClose}>
            <div 
                className="relative bg-white w-full max-h-[80vh] rounded-t-2xl p-6 flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex-shrink-0 flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">فلترة الممرضين</h2>
                    <button onClick={onClose} className="text-gray-500 text-2xl leading-none">&times;</button>
                </div>
                
                <div className="flex-grow overflow-y-auto pr-2 space-y-6">
                    {/* Availability Filter */}
                    <div>
                        <h3 className="font-semibold mb-2">الحالة</h3>
                        <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="font-medium text-gray-700">متوفر الآن</span>
                            <div className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={availability}
                                    onChange={() => setAvailability(!availability)}
                                    className="sr-only peer" 
                                />
                                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-cyan-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                            </div>
                        </label>
                    </div>

                    {/* Language Filter */}
                    <div>
                        <h3 className="font-semibold mb-2">اللغة</h3>
                        <div className="space-y-2">
                            {languages.map(lang => (
                                <label key={lang} className="flex items-center space-x-3 space-x-reverse">
                                    <input 
                                        type="checkbox" 
                                        className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                                        checked={selectedLanguages.includes(lang)}
                                        onChange={() => handleLanguageChange(lang)}
                                    />
                                    <span className="text-gray-700">{lang}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Specialty Filter */}
                    <div>
                        <h3 className="font-semibold mb-2">التخصص</h3>
                        <div className="space-y-2">
                            {specialties.map(spec => (
                                <label key={spec} className="flex items-center space-x-3 space-x-reverse">
                                    <input 
                                        type="checkbox" 
                                        className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                                        checked={selectedSpecialties.includes(spec)}
                                        onChange={() => handleSpecialtyChange(spec)}
                                    />
                                    <span className="text-gray-700">{spec}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    
                    {/* Rating Filter */}
                    <div>
                        <h3 className="font-semibold mb-2">التقييم الأدنى</h3>
                        <div className="flex items-center gap-4">
                            <input 
                                type="range" 
                                min="0" 
                                max="5" 
                                step="0.1" 
                                value={minRating}
                                onChange={(e) => setMinRating(parseFloat(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <span className="font-bold text-cyan-600">{minRating.toFixed(1)}</span>
                        </div>
                    </div>
                </div>

                <div className="flex-shrink-0 flex gap-4 mt-8">
                    <button 
                        onClick={handleReset}
                        className="flex-1 py-3 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition"
                    >
                        إعادة تعيين
                    </button>
                    <button 
                        onClick={handleApply}
                        className="flex-1 py-3 bg-cyan-500 text-white font-bold rounded-lg hover:bg-cyan-600 transition"
                    >
                        تطبيق
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NurseFilterModal;