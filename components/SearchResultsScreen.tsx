import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import { Nurse, Service } from '../types';
import { HeartIcon, StethoscopeIcon, BeakerIcon, LanguageIcon } from './icons';

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
    { id: 1, name: 'وليد بن قبوس ', img: '/1.png', rating: 4.9, specialty: 'خدمات التمريض العامة', experience: 7, availability: 'available', languages: ['العربية', 'الإنجليزية'] },
    { id: 2, name: 'نورة محمد', img: 'https://picsum.photos/seed/nurse2/100/100', rating: 4.8, specialty: 'رعاية أمراض مزمنة', experience: 5, availability: 'busy', languages: ['العربية'] },
    { id: 3, name: 'سارة عبدالله', img: 'https://picsum.photos/seed/nurse3/100/100', rating: 4.7, specialty: 'العناية بالجروح', experience: 6, availability: 'available', languages: ['العربية'] },
    { id: 4, name: 'خالد الغامدي', img: 'https://picsum.photos/seed/nurse4/100/100', rating: 4.9, specialty: 'رعاية كبار السن', experience: 10, availability: 'offline', languages: ['العربية', 'الإنجليزية'] },
    { id: 5, name: 'فاطمة الزهراني', img: 'https://picsum.photos/seed/nurse5/100/100', rating: 4.6, specialty: 'رعاية أطفال', experience: 4, availability: 'busy', languages: ['العربية'] },
];

interface SearchResultsScreenProps {
    query: string;
    onBack: () => void;
    onViewProfile: (nurseId: number) => void;
    onServiceSelect: (serviceId: string) => void;
}

const SearchResultsScreen: React.FC<SearchResultsScreenProps> = ({ query, onBack, onViewProfile, onServiceSelect }) => {
    
    const fuzzyMatch = (query: string, text: string): boolean => {
        const searchQuery = query.toLowerCase().replace(/\s/g, '');
        const targetText = text.toLowerCase();
        let queryIndex = 0;
        for (let i = 0; i < targetText.length && queryIndex < searchQuery.length; i++) {
            if (targetText[i] === searchQuery[queryIndex]) {
                queryIndex++;
            }
        }
        return queryIndex === searchQuery.length;
    };

    const filteredNurses = mockNurses.filter(nurse => 
        fuzzyMatch(query, nurse.name) ||
        fuzzyMatch(query, nurse.specialty)
    );

    const filteredServices = allServicesData.filter(service => 
        fuzzyMatch(query, service.name) ||
        fuzzyMatch(query, service.description) ||
        fuzzyMatch(query, service.category)
    );

    const hasResults = filteredNurses.length > 0 || filteredServices.length > 0;

    return (
        <div className="flex flex-col h-full bg-gray-50">
            <div className="p-4 flex items-center border-b bg-white sticky top-0 z-10">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100">
                    <ArrowRightIcon className="w-6 h-6 text-gray-600" />
                </button>
                <h1 className="text-xl font-bold text-gray-800 mx-auto">نتائج البحث عن "{query}"</h1>
            </div>

            <div className="flex-grow overflow-y-auto p-4 space-y-6">
                {!hasResults && (
                    <div className="text-center py-16">
                        <p className="text-gray-500">لا توجد نتائج بحث تطابق "{query}".</p>
                        <p className="text-sm text-gray-400 mt-2">حاول استخدام كلمات بحث مختلفة.</p>
                    </div>
                )}

                {filteredNurses.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold text-gray-800 mb-3">الممرضين</h2>
                        <div className="space-y-3">
                            {filteredNurses.map(nurse => (
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
                            ))}
                        </div>
                    </section>
                )}

                {filteredServices.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold text-gray-800 mb-3">الخدمات</h2>
                        <div className="space-y-3">
                            {filteredServices.map(service => (
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
                    </section>
                )}
            </div>
        </div>
    );
};

export default SearchResultsScreen;