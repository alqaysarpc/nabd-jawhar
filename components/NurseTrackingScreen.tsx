import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import LoadingSpinner from './LoadingSpinner';
import { PhoneIcon, ChatBubbleLeftEllipsisIcon } from './icons';

interface NurseTrackingScreenProps {
    orderId: number;
    onBack: () => void;
}

// بيانات تجريبية
const mockOrderDetails = {
    2: {
        nurse: { name: 'وليد بن قبوس', img: '/1.png', rating: 4.9 },
        eta: 12,
        nurseStart: [14.551, 49.127], // موقع الممرض الابتدائي (قريب من فوه)
        destination: [14.540, 49.134], // موقع المنزل (الشرج مثلًا)
    },
};

// أيقونة الممرض (سيارة)
const nurseIcon = new L.DivIcon({
    html: '🚗',
    className: 'text-3xl',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
});

// أيقونة المنزل
const homeIcon = new L.DivIcon({
    html: '🏠',
    className: 'text-3xl',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
});

const NurseTrackingScreen: React.FC<NurseTrackingScreenProps> = ({ orderId, onBack }) => {
    const [orderDetails, setOrderDetails] = useState<any>(null);
    const [eta, setEta] = useState(0);
    const [loading, setLoading] = useState(true);
    const [nursePosition, setNursePosition] = useState<[number, number] | null>(null);

    useEffect(() => {
        setLoading(true);
        const orderInfo = mockOrderDetails[orderId as keyof typeof mockOrderDetails];
        if (orderInfo) {
            setOrderDetails(orderInfo);
            setEta(orderInfo.eta);
            setNursePosition(orderInfo.nurseStart);
        }
        setLoading(false);
    }, [orderId]);

    // العد التنازلي للوقت
    useEffect(() => {
        if (eta > 0) {
            const timer = setInterval(() => {
                setEta((prev) => (prev > 0 ? prev - 1 : 0));
            }, 60000);
            return () => clearInterval(timer);
        }
    }, [eta]);

    // محاكاة حركة الممرض نحو الوجهة
    useEffect(() => {
        if (!orderDetails || !nursePosition) return;

        const interval = setInterval(() => {
            setNursePosition((prev) => {
                if (!prev) return prev;
                const [lat1, lng1] = prev;
                const [lat2, lng2] = orderDetails.destination;
                const step = 0.0002; // سرعة الحركة
                const newLat = lat1 + (lat2 - lat1) * step;
                const newLng = lng1 + (lng2 - lng1) * step;
                if (Math.abs(lat2 - newLat) < 0.0001 && Math.abs(lng2 - newLng) < 0.0001)
                    return [lat2, lng2];
                return [newLat, newLng];
            });
        }, 1500);

        return () => clearInterval(interval);
    }, [orderDetails]);

    if (loading) {
        return (
            <div className="flex flex-col h-full bg-white">
                <div className="p-4 flex items-center border-b">
                    <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100">
                        <ArrowRightIcon className="w-6 h-6 text-gray-600" />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800 mx-auto">تتبع الممرض</h1>
                </div>
                <LoadingSpinner />
            </div>
        );
    }

    if (!orderDetails) {
        return <div className="p-8 text-center text-red-500">لا يمكن تتبع هذا الطلب.</div>;
    }

    const { nurse, destination } = orderDetails;

    return (
        <div className="flex flex-col h-full bg-gray-200">
            {/* الشريط العلوي */}
            <div className="p-4 flex items-center border-b bg-white sticky top-0 z-20">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100">
                    <ArrowRightIcon className="w-6 h-6 text-gray-600" />
                </button>
                <h1 className="text-xl font-bold text-gray-800 mx-auto">تتبع الممرض</h1>
            </div>

            {/* الخريطة */}
            <div className="flex-grow relative overflow-hidden">
                {nursePosition && (
                    <MapContainer
                        center={nursePosition}
                        zoom={15}
                        className="w-full h-full z-0"
                        scrollWheelZoom={false}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position={nursePosition} icon={nurseIcon} />
                        <Marker position={destination} icon={homeIcon} />

                        {/* المسار بين الممرض والمنزل */}
                        <Polyline
                            positions={[nursePosition, destination]}
                            pathOptions={{ color: '#06b6d4', dashArray: '5,10', weight: 3 }}
                        />
                    </MapContainer>
                )}
            </div>

            {/* البطاقة السفلية */}
            <div className="p-4 bg-white border-t sticky bottom-0 z-20">
                <div className="flex items-center gap-4">
                    <img src={nurse.img} alt={nurse.name} className="w-16 h-16 rounded-full object-cover" />
                    <div className="flex-grow">
                        <p className="text-sm text-gray-500">الممرض في الطريق</p>
                        <h3 className="font-bold text-lg text-gray-800">{nurse.name}</h3>
                        <p className="font-bold text-cyan-600">
                            {eta > 0 ? `سيصل خلال ${eta} دقيقة تقريباً` : 'سيصل قريباً'}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-3 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300">
                            <ChatBubbleLeftEllipsisIcon className="w-6 h-6" />
                        </button>
                        <button className="p-3 bg-green-500 rounded-full text-white hover:bg-green-600">
                            <PhoneIcon className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NurseTrackingScreen;
