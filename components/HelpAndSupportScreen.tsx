import React, { useState } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

interface HelpAndSupportScreenProps {
    onBack: () => void;
}

const faqs = [
    {
        question: "كيف يمكنني حجز خدمة؟",
        answer: "يمكنك حجز خدمة بسهولة من خلال تصفح الخدمات في الشاشة الرئيسية أو قسم 'الخدمات'، اختيار الخدمة المطلوبة، ثم اتباع خطوات تأكيد الحجز."
    },
    {
        question: "هل يمكنني اختيار ممرض معين؟",
        answer: "نعم، أثناء تأكيد الحجز، يمكنك اختيار ممرض محدد من قائمة الممرضين المتاحين، أو يمكنك اختيار 'التعيين التلقائي' وسنقوم باختيار أفضل ممرض لك."
    },
    {
        question: "كيف يمكنني إلغاء طلبي؟",
        answer: "يمكنك إلغاء طلبك من خلال الذهاب إلى شاشة 'الطلبات'، اختيار الطلب الذي ترغب في إلغائه، والضغط على زر 'إلغاء الطلب' الموجود في تفاصيل الطلب."
    },
    {
        question: "هل معلوماتي وبياناتي آمنة؟",
        answer: "نعم، نحن نأخذ خصوصية وأمان بياناتك على محمل الجد. جميع بياناتك مشفرة ومحمية وفقًا لأعلى معايير الأمان."
    }
];

const FaqItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-right py-4">
                <span className="font-semibold text-gray-800">{q}</span>
                <ChevronDownIcon className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="pb-4 pr-2 text-gray-600 text-sm">
                    {a}
                </div>
            )}
        </div>
    );
}

const HelpAndSupportScreen: React.FC<HelpAndSupportScreenProps> = ({ onBack }) => {
    return (
        <div className="flex flex-col h-full bg-gray-50">
            <div className="p-4 flex items-center border-b bg-white sticky top-0 z-10">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100">
                    <ArrowRightIcon className="w-6 h-6 text-gray-600" />
                </button>
                <h1 className="text-xl font-bold text-gray-800 mx-auto">المساعدة والدعم</h1>
            </div>

            <div className="flex-grow overflow-y-auto p-4 space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <h2 className="text-lg font-bold text-gray-800 mb-2">الأسئلة الشائعة</h2>
                    <div>
                        {faqs.map((faq, index) => <FaqItem key={index} q={faq.question} a={faq.answer} />)}
                    </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
                     <h2 className="text-lg font-bold text-gray-800 mb-2">هل تحتاج للمزيد من المساعدة؟</h2>
                     <p className="text-sm text-gray-600 mb-4">تواصل معنا مباشرة عبر القنوات التالية:</p>
                     <div className="space-y-2">
                        <a href="tel:9200XXXXX" className="block font-semibold text-cyan-600">اتصل بنا: 967 775258830</a>
                        <a href="mailto:support@nabdhjwar.com" className="block font-semibold text-cyan-600">البريد الإلكتروني: support@nabdhjwar.com</a>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default HelpAndSupportScreen;