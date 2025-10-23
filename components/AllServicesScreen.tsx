import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
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

const serviceCategories = [...new Set(allServicesData.map(s => s.category))];

interface AllServicesScreenProps {
    onServiceSelect: (serviceId: string) => void;
}

const AllServicesScreen: React.FC<AllServicesScreenProps> = ({ onServiceSelect }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredServices = allServicesData.filter(service => 
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const groupedServices = serviceCategories.map(category => ({
        category,
        services: filteredServices.filter(s => s.category === category)
    })).filter(group => group.services.length > 0);

    return (
        <div className="flex flex-col h-full bg-gray-50">
            <div className="p-4 sticky top-0 bg-gray-50 z-10 border-b">
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="ابحث عن خدمة..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-100 border border-transparent rounded-full pl-12 pr-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white transition"
                    />
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                </div>
            </div>

            <div className="flex-grow overflow-y-auto p-4 md:p-6">
                {groupedServices.length > 0 ? (
                    <div className="space-y-6 md:space-y-8">
                        {groupedServices.map(group => (
                            <div key={group.category}>
                                <h2 className="text-lg font-bold text-gray-800 mb-3">{group.category}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
                                    {group.services.map(service => (
                                        <button 
                                            key={service.id} 
                                            onClick={() => onServiceSelect(service.id)}
                                            className="w-full text-right bg-white p-4 rounded-lg shadow-sm border flex items-center gap-4 hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                        >
                                            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-cyan-100 text-cyan-600 rounded-lg">
                                                {service.icon}
                                            </div>
                                            <div className="flex-grow">
                                                <h3 className="font-semibold text-gray-800">{service.name}</h3>
                                                <p className="text-sm text-gray-500">{service.description}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 pt-8">لا توجد خدمات تطابق بحثك.</p>
                )}
            </div>
        </div>
    );
};

export default AllServicesScreen;