import React, { useState, useEffect } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import LoadingSpinner from './LoadingSpinner';
import { HeartIcon, StethoscopeIcon, BeakerIcon } from './icons';
import { Service } from '../types';

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


interface ServiceDetailScreenProps {
    serviceId: string;
    onBack: () => void;
    onRequestBooking: (serviceId: string) => void;
    isGuest: boolean;
}

const ServiceDetailScreen: React.FC<ServiceDetailScreenProps> = ({ serviceId, onBack, onRequestBooking, isGuest }) => {
    const [service, setService] = useState<Service | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            const foundService = allServicesData.find(s => s.id === serviceId);
            setService(foundService || null);
            setLoading(false);
        }, 300);
        return () => clearTimeout(timer);
    }, [serviceId]);

    if (loading) {
        return (
            <div className="flex flex-col h-full bg-white">
                 <div className="p-4 flex items-center border-b">
                     <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100"><ArrowRightIcon className="w-6 h-6 text-gray-600" /></button>
                     <h1 className="text-xl font-bold text-gray-800 mx-auto">تفاصيل الخدمة</h1>
                </div>
                <LoadingSpinner />
            </div>
        );
    }

    if (!service) {
        return (
            <div className="flex flex-col h-full bg-white">
                <div className="p-4 flex items-center border-b">
                    <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100"><ArrowRightIcon className="w-6 h-6 text-gray-600" /></button>
                    <h1 className="text-xl font-bold text-gray-800 mx-auto">خطأ</h1>
                </div>
                <div className="p-8 text-center text-red-500">لم يتم العثور على الخدمة المطلوبة.</div>
            </div>
        );
    }
    
    return (
        <div className="flex flex-col h-full bg-gray-50">
            <div className="p-4 flex items-center border-b bg-white sticky top-0 z-10">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100">
                    <ArrowRightIcon className="w-6 h-6 text-gray-600" />
                </button>
                <h1 className="text-xl font-bold text-gray-800 mx-auto">{service.name}</h1>
            </div>

            <div className="flex-grow overflow-y-auto">
                <div className="bg-white p-6 text-center shadow-sm">
                    <div className="w-20 h-20 flex items-center justify-center bg-cyan-100 text-cyan-600 rounded-full mx-auto mb-4">
                        {React.isValidElement(service.icon) ? React.cloneElement<any>(service.icon, { className: 'w-10 h-10' }) : service.icon}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">{service.name}</h2>
                    <p className="text-gray-500">{service.category}</p>
                </div>

                <div className="p-4 md:p-6 space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm border md:col-span-2">
                        <h3 className="font-bold text-lg text-gray-800 mb-2">وصف الخدمة</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{service.longDescription}</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <h3 className="font-bold text-lg text-gray-800 mb-3">متطلبات الخدمة</h3>
                        <ul className="space-y-2 list-disc list-inside text-sm text-gray-700">
                            {service.requirements.map((req, index) => (
                                <li key={index}>{req}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold text-lg text-gray-800">متوسط السعر</h3>
                            <span className="font-bold text-lg text-cyan-600">{service.priceRange}</span>
                        </div>
                         <p className="text-xs text-gray-400 mt-1">قد يختلف السعر بناءً على خبرة الممرض والمدينة.</p>
                    </div>
                </div>
            </div>
            
            <div className="p-4 bg-white border-t sticky bottom-0">
                <button 
                    onClick={() => onRequestBooking(service.id)}
                    className="w-full bg-cyan-500 text-white py-3 rounded-lg font-bold text-lg shadow-md hover:bg-cyan-600 transition"
                >
                    {isGuest ? 'تسجيل الدخول للطلب' : 'طلب هذه الخدمة'}
                </button>
            </div>
        </div>
    );
};

export default ServiceDetailScreen;