import React, { useState, useEffect } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import LoadingSpinner from './LoadingSpinner';
import { PhoneIcon, ChatBubbleLeftEllipsisIcon } from './icons';

interface NurseTrackingScreenProps {
    orderId: number;
    onBack: () => void;
}

// Mock data to simulate fetching order details for tracking
const mockOrderDetails = {
    2: { 
        nurse: { name: 'أحمد خالد', img: 'https://picsum.photos/seed/nurse1/80/80', rating: 4.9 },
        eta: 12, // in minutes
    },
};

const NurseTrackingScreen: React.FC<NurseTrackingScreenProps> = ({ orderId, onBack }) => {
    const [orderDetails, setOrderDetails] = useState<any>(null);
    const [eta, setEta] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const orderInfo = mockOrderDetails[orderId as keyof typeof mockOrderDetails];
        if (orderInfo) {
            setOrderDetails(orderInfo);
            setEta(orderInfo.eta);
        }
        setLoading(false);
    }, [orderId]);

    // Simulate ETA countdown
    useEffect(() => {
        if (eta > 0) {
            const timer = setInterval(() => {
                setEta(prev => (prev > 0 ? prev - 1 : 0));
            }, 60000); // every minute
            return () => clearInterval(timer);
        }
    }, [eta]);
    
    if (loading) {
        return (
             <div className="flex flex-col h-full bg-white">
                <div className="p-4 flex items-center border-b"><button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100"><ArrowRightIcon className="w-6 h-6 text-gray-600" /></button><h1 className="text-xl font-bold text-gray-800 mx-auto">تتبع الممرض</h1></div>
                <LoadingSpinner />
            </div>
        );
    }

    if (!orderDetails) {
        return <div className="p-8 text-center text-red-500">لا يمكن تتبع هذا الطلب.</div>;
    }

    const { nurse } = orderDetails;

    return (
        <div className="flex flex-col h-full bg-gray-200">
            <div className="p-4 flex items-center border-b bg-white sticky top-0 z-20">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100">
                    <ArrowRightIcon className="w-6 h-6 text-gray-600" />
                </button>
                <h1 className="text-xl font-bold text-gray-800 mx-auto">تتبع الممرض</h1>
            </div>

            <div className="flex-grow relative overflow-hidden">
                {/* Map Background */}
                <img src="https://picsum.photos/seed/trackingmap/800/1200" alt="Map" className="w-full h-full object-cover filter grayscale-[50%]" />
                
                {/* Simulated markers and path */}
                <div className="absolute top-0 left-0 w-full h-full">
                    {/* User's Home */}
                    <div className="absolute bottom-[15%] right-[25%]">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center ring-4 ring-blue-200">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white px-2 py-0.5 rounded-md text-xs font-semibold shadow">المنزل</span>
                    </div>

                    {/* Nurse's Vehicle */}
                    <div className="absolute top-[40%] left-[40%] animate-pulse">
                        <span className="text-4xl">🚗</span>
                    </div>

                    {/* Dotted Path (SVG) */}
                    <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M 45 45 Q 60 60, 72 82" stroke="#3b82f6" strokeWidth="1" fill="none" strokeDasharray="2,2" />
                    </svg>
                </div>
            </div>

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