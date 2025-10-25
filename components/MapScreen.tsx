import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Nurse } from '../types';
import { StarIcon } from '@heroicons/react/24/solid';
import { LanguageIcon } from './icons';

interface MapScreenProps {
    nurses: Nurse[];
    onViewProfile: (nurseId: number) => void;
}

// أيقونة مخصصة لكل ممرضة
const nurseIcon = (img: string) =>
    L.icon({
        iconUrl: img,
        iconSize: [45, 45],
        className: 'rounded-full border-2 border-white shadow-md',
    });

const MapScreen: React.FC<MapScreenProps> = ({ nurses, onViewProfile }) => {
    const [selectedNurse, setSelectedNurse] = useState<Nurse | null>(null);

    // مواقع الممرضين (قريبة من المكلا)
    const nursesWithLocation = useMemo(() => {
        return nurses.map((nurse, index) => ({
            ...nurse,
            lat: 14.541 + Math.random() * 0.02,  // خط العرض (المكلا)
            lng: 49.125 + Math.random() * 0.02,  // خط الطول
        }));
    }, [nurses]);

    return (
        <div className="h-full relative">
            <MapContainer
                center={[14.541, 49.125]} // مركز المكلا
                zoom={13}
                className="w-full h-full z-0"
            >
                {/* خلفية الخريطة */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {nursesWithLocation.map(nurse => (
                    <Marker
                        key={nurse.id}
                        position={[nurse.lat, nurse.lng]}
                        icon={nurseIcon(nurse.img)}
                        eventHandlers={{
                            click: () => setSelectedNurse(nurse),
                        }}
                    />
                ))}
            </MapContainer>

            {selectedNurse && (
                <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-xl shadow-lg z-20 flex items-center gap-4 animate-slide-up">
                    <img src={selectedNurse.img} alt={selectedNurse.name} className="w-16 h-16 rounded-full object-cover" />
                    <div className="flex-grow">
                        <h3 className="font-bold text-gray-800">{selectedNurse.name}</h3>
                        <p className="text-sm text-cyan-600 font-semibold">{selectedNurse.specialty}</p>
                        <div className="flex items-center gap-1 text-sm mt-1">
                            <StarIcon className="w-4 h-4 text-yellow-400" />
                            <span className="font-bold text-gray-700">{selectedNurse.rating}</span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-500">
                            <LanguageIcon className="w-4 h-4" />
                            <span>{selectedNurse.languages.join('، ')}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={() => onViewProfile(selectedNurse.id)}
                            className="px-3 py-1.5 bg-cyan-500 text-white text-sm font-semibold rounded-full hover:bg-cyan-600 transition"
                        >
                            عرض الملف
                        </button>
                        <button
                            onClick={() => setSelectedNurse(null)}
                            className="px-3 py-1.5 bg-gray-200 text-gray-700 text-sm font-semibold rounded-full hover:bg-gray-300 transition"
                        >
                            إغلاق
                        </button>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes slide-up {
                    from { transform: translateY(100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-slide-up {
                    animation: slide-up 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default MapScreen;
