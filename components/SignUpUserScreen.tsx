
import React, { useState } from 'react';
import { ArrowRightIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { LogoIcon, MapPinIcon } from './icons';

interface SignUpUserScreenProps {
  onBack: () => void;
  onSignUpSuccess: () => void;
}

const SignUpUserScreen: React.FC<SignUpUserScreenProps> = ({ onBack, onSignUpSuccess }) => {
  // State for all fields
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
    gender: '',
    city: '',
    district: '',
    address: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const themeColor = 'cyan';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          alert('تم تحديد موقعك بنجاح! سيتم ملء حقول العنوان بالبيانات التقريبية.');
          setFormData(prev => ({
            ...prev,
            city: 'صنعاء',
            district: 'حي التحرير',
            address: 'شارع الزبيري، بالقرب من ميدان التحرير',
          }));
        },
        (error) => {
          console.error(`Error getting location: ${error.message} (Code: ${error.code})`);
          alert('لم نتمكن من تحديد موقعك. يرجى التأكد من تفعيل خدمات الموقع والمحاولة مرة أخرى.');
        }
      );
    } else {
      alert('خدمات الموقع غير مدعومة في هذا المتصفح.');
    }
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('كلمتا المرور غير متطابقتين.');
      return;
    }
    // Simple validation for all fields
    for (const key in formData) {
      if (formData[key as keyof typeof formData] === '') {
        alert('الرجاء تعبئة جميع الحقول المطلوبة.');
        return;
      }
    }
    onSignUpSuccess();
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-cyan-50">
       <div className="p-6 flex-none">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100" aria-label="العودة">
          <ArrowRightIcon className="w-6 h-6 text-gray-600" />
        </button>
      </div>
      <div className="flex-grow flex flex-col items-center justify-center px-4 pb-8">
        <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center bg-white rounded-full mb-4 mx-auto shadow-lg">
          <LogoIcon className="w-12 h-12 md:w-16 md:h-16" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">إنشاء حساب مستخدم</h1>
        <p className="text-gray-500 mt-2 mb-6 text-center">خطوة واحدة تفصلك عن أفضل رعاية صحية منزلية</p>
        
        <form onSubmit={handleSignUp} className="w-full max-w-sm md:max-w-md space-y-4 text-right">
          {/* Personal Info */}
          <fieldset className="space-y-4">
            <legend className="text-lg font-semibold text-gray-600 border-b pb-1 w-full">المعلومات الشخصية</legend>
            <div>
              <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1 block">الاسم الكامل</label>
              <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 transition" placeholder="عبدالله محمد" required />
            </div>
            <div>
              <label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-1 block">رقم الجوال</label>
              <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 transition" placeholder="7xxxxxxxx" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="dob" className="text-sm font-medium text-gray-700 mb-1 block">تاريخ الميلاد</label>
                <input id="dob" name="dob" type="date" value={formData.dob} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 transition" required />
              </div>
              <div>
                <label htmlFor="gender" className="text-sm font-medium text-gray-700 mb-1 block">الجنس</label>
                <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 transition bg-white" required>
                    <option value="" disabled>اختر...</option>
                    <option value="male">ذكر</option>
                    <option value="female">أنثى</option>
                </select>
              </div>
            </div>
          </fieldset>
          
          {/* Account Info */}
          <fieldset className="space-y-4 pt-4">
            <legend className="text-lg font-semibold text-gray-600 border-b pb-1 w-full">معلومات الحساب</legend>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1 block">البريد الإلكتروني</label>
              <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 transition" placeholder="example@mail.com" required />
            </div>
            <div>
              <label htmlFor="password"  className="text-sm font-medium text-gray-700 mb-1 block">كلمة المرور</label>
              <div className="relative">
                <input id="password" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 transition" placeholder="********" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-3 top-1/2 -translate-y-1/2" aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}><span className="sr-only">Toggle password visibility</span>{showPassword ? <EyeSlashIcon className="w-6 h-6 text-gray-400" /> : <EyeIcon className="w-6 h-6 text-gray-400" />}</button>
              </div>
            </div>
            <div>
              <label htmlFor="confirmPassword"  className="text-sm font-medium text-gray-700 mb-1 block">تأكيد كلمة المرور</label>
              <div className="relative">
                <input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 transition" placeholder="********" required />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute left-3 top-1/2 -translate-y-1/2" aria-label={showConfirmPassword ? "إخفاء تأكيد كلمة المرور" : "إظهار تأكيد كلمة المرور"}><span className="sr-only">Toggle confirm password visibility</span>{showConfirmPassword ? <EyeSlashIcon className="w-6 h-6 text-gray-400" /> : <EyeIcon className="w-6 h-6 text-gray-400" />}</button>
              </div>
            </div>
          </fieldset>

          {/* Address Info */}
          <fieldset className="space-y-4 pt-4">
            <legend className="text-lg font-semibold text-gray-600 border-b pb-1 w-full">معلومات العنوان</legend>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="text-sm font-medium text-gray-700 mb-1 block">المدينة</label>
                <input id="city" name="city" type="text" value={formData.city} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 transition" placeholder="صنعاء" required />
              </div>
              <div>
                <label htmlFor="district" className="text-sm font-medium text-gray-700 mb-1 block">الحي</label>
                <input id="district" name="district" type="text" value={formData.district} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 transition" placeholder="حي التحرير" required />
              </div>
            </div>
            <div>
              <label htmlFor="address" className="text-sm font-medium text-gray-700 mb-1 block">العنوان التفصيلي</label>
              <textarea id="address" name="address" value={formData.address} onChange={handleChange} className="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 transition" placeholder="اسم الشارع، رقم المبنى، الدور، الشقة..." required />
            </div>
            <button type="button" onClick={handleDetectLocation} className="w-full flex items-center justify-center gap-2 bg-sky-100 text-sky-700 py-2.5 rounded-lg font-semibold hover:bg-sky-200 transition">
              <MapPinIcon className="w-5 h-5" />
              تحديد الموقع الحالي
            </button>
          </fieldset>

          <button type="submit" className={`w-full bg-${themeColor}-500 text-white py-3.5 rounded-xl font-bold text-lg shadow-md shadow-${themeColor}-500/30 hover:bg-${themeColor}-600 transition !mt-8`}>
            إنشاء الحساب
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpUserScreen;
