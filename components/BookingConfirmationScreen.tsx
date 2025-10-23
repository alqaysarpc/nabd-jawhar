import React, { useState, useEffect } from 'react';
import { ArrowRightIcon, UserGroupIcon, CalendarDaysIcon, UserIcon as HeroUserIcon, PhoneIcon as HeroPhoneIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import LoadingSpinner from './LoadingSpinner';
import { HeartIcon, StethoscopeIcon, BeakerIcon, MapPinIcon, ClockIcon, SparklesIcon, CheckCircleIcon, UsersIcon } from './icons';
import { Nurse, Service, BookingConfirmationDetails } from '../types';


const allServicesData: Service[] = [
    // General Nursing
    { id: 'gen-injection', name: 'إعطاء حقنة (ضرب إبرة)', description: 'إعطاء الحقن العضلية أو الوريدية حسب الوصفة الطبية.', icon: <span className="text-2xl">💉</span>, category: 'خدمات التمريض العامة', longDescription: 'خدمة آمنة واحترافية لإعطاء الحقن بأنواعها (عضل، وريد، تحت الجلد) بناءً على وصفة طبية. السعر الموضح لكل حقنة.', priceRange: '1,000 ﷼', requirements: ['وصفة طبية حديثة', 'توفر الدواء المطلوب'] },
    { id: 'gen-vitals', name: 'قياس ضغط الدم', description: 'قياس دقيق لضغط الدم وتقديم قراءة ومتابعة.', icon: <HeartIcon className="w-6 h-6" />, category: 'خدمات التمريض العامة', longDescription: 'فحص دقيق لضغط الدم باستخدام جهاز إلكتروني أو زئبقي، مع تسجيل القراءة وتقديم إرشادات أولية للمريض. السعر لكل زيارة.', priceRange: '800 ﷼', requirements: ['مكان هادئ ومريح للمريض'] },
    { id: 'gen-glucose', name: 'قياس السكر', description: 'قياس مستوى السكر في الدم وتقديم إرشادات.', icon: <span className="text-2xl">🩸</span>, category: 'خدمات التمريض العامة', longDescription: 'فحص سريع ودقيق لمستوى الجلوكوز في الدم باستخدام أحدث الأجهزة. يتم تقديم إرشادات أولية بناءً على القراءة. السعر لكل زيارة.', priceRange: '800 ﷼', requirements: ['يفضل أن يكون المريض صائماً أو حسب تعليمات الطبيب'] },
    { id: 'gen-wound', name: 'العناية بالجروح', description: 'تنظيف وتضميد وتغيير على الجروح المختلفة.', icon: <span className="text-2xl">🩹</span>, category: 'خدمات التمريض العامة', longDescription: 'خدمة متخصصة للعناية بالجروح الحادة والمزمنة. يشمل السعر تنظيف وتضميد الجروح (1200 ﷼) وقد يصل إلى 1500 ﷼ لتغيير جرح معقد حسب حجمه.', priceRange: '1,200 - 1,500 ﷼', requirements: ['تقييم مبدئي لنوع الجرح', 'توفير المواد والضمادات الموصوفة'] },
    
    // Specialized Care
    { id: 'spec-postop', name: 'رعاية ما بعد العمليات', description: 'متابعة الحالة بعد الجراحة. (2-6 ساعات)', icon: <span className="text-2xl">🏨</span>, category: 'الرعاية المتخصصة', longDescription: 'متابعة دقيقة للمريض في فترة النقاهة بعد العمليات الجراحية، وتشمل العناية بالجرح، إدارة الألم، والمساعدة على الحركة. المدة النموذجية من 2-6 ساعات. السعر يعتمد على حالة المريض.', priceRange: '1,500 ﷼ / ساعة', requirements: ['تقرير طبي عن العملية', 'تعليمات الخروج من المستشفى'] },
    { id: 'spec-chronic', name: 'رعاية أمراض مزمنة', description: 'متابعة حالات السكري والضغط والقلب. (3-8 ساعات)', icon: <HeartIcon className="w-6 h-6 text-red-500" />, category: 'الرعاية المتخصصة', longDescription: 'برامج متابعة دورية للمرضى الذين يعانون من أمراض مزمنة (مثل السكري، الضغط، القلب)، تهدف إلى التحكم في الحالة ومنع المضاعفات. المدة النموذجية من 3-8 ساعات.', priceRange: '1,200 ﷼ / ساعة', requirements: ['خطة علاجية من الطبيب المعالج', 'سجل قراءات حديث'] },
    { id: 'spec-dialysis', name: 'تصفية دورية (غسيل كلوي)', description: 'مراقبة ومتابعة أثناء جلسات غسيل الكلى. (4-6 ساعات)', icon: <BeakerIcon className="w-6 h-6" />, category: 'الرعاية المتخصصة', longDescription: 'خدمة مرافقة ومراقبة للمرضى أثناء جلسات غسيل الكلى المنزلية أو في المركز، تشمل المراقبة والمتابعة الدقيقة. المدة النموذجية من 4-6 ساعات.', priceRange: '2,000 ﷼ / ساعة', requirements: ['تقرير طبي بالحالة', 'جدول مواعيد الجلسات'] },
    { id: 'spec-elderly', name: 'رعاية كبار السن', description: 'تشمل النظافة والمرافقة. (حسب الطلب)', icon: <span className="text-2xl">👵</span>, category: 'الرعاية المتخصصة', longDescription: 'نوفر رعاية شاملة ومخصصة لكبار السن في منازلهم، تشمل المساعدة في النظافة الشخصية، تناول الأدوية، المساعدة على الحركة، والمرافقة. المدة حسب الطلب.', priceRange: '1,000 ﷼ / ساعة', requirements: ['تقييم أولي للحالة', 'خطة رعاية واضحة'] },
    { id: 'spec-maternity', name: 'رعاية حالات الولادة', description: 'رعاية للأم قبل وبعد الولادة. (6-12 ساعة)', icon: <span className="text-2xl">🤱</span>, category: 'الرعاية المتخصصة', longDescription: 'تقديم الدعم والرعاية للأم في فترة ما قبل وما بعد الولادة، بما في ذلك المساعدة في العناية بالمولود الجديد ومتابعة صحة الأم. المدة النموذجية من 6-12 ساعة.', priceRange: '2,500 ﷼ / ساعة', requirements: ['تعليمات الطبيب أو المستشفى', 'معلومات عن صحة الأم والمولود'] },
    { id: 'spec-escort', name: 'مرافقة طبية للمستشفى', description: 'يشمل التنقل والمرافقة للمواعيد. (حسب الطلب)', icon: <span className="text-2xl">🚑</span>, category: 'الرعاية المتخصصة', longDescription: 'مرافقة المريض من وإلى المستشفى للمواعيد أو الفحوصات، مع تقديم الدعم اللازم أثناء الانتظار والتنقل. المدة حسب الطلب.', priceRange: '1,000 ﷼ / ساعة', requirements: ['معلومات الموعد الطبي', 'تقارير طبية سابقة إذا لزم الأمر'] },

    // Advanced Services
    { id: 'adv-iv', name: 'إعطاء محلول وريدي', description: 'تركيب ومتابعة المحاليل الوريدية الموصوفة.', icon: <StethoscopeIcon className="w-6 h-6" />, category: 'الخدمات المتقدمة', longDescription: 'تركيب الكانيولا وإعطاء المحاليل الوريدية والأدوية التي تتطلب التسريب الوريدي. السعر لكل كيس محلول.', priceRange: '2,000 ﷼', requirements: ['وصفة طبية بالنوع والكمية', 'توفر المحلول والدواء'] },
    { id: 'adv-catheter', name: 'تركيب قسطرة بولية', description: 'تركيب وتغيير القسطرة البولية بأنواعها.', icon: <StethoscopeIcon className="w-6 h-6" />, category: 'الخدمات المتقدمة', longDescription: 'خدمة تركيب أو استبدال القسطرة البولية للمرضى الذين يحتاجونها، مع اتباع إجراءات التعقيم الصارمة. السعر يشمل الأدوات الأساسية.', priceRange: '2,500 ﷼', requirements: ['طلب طبي', 'توفر القسطرة المناسبة'] },
    { id: 'adv-catheter-remove', name: 'إزالة قسطرة بولية', description: 'إزالة القسطرة البولية بأمان وسهولة.', icon: <StethoscopeIcon className="w-6 h-6" />, category: 'الخدمات المتقدمة', longDescription: 'خدمة لإزالة القسطرة البولية بأمان وسهولة من قبل ممرض مختص، مع التأكد من راحة المريض.', priceRange: '1,000 ﷼', requirements: ['طلب طبي أو موعد متابعة'] },
    { id: 'adv-cannula', name: 'تركيب كانيولا', description: 'تركيب إبرة وريدية (كانيولا).', icon: <StethoscopeIcon className="w-6 h-6" />, category: 'الخدمات المتقدمة', longDescription: 'تركيب إبرة وريدية (كانيولا) بشكل آمن واحترافي للبدء في إعطاء المحاليل أو الأدوية الوريدية.', priceRange: '1,000 ﷼', requirements: ['طلب طبي'] },
    { id: 'adv-sample', name: 'سحب عينات مخبرية', description: 'سحب عينات الدم والبول لإجراء التحاليل اللازمة.', icon: <BeakerIcon className="w-6 h-6" />, category: 'الخدمات المتقدمة', longDescription: 'سحب عينات الدم من الوريد أو عينات أخرى حسب طلب الطبيب، وتجهيزها لإرسالها إلى المختبر. الخدمة توفر عناء الذهاب إلى المختبر خاصة لكبار السن وغير القادرين على الحركة.', priceRange: '5,000 - 8,000 ﷼', requirements: ['طلب التحليل من الطبيب', 'الالتزام بشروط الصيام إذا لزم الأمر'] },
];

const mockNurses: Nurse[] = [
    { id: 1, name: 'أحمد خالد', img: 'https://picsum.photos/seed/nurse1/100/100', rating: 4.9, specialty: 'خدمات التمريض العامة', experience: 7, availability: 'available', languages: ['العربية', 'الإنجليزية'], arrivalTime: 25 },
    { id: 2, name: 'نورة محمد', img: 'https://picsum.photos/seed/nurse2/100/100', rating: 4.8, specialty: 'رعاية أمراض مزمنة', experience: 5, availability: 'busy', languages: ['العربية'], arrivalTime: 45 },
    { id: 3, name: 'سارة عبدالله', img: 'https://picsum.photos/seed/nurse3/100/100', rating: 4.7, specialty: 'العناية بالجروح', experience: 6, availability: 'available', languages: ['العربية'], arrivalTime: 15 },
    { id: 4, name: 'خالد الغامدي', img: 'https://picsum.photos/seed/nurse4/100/100', rating: 4.9, specialty: 'رعاية كبار السن', experience: 10, availability: 'offline', languages: ['العربية', 'الإنجليزية'], arrivalTime: 0 },
    { id: 5, name: 'فاطمة الزهراني', img: 'https://picsum.photos/seed/nurse5/100/100', rating: 4.6, specialty: 'رعاية أطفال', experience: 4, availability: 'available', languages: ['العربية'], arrivalTime: 35 },
];

interface BookingConfirmationScreenProps {
    serviceId: string;
    preselectedNurseId?: number | null;
    onBack: () => void;
    onConfirm: (details: BookingConfirmationDetails) => void;
    userAddress: string;
}

const InfoRow = ({ label, value, valueClass = 'text-gray-800' }: {label: string, value: React.ReactNode, valueClass?: string}) => (
    <li className="flex justify-between items-center py-2">
        <span className="text-gray-500">{label}</span>
        <span className={`font-semibold text-right ${valueClass}`}>{value}</span>
    </li>
);

const BookingConfirmationScreen: React.FC<BookingConfirmationScreenProps> = ({ serviceId, preselectedNurseId, onBack, onConfirm, userAddress }) => {
    const [service, setService] = useState<Service | null>(null);
    const [loading, setLoading] = useState(true);
    const [bookingDate, setBookingDate] = useState('');
    const [bookingTime, setBookingTime] = useState('');
    const [availableNurses, setAvailableNurses] = useState<Nurse[]>([]);
    const [selectedNurseId, setSelectedNurseId] = useState<number | 'auto'>('auto');
    const [patientCount, setPatientCount] = useState(1);
    const [bookingHours, setBookingHours] = useState(2);
    const [notes, setNotes] = useState('');
    const [bookingFor, setBookingFor] = useState<'self' | 'other'>('self');
    const [recipientDetails, setRecipientDetails] = useState({ name: '', phone: '', relation: '', address: '' });


    useEffect(() => {
        setLoading(true);
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        setBookingDate(`${yyyy}-${mm}-${dd}`);

        const hh = String(today.getHours()).padStart(2, '0');
        const min = String(today.getMinutes()).padStart(2, '0');
        setBookingTime(`${hh}:${min}`);
        
        if (preselectedNurseId) {
            setSelectedNurseId(preselectedNurseId);
        } else {
            setSelectedNurseId('auto');
        }

        const foundService = allServicesData.find(s => s.id === serviceId);
        setService(foundService || null);
        
        if (foundService) {
            const filteredNurses = mockNurses.filter(nurse => nurse.availability === 'available');
            setAvailableNurses(filteredNurses);
        } else {
            setAvailableNurses([]);
        }

        setLoading(false);
    }, [serviceId, preselectedNurseId]);

    const handleRecipientDetailChange = (field: keyof typeof recipientDetails, value: string) => {
        setRecipientDetails(prev => ({ ...prev, [field]: value }));
    };

    const isHourlyService = service?.priceRange.includes('/ ساعة');
    const servicePrice = parseInt(service?.priceRange.split(' ')[0].replace(/,/g, '') || '1000');

    // Calculate distance and transportation cost
    let distanceInKm: number;
    let selectedNurseForCalc: Nurse | undefined;

    if (selectedNurseId === 'auto') {
        // For auto-assign, find the available nurse with the shortest arrival time
        selectedNurseForCalc = [...availableNurses].sort((a, b) => (a.arrivalTime || 999) - (b.arrivalTime || 999))[0];
    } else {
        selectedNurseForCalc = mockNurses.find(n => n.id === selectedNurseId);
    }
    
    // Assuming average speed of 30 km/h (0.5 km/minute) to estimate distance from ETA
    distanceInKm = selectedNurseForCalc?.arrivalTime ? selectedNurseForCalc.arrivalTime * 0.5 : 5; // Default distance 5km if no nurse/ETA
    const transportationCost = Math.round(distanceInKm * 1000);

    const serviceSubtotal = isHourlyService
        ? servicePrice * bookingHours * patientCount
        : servicePrice * patientCount;
    
    const totalCost = serviceSubtotal + transportationCost;

    const handleConfirmClick = () => {
        if (!bookingDate || !bookingTime) {
            alert('الرجاء تحديد التاريخ والوقت');
            return;
        }
        if (bookingFor === 'other') {
            const { name, phone, relation, address } = recipientDetails;
            if (!name || !phone || !relation || !address) {
                alert('الرجاء إكمال جميع بيانات المستفيد.');
                return;
            }
        }
        if (!service) return;

        const selectionType = selectedNurseId === 'auto' ? 'auto' : 'manual';
        onConfirm({
            selectionType,
            service,
            patientCount,
            totalCost,
            date: bookingDate,
            time: bookingTime,
            notes,
            bookingFor,
            recipientDetails: bookingFor === 'other' ? recipientDetails : undefined,
            hours: isHourlyService ? bookingHours : undefined,
        });
    };
    
    const preselectedNurse = preselectedNurseId ? mockNurses.find(n => n.id === preselectedNurseId) : null;

    if (loading) {
        return (
             <div className="flex flex-col h-full bg-white">
                <div className="p-4 flex items-center border-b"><button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100"><ArrowRightIcon className="w-6 h-6 text-gray-600" /></button><h1 className="text-xl font-bold text-gray-800 mx-auto">تأكيد الحجز</h1></div>
                <LoadingSpinner />
            </div>
        );
    }

    if (!service) {
        return <div className="p-8 text-center text-red-500">لم يتم العثور على الخدمة.</div>;
    }

    return (
        <div className="flex flex-col h-full bg-gray-50">
            <div className="p-4 flex items-center border-b bg-white sticky top-0 z-10">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100"><ArrowRightIcon className="w-6 h-6 text-gray-600" /></button>
                <h1 className="text-xl font-bold text-gray-800 mx-auto">تأكيد الحجز</h1>
            </div>

            <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-5 lg:gap-6 lg:items-start">
                {/* Left Column */}
                <div className="space-y-4 lg:col-span-2">
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <h3 className="font-bold text-lg text-gray-800 mb-3">لمن هذه الخدمة؟</h3>
                        <div className="flex rounded-full bg-gray-100 p-1">
                            <button onClick={() => setBookingFor('self')} className={`w-full py-2 rounded-full font-semibold transition-colors ${bookingFor === 'self' ? 'bg-white text-cyan-600 shadow' : 'text-gray-500'}`}>لنفسي</button>
                            <button onClick={() => setBookingFor('other')} className={`w-full py-2 rounded-full font-semibold transition-colors ${bookingFor === 'other' ? 'bg-white text-cyan-600 shadow' : 'text-gray-500'}`}>لشخص آخر</button>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border flex items-center gap-4">
                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-cyan-100 text-cyan-600 rounded-lg">
                            {service.icon}
                        </div>
                        <div className="flex-grow">
                            <h3 className="font-semibold text-gray-800">{service.name}</h3>
                            <p className="text-sm text-gray-500">{service.category}</p>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <h3 className="font-bold text-lg text-gray-800 mb-3">تحديد الموعد</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                                <input type="date" value={bookingDate} onChange={e => setBookingDate(e.target.value)} className="w-full bg-gray-50 border-gray-300 rounded-lg p-2 pr-10 text-sm focus:ring-cyan-500 focus:border-cyan-500" />
                                <CalendarDaysIcon className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            </div>
                            <div className="relative">
                                <input type="time" value={bookingTime} onChange={e => setBookingTime(e.target.value)} className="w-full bg-gray-50 border-gray-300 rounded-lg p-2 pr-10 text-sm focus:ring-cyan-500 focus:border-cyan-500" />
                                <ClockIcon className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <h3 className="font-bold text-lg text-gray-800 mb-3">عدد المرضى</h3>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <UserGroupIcon className="w-6 h-6 text-cyan-600"/>
                                <span className="font-semibold text-gray-700">كم شخص سيحصل على الخدمة؟</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <button onClick={() => setPatientCount(p => Math.max(1, p - 1))} disabled={patientCount <= 1} className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full font-bold text-lg disabled:opacity-50" aria-label="Decrease patient count">-</button>
                                <span className="font-bold text-lg w-8 text-center" aria-live="polite">{patientCount}</span>
                                <button onClick={() => setPatientCount(p => p + 1)} className="w-8 h-8 flex items-center justify-center bg-cyan-500 text-white rounded-full font-bold text-lg" aria-label="Increase patient count">+</button>
                            </div>
                        </div>
                    </div>

                    {isHourlyService && (
                        <div className="bg-white p-4 rounded-lg shadow-sm border">
                            <h3 className="font-bold text-lg text-gray-800 mb-3">مدة الخدمة</h3>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <ClockIcon className="w-6 h-6 text-cyan-600"/>
                                    <span className="font-semibold text-gray-700">عدد الساعات المطلوبة</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button onClick={() => setBookingHours(h => Math.max(1, h - 1))} disabled={bookingHours <= 1} className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full font-bold text-lg disabled:opacity-50" aria-label="Decrease hours">-</button>
                                    <span className="font-bold text-lg w-8 text-center" aria-live="polite">{bookingHours}</span>
                                    <button onClick={() => setBookingHours(h => h + 1)} className="w-8 h-8 flex items-center justify-center bg-cyan-500 text-white rounded-full font-bold text-lg" aria-label="Increase hours">+</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column */}
                <div className="space-y-4 lg:col-span-3">
                    {bookingFor === 'other' && (
                        <div className="bg-white p-4 rounded-lg shadow-sm border space-y-3">
                            <h3 className="font-bold text-lg text-gray-800">بيانات المستفيد</h3>
                            <div className="relative"><HeroUserIcon className="absolute top-1/2 -translate-y-1/2 right-3 w-5 h-5 text-gray-400" /><input type="text" placeholder="الاسم الكامل للمستفيد" value={recipientDetails.name} onChange={e => handleRecipientDetailChange('name', e.target.value)} className="w-full bg-gray-50 border-gray-300 rounded-lg p-2 pr-10 text-sm focus:ring-cyan-500 focus:border-cyan-500" /></div>
                            <div className="relative"><HeroPhoneIcon className="absolute top-1/2 -translate-y-1/2 right-3 w-5 h-5 text-gray-400" /><input type="tel" placeholder="رقم جوال المستفيد" value={recipientDetails.phone} onChange={e => handleRecipientDetailChange('phone', e.target.value)} className="w-full bg-gray-50 border-gray-300 rounded-lg p-2 pr-10 text-sm focus:ring-cyan-500 focus:border-cyan-500" /></div>
                            <div className="relative"><UsersIcon className="w-5 h-5 text-gray-400 absolute top-1/2 right-3 -translate-y-1/2" /><select value={recipientDetails.relation} onChange={e => handleRecipientDetailChange('relation', e.target.value)} className="w-full bg-gray-50 border-gray-300 rounded-lg p-2 pr-10 text-sm focus:ring-cyan-500 focus:border-cyan-500 appearance-none"><option value="" disabled>صلة القرابة</option><option>أب</option><option>أم</option><option>أخ/أخت</option><option>زوج/زوجة</option><option>ابن/ابنة</option><option>صديق/ة</option><option>آخر</option></select></div>
                            <div className="relative"><MapPinIcon className="w-5 h-5 text-gray-400 absolute top-3 right-3" /><textarea placeholder="عنوان المستفيد بالتفصيل" value={recipientDetails.address} onChange={e => handleRecipientDetailChange('address', e.target.value)} className="w-full bg-gray-50 border-gray-300 rounded-lg p-2 pr-10 text-sm focus:ring-cyan-500 focus:border-cyan-500 h-20" /></div>
                            <button onClick={() => handleRecipientDetailChange('address', userAddress)} className="text-sm font-semibold text-cyan-600 hover:underline">استخدام عنواني الحالي</button>
                        </div>
                    )}
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <h3 className="font-bold text-lg text-gray-800 mb-3">{preselectedNurse ? "الممرض/ة المحدد/ة" : "اختيار الممرض/ة"}</h3>
                        {preselectedNurse ? (
                             <div className="p-3 border-2 rounded-xl bg-cyan-50 border-cyan-500 flex items-center gap-4"><img src={preselectedNurse.img} alt={preselectedNurse.name} className="w-16 h-16 rounded-full border-2 border-white" /><div><h4 className="font-bold text-gray-800">{preselectedNurse.name}</h4><div className="flex items-center gap-1 mt-1"><StarIcon className="w-4 h-4 text-yellow-400" /><span className="text-sm font-bold text-gray-700">{preselectedNurse.rating}</span></div></div></div>
                        ) : (
                            <div className="grid grid-flow-col auto-cols-[10.5rem] md:grid-flow-row sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
                                <button onClick={() => setSelectedNurseId('auto')} className={`relative flex-shrink-0 w-40 text-center p-3 border-2 rounded-xl transition-all duration-200 ${selectedNurseId === 'auto' ? 'border-cyan-500 bg-cyan-50' : 'border-gray-200 bg-white'}`} aria-pressed={selectedNurseId==='auto'}><div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mx-auto mb-2"><SparklesIcon className="w-8 h-8 text-cyan-500" /></div><h4 className="font-bold text-gray-800 text-sm">التعيين التلقائي</h4><p className="text-xs text-gray-500 mt-1">سنختار لك أفضل ممرض متاح</p>{selectedNurseId === 'auto' && <div className="absolute top-2 left-2 bg-cyan-500 text-white rounded-full p-0.5"><CheckCircleIcon className="w-5 h-5" /></div>}</button>
                                {availableNurses.map(nurse => (<button key={nurse.id} onClick={() => setSelectedNurseId(nurse.id)} className={`relative flex-shrink-0 w-40 text-center p-3 border-2 rounded-xl transition-all duration-200 ${selectedNurseId === nurse.id ? 'border-cyan-500 bg-cyan-50' : 'border-gray-200 bg-white'}`} aria-pressed={selectedNurseId === nurse.id}><img src={nurse.img} alt={nurse.name} className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-gray-100" /><h4 className="font-bold text-gray-800 text-sm truncate">{nurse.name}</h4><div className="flex items-center justify-center gap-1 mt-1"><StarIcon className="w-4 h-4 text-yellow-400" /><span className="text-xs font-bold text-gray-700">{nurse.rating}</span></div>{selectedNurseId === nurse.id && <div className="absolute top-2 left-2 bg-cyan-500 text-white rounded-full p-0.5"><CheckCircleIcon className="w-5 h-5" /></div>}</button>))}
                            </div>
                        )}
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <h2 className="font-bold text-lg text-gray-800 mb-1">ملخص الدفع</h2>
                        <ul className="text-sm">
                             <InfoRow label="عنوان تقديم الخدمة" value={bookingFor === 'self' ? 'عنواني الحالي' : recipientDetails.address || 'لم يحدد'} />
                             {bookingFor === 'other' && recipientDetails.name && <InfoRow label="المستفيد" value={recipientDetails.name} />}
                             <InfoRow 
                                label={isHourlyService ? `تكلفة الخدمة (${bookingHours} س × ${patientCount})` : `تكلفة الخدمة (×${patientCount})`}
                                value={`${serviceSubtotal.toLocaleString('ar-SA')} ﷼`}
                             />
                             <InfoRow label={`تكاليف المواصلات (${distanceInKm.toFixed(1)} كم)`} value={`${transportationCost.toLocaleString('ar-SA')} ﷼`} />
                             <li className="flex justify-between items-center py-2 mt-2 border-t border-dashed"><span className="font-bold text-gray-800">الإجمالي المتوقع</span><span className="font-bold text-cyan-600 text-lg">{totalCost.toLocaleString('ar-SA')} ﷼</span></li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div className="p-4 bg-white border-t sticky bottom-0">
                <button onClick={handleConfirmClick} className="w-full bg-cyan-500 text-white py-3 rounded-lg font-bold text-lg shadow-md hover:bg-cyan-600 transition">
                    تأكيد الحجز
                </button>
            </div>
        </div>
    );
};

export default BookingConfirmationScreen;