import React, { useState, useMemo } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { Nurse } from '../types';
import { LanguageIcon } from './icons';

interface MapScreenProps {
    nurses: Nurse[];
    onViewProfile: (nurseId: number) => void;
}

interface MapNurse extends Nurse {
    top: number;
    left: number;
}

const NurseMarker: React.FC<{ nurse: MapNurse; onSelect: (nurse: MapNurse) => void; isSelected: boolean }> = ({ nurse, onSelect, isSelected }) => {
    const availabilityColor = {
        available: 'bg-green-500',
        busy: 'bg-orange-500',
        offline: 'bg-gray-400',
    }[nurse.availability];

    return (
        <button 
            style={{ top: `${nurse.top}%`, left: `${nurse.left}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 transform transition-transform duration-200 hover:scale-110 focus:outline-none"
            onClick={() => onSelect(nurse)}
            aria-label={`View details for ${nurse.name}`}
        >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center p-0.5 transition-all duration-200 ${isSelected ? 'bg-cyan-500' : 'bg-white'}`}>
                <img src={nurse.img} alt={nurse.name} className="w-full h-full rounded-full object-cover" />
            </div>
            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${availabilityColor}`}></div>
            {isSelected && <div className="absolute top-0 left-0 w-full h-full rounded-full ring-2 ring-cyan-500 ring-offset-2 ring-offset-gray-100 animate-pulse"></div>}
        </button>
    );
};

const NurseInfoCard: React.FC<{ nurse: MapNurse; onClose: () => void; onViewProfile: (id: number) => void }> = ({ nurse, onClose, onViewProfile }) => (
    <div 
        className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-xl shadow-lg z-20 flex items-center gap-4"
        style={{ animation: 'slide-up 0.3s ease-out forwards' }}
    >
        <style>{`
            @keyframes slide-up {
                from { transform: translateY(100%); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `}</style>
        <img src={nurse.img} alt={nurse.name} className="w-16 h-16 rounded-full object-cover flex-shrink-0" />
        <div className="flex-grow">
            <h3 className="font-bold text-gray-800">{nurse.name}</h3>
            <p className="text-sm text-cyan-600 font-semibold">{nurse.specialty}</p>
            <div className="flex items-center gap-1 text-sm mt-1">
                <StarIcon className="w-4 h-4 text-yellow-400" />
                <span className="font-bold text-gray-700">{nurse.rating}</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-500">
                <LanguageIcon className="w-4 h-4" />
                <span>{nurse.languages.join('، ')}</span>
            </div>
        </div>
        <div className="flex flex-col gap-2">
            <button 
                onClick={() => onViewProfile(nurse.id)}
                className="px-3 py-1.5 bg-cyan-500 text-white text-sm font-semibold rounded-full hover:bg-cyan-600 transition"
            >
                عرض الملف
            </button>
            <button 
                onClick={onClose}
                className="px-3 py-1.5 bg-gray-200 text-gray-700 text-sm font-semibold rounded-full hover:bg-gray-300 transition"
            >
                إغلاق
            </button>
        </div>
    </div>
);


const MapScreen: React.FC<MapScreenProps> = ({ nurses, onViewProfile }) => {
    const [selectedNurse, setSelectedNurse] = useState<MapNurse | null>(null);

    const nursesWithPositions = useMemo(() => {
        // Generate stable random positions for nurses based on their ID
        return nurses.map(nurse => ({
            ...nurse,
            // Simple hash function to create pseudo-random but deterministic positions
            top: (nurse.id * 37) % 80 + 10, // Avoid edges, range 10-90
            left: (nurse.id * 61) % 80 + 10, // Avoid edges, range 10-90
        }));
    }, [nurses]);

    const handleSelectNurse = (nurse: MapNurse) => {
        setSelectedNurse(nurse);
    };

    const handleCloseCard = () => {
        setSelectedNurse(null);
    };

    return (
        <div className="h-full bg-gray-200 relative overflow-hidden" onClick={(e) => {
            // Deselect if clicking on the map background
            if (e.target === e.currentTarget) {
                handleCloseCard();
            }
        }}>
            <img src="https://picsum.photos/seed/mapview/800/1200" alt="Map" className="w-full h-full object-cover filter grayscale-[50%] contrast-125" />

            {nursesWithPositions.map(nurse => (
                <NurseMarker 
                    key={nurse.id} 
                    nurse={nurse}
                    onSelect={handleSelectNurse}
                    isSelected={selectedNurse?.id === nurse.id}
                />
            ))}

            {selectedNurse && (
                <NurseInfoCard 
                    nurse={selectedNurse} 
                    onClose={handleCloseCard} 
                    onViewProfile={onViewProfile}
                />
            )}
        </div>
    );
};

export default MapScreen;