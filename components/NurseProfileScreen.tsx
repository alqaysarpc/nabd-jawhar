
import React, { useState, useEffect } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import LoadingSpinner from './LoadingSpinner';
import { CheckCircleIcon, ClockIcon, XCircleIcon } from './icons';

type AvailabilityStatus = 'available' | 'busy' | 'offline';

interface DetailedNurse {
    id: number;
    name: string;
    img: string;
    rating: number;
    reviewsCount: number;
    specialty: string;
    experience: number; // years
    bio: string;
    services: string[];
    availability: AvailabilityStatus;
    waitTime?: number; // in minutes
    reviews: {
        reviewer: string;
        comment: string;
        rating: number;
    }[];
}

const mockNurseProfiles: DetailedNurse[] = [
    { 
        id: 1, 
        name: 'وليد بن قبوس ', 
        img: 'https://picsum.photos/seed/nurse1/100/100', 
        rating: 4.9, 
        reviewsCount: 120,
        specialty: 'خدمات التمريض ', 
        experience: 7,
        bio: 'ممرض متخصص ذو خبرة 7 سنوات في تقديم الرعاية الصحية العامة، ملتزم بتقديم أفضل خدمة للمرضى في منازلهم.',
        services: ['إعطاء الحقن', 'قياس العلامات الحيوية', 'العناية بالجروح البسيطة', 'تركيب المغذيات'],
        availability: 'available',
        reviews: [
            { reviewer: 'عبدالله', comment: 'خدمة ممتازة واحترافية عالية.', rating: 5 },
            { reviewer: 'فاطمة', comment: 'دقيق في مواعيده ومتعاون جداً.', rating: 5 },
        ]
    },
    { 
        id: 2, 
        name: 'ماريا باجبير ', 
        img: 'https://picsum.photos/seed/nurse2/100/100', 
        rating: 4.8, 
        reviewsCount: 95,
        specialty: 'رعاية أمراض مزمنة', 
        experience: 5,
        bio: 'ممرضة شغوفة برعاية مرضى الأمراض المزمنة، أمتلك خبرة في متابعة حالات السكري وارتفاع ضغط الدم.',
        services: ['قياس السكر', 'متابعة الضغط', 'إعطاء أدوية', 'العناية بالقدم السكرية'],
        availability: 'busy',
        waitTime: 45,
        reviews: [
            { reviewer: 'سالم', comment: 'ممرضة رائعة وصبورة.', rating: 5 },
        ]
    },
     { id: 3, name: 'شروق صالح ', img: 'https://picsum.photos/seed/nurse3/100/100', rating: 4.7, reviewsCount: 88, specialty: 'العناية بالجروح', experience: 6, bio: 'خبيرة في العناية بمختلف أنواع الجروح، بما في ذلك جروح ما بعد العمليات والجروح المزمنة.', services: ['تغيير الضمادات', 'تنظيف الجروح', 'متابعة الشفاء'], availability: 'available', reviews: [{reviewer: 'خالد', comment: 'اهتمام كبير بالتفاصيل.', rating: 5}] },
    { id: 4, name: 'سلطان باهبري ', img: 'https://picsum.photos/seed/nurse4/100/100', rating: 4.9, reviewsCount: 150, specialty: 'رعاية كبار السن', experience: 10, bio: 'ممرض متخصص في توفير الرعاية الشاملة والمريحة لكبار السن في بيئتهم المنزلية.', services: ['المساعدة في النظافة الشخصية', 'إدارة الأدوية', 'الدعم النفسي'], availability: 'offline', reviews: [{reviewer: 'عائلة حمد', comment: 'أكثر من رائع، شكراً لجهودك.', rating: 5}] },
    { id: 5, name: 'فاطمة الزهراني', img: 'https://picsum.photos/seed/nurse5/100/100', rating: 4.6, reviewsCount: 72, specialty: 'رعاية أطفال', experience: 4, bio: 'ممرضة أطفال محبة لعملها، أقدم رعاية آمنة وموثوقة للأطفال وحديثي الولادة.', services: ['رعاية حديثي الولادة', 'إعطاء التطعيمات', 'متابعة النمو'], availability: 'busy', waitTime: 20, reviews: [{reviewer: 'أم سارة', comment: 'لطيفة جداً مع الأطفال.', rating: 5}] },
];


interface NurseProfileScreenProps {
    nurseId: number;
    onBack: () => void;
    onRequestService: (nurseId: number) => void;
}

const AvailabilityBadge: React.FC<{ status: AvailabilityStatus; waitTime?: number }> = ({ status, waitTime }) => {
    switch (status) {
        case 'available':
            return (
                <div className="inline-flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded-full font-semibold text-sm shadow">
                    <CheckCircleIcon className="w-5 h-5" />
                    <span>متوفر الآن</span>
                </div>
            );
        case 'busy':
            return (
                <div className="inline-flex flex-col items-center gap-1">
                    <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-3 py-1 rounded-full font-semibold text-sm shadow">
                        <ClockIcon className="w-5 h-5" />
                        <span>مشغول حالياً</span>
                    </div>
                    {waitTime && <span className="text-xs text-gray-500 mt-1">متاح خلال {waitTime} دقيقة</span>}
                </div>
            );
        case 'offline':
            return (
                <div className="inline-flex items-center gap-2 bg-gray-500 text-white px-3 py-1 rounded-full font-semibold text-sm shadow">
                    <XCircleIcon className="w-5 h-5" />
                    <span>غير متصل</span>
                </div>
            );
        default:
            return null;
    }
};


const NurseProfileScreen: React.FC<NurseProfileScreenProps> = ({ nurseId, onBack, onRequestService }) => {
    const [nurse, setNurse] = useState<DetailedNurse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            const foundNurse = mockNurseProfiles.find(n => n.id === nurseId);
            setNurse(foundNurse || null);
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [nurseId]);

    const renderActionButton = () => {
        if (!nurse) return null;

        let buttonText: string;
        let buttonClasses: string;
        let isDisabled = false;
        let action = () => onRequestService(nurse.id);

        switch (nurse.availability) {
            case 'available':
                buttonText = 'اطلب خدمة الآن';
                buttonClasses = 'bg-cyan-500 hover:bg-cyan-600';
                break;
            case 'busy':
                buttonText = 'حجز موعد';
                buttonClasses = 'bg-blue-500 hover:bg-blue-600';
                break;
            case 'offline':
            default:
                buttonText = 'غير متاح';
                buttonClasses = 'bg-gray-400 cursor-not-allowed';
                isDisabled = true;
                action = () => {};
                break;
        }

        return (
             <button
                onClick={action}
                disabled={isDisabled}
                className={`w-full text-white py-3 rounded-lg font-bold text-lg shadow-md transition ${buttonClasses}`}
            >
                {buttonText}
            </button>
        );
    };

    if (loading) {
        return (
            <div className="flex flex-col h-full bg-white">
                 <div className="p-4 flex items-center border-b">
                     <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100"><ArrowRightIcon className="w-6 h-6 text-gray-600" /></button>
                     <h1 className="text-xl font-bold text-gray-800 mx-auto">ملف الممرض</h1>
                </div>
                <LoadingSpinner />
            </div>
        );
    }

    if (!nurse) {
        return (
            <div className="flex flex-col h-full bg-white">
                <div className="p-4 flex items-center border-b">
                    <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100"><ArrowRightIcon className="w-6 h-6 text-gray-600" /></button>
                    <h1 className="text-xl font-bold text-gray-800 mx-auto">خطأ</h1>
                </div>
                <div className="p-8 text-center text-red-500">لم يتم العثور على ملف الممرض.</div>
            </div>
        );
    }
    
    return (
        <div className="flex flex-col h-full bg-gray-50">
             <div className="p-4 flex items-center border-b bg-white sticky top-0 z-10">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100">
                    <ArrowRightIcon className="w-6 h-6 text-gray-600" />
                </button>
                <h1 className="text-xl font-bold text-gray-800 mx-auto">ملف الممرض</h1>
            </div>

            <div className="flex-grow overflow-y-auto">
                {/* Profile Header */}
                <div className="bg-white p-4 pb-6 text-center shadow-sm">
                    <img src={nurse.img} alt={nurse.name} className="w-24 h-24 rounded-full mx-auto mb-3 border-4 border-white shadow-lg" />
                    <h2 className="text-2xl font-bold text-gray-800">{nurse.name}</h2>
                    <p className="text-cyan-600 font-semibold mb-3">{nurse.specialty}</p>
                    <AvailabilityBadge status={nurse.availability} waitTime={nurse.waitTime} />
                    <div className="flex justify-center items-center gap-2 mt-4">
                        <StarIcon className="w-5 h-5 text-yellow-400" />
                        <span className="font-bold text-gray-700">{nurse.rating}</span>
                        <span className="text-sm text-gray-400">({nurse.reviewsCount} تقييم)</span>
                    </div>
                </div>
                
                {/* Main Content */}
                <div className="p-4 md:p-6 md:grid md:grid-cols-2 md:gap-6 space-y-4 md:space-y-0">
                    <div className="bg-white p-4 rounded-lg shadow-sm border md:col-span-2">
                        <h3 className="font-bold text-lg text-gray-800 mb-2">نبذة عني</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{nurse.bio}</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <h3 className="font-bold text-lg text-gray-800 mb-3">الخدمات المقدمة</h3>
                        <div className="space-y-3">
                            {nurse.services.map(service => (
                                <div key={service} className="flex items-center gap-3 p-2 bg-gray-50 rounded-md">
                                    <div className="w-8 h-8 flex items-center justify-center bg-cyan-100 text-cyan-600 rounded-full">
                                        <CheckCircleIcon className="w-5 h-5"/>
                                    </div>
                                    <span className="text-gray-700 font-medium">{service}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <h3 className="font-bold text-lg text-gray-800 mb-3">التقييمات</h3>
                        <div className="space-y-4">
                            {nurse.reviews.map((review, index) => (
                                <div key={index} className="border-b pb-3 last:border-b-0">
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-semibold text-gray-800">{review.reviewer}</h4>
                                        <div className="flex items-center">
                                            {[...Array(review.rating)].map((_, i) => <StarIcon key={i} className="w-4 h-4 text-yellow-400" />)}
                                            {[...Array(5 - review.rating)].map((_, i) => <StarIcon key={i} className="w-4 h-4 text-gray-300" />)}
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-white border-t sticky bottom-0">
                {renderActionButton()}
            </div>
        </div>
    );
};

export default NurseProfileScreen;
