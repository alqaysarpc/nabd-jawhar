import React, { useState } from 'react';
import { OnboardingIllustration1, OnboardingIllustration2, OnboardingIllustration3 } from './illustrations';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const onboardingContent = [
  {
    illustration: <OnboardingIllustration1 />,
    title: 'رعاية صحية موثوقة',
    text: 'أهلاً بك في نبض جوار. نوفر لك أفضل خدمات الرعاية الصحية المنزلية بكل سهولة وأمان.',
    bg: 'bg-cyan-50',
  },
  {
    illustration: <OnboardingIllustration2 />,
    title: 'نخبة من الممرضين',
    text: 'اعثر على أفضل الممرضين والممرضات بالقرب منك، معتمدين وذوي خبرة عالية لخدمتك.',
    bg: 'bg-teal-50',
  },
  {
    illustration: <OnboardingIllustration3 />,
    title: 'احجز بضغطة زر',
    text: 'اطلب خدماتك الصحية بسهولة، تابع طلباتك، واحصل على الرعاية التي تستحقها في منزلك.',
    bg: 'bg-sky-50',
  },
];

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const content = onboardingContent[step];
  
  const handleNext = () => {
    if (step < onboardingContent.length - 1) {
      setStep(s => s + 1);
    } else {
        onComplete();
    }
  };

  return (
    <div className={`flex flex-col h-full transition-colors duration-500 ${content.bg}`}>
      {/* Wrapper for desktop view */}
      <div className="w-full h-full flex flex-col md:flex-row bg-white">
        {/* Image Section */}
        <div className={`flex-grow md:flex-grow-0 w-full md:w-1/2 flex items-center justify-center p-8 md:p-8 lg:p-12 overflow-hidden transition-colors duration-500 ${content.bg}`}>
            <div key={step} className="w-full max-w-md animate-slide-fade-in">
              {content.illustration}
            </div>
            <style>{`
                @keyframes slide-fade-in {
                    from { opacity: 0; transform: translateX(20px) scale(0.98); }
                    to { opacity: 1; transform: translateX(0) scale(1); }
                }
                .animate-slide-fade-in { animation: slide-fade-in 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
            `}</style>
        </div>
        
        {/* Content Section */}
        <div className="flex-shrink-0 bg-white rounded-t-3xl md:rounded-none md:w-1/2 p-6 pt-8 md:p-8 lg:p-16 text-center shadow-2xl md:shadow-none animate-slide-up flex flex-col justify-center">
          <style>{`
            @keyframes slide-up {
              from { transform: translateY(100%); }
              to { transform: translateY(0); }
            }
            .animate-slide-up { animation: slide-up 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
             @keyframes content-fade-in {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-content-fade-in { 
              animation: content-fade-in 0.5s 0.1s ease-out forwards;
              opacity: 0;
            }
            /* Prevent animations on larger screens */
            @media (min-width: 768px) {
                .animate-slide-up { animation: none; }
            }
          `}</style>
          <div key={step} className="animate-content-fade-in">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">{content.title}</h1>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-8 md:mb-12 min-h-[4.5rem] md:min-h-[5rem]">{content.text}</p>
          </div>
          
          <div className="flex justify-center items-center gap-2 mb-8 md:mb-12">
            {onboardingContent.map((_, i) => (
              <div key={i} className={`h-2 rounded-full transition-all duration-300 ${step === i ? 'bg-cyan-500 w-8' : 'bg-gray-300 w-2'}`}></div>
            ))}
          </div>
          
          <div className="flex items-center gap-4 max-w-sm mx-auto w-full">
              <button 
                  onClick={onComplete} 
                  className={`w-20 text-gray-500 font-semibold px-4 py-3 hover:bg-gray-100 rounded-lg transition-opacity ${step === onboardingContent.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                  aria-hidden={step === onboardingContent.length - 1}
              >
                  تخطي
              </button>
              <button onClick={handleNext} className="flex-grow bg-cyan-500 text-white py-3.5 rounded-xl font-bold text-lg shadow-md shadow-cyan-500/30 hover:bg-cyan-600 transition">
                {step < onboardingContent.length - 1 ? 'التالي' : 'ابدأ الآن'}
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;