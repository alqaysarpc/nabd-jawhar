
import React, { useState } from 'react';
import { ArrowRightIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { LogoIcon, MapPinIcon } from './icons';

interface SignUpNurseScreenProps {
  onBack: () => void;
  onSignUpSuccess: () => void;
}

// A helper component for styled file inputs
const FileUploadField: React.FC<{ label: string, id: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, fileName: string | null }> = ({ label, id, onChange, fileName }) => {
  return (
    <div>
        <label htmlFor={id} className="text-sm font-medium text-gray-700 mb-1 block">{label}</label>
        <div className="relative border border-gray-300 rounded-lg">
            <input type="file" id={id} name={id} onChange={onChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*,.pdf" />
            <div className="flex items-center justify-between p-3">
                <span className={`text-sm ${fileName ? 'text-gray-800' : 'text-gray-400'}`}>{fileName || 'اختر ملف...'}</span>
                <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-xs font-semibold pointer-events-none">
                    رفع
                </div>
            </div>
        </div>
    </div>
  );
};


const SignUpNurseScreen: React.FC<SignUpNurseScreenProps> = ({ onBack, onSignUpSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
    gender: '',
    hospital: '',
    city: '',
    district: '',
    address: '',
    isAvailable: true,
    agreesToTerms: false,
  });

  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    nationalId: null,
    certificate: null,
    photo: null,
    license: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const themeColor = 'teal';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files: inputFiles } = e.target;
    if (inputFiles && inputFiles.length > 0) {
        setFiles(prev => ({...prev, [name]: inputFiles[0]}));
    }
  };

  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          alert('تم تحديد موقعك بنجاح! سيتم ملء حقول العنوان بالبيانات التقريبية.');
          setFormData(prev => ({
            ...prev,
            city: 'صنعاء',
            district: 'حي معين',
            address: 'شارع تعز، بالقرب من مستشفى الثورة',
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
    if (!formData.agreesToTerms) {
        alert('يجب الموافقة على الشروط والأحكام للمتابعة.');
        return;
    }
    // Simple validation for all fields
    for (const key in formData) {
        if (key !== 'agreesToTerms' && formData[key as keyof typeof formData] === '') {
            alert('الرجاء تعبئة جميع الحقول المطلوبة.');
            return;
        }
    }
     // Simple validation for files
    for (const key in files) {
        if (files[key as keyof typeof files] === null) {
            alert('الرجاء رفع جميع المستندات المطلوبة.');
            return;
        }
    }
    onSignUpSuccess();
  };

  const isFormValid = formData.agreesToTerms;

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
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">انضمي إلينا كممرضة</h1>
        <p className="text-gray-500 mt-2 mb-6 text-center">كوني جزءاً من فريقنا لتقديم أفضل رعاية</p>
        
        <form onSubmit={handleSignUp} className="w-full max-w-sm md:max-w-md space-y-4 text-right">
            {/* Personal Info */}
            <fieldset className="space-y-4">
                <legend className="text-lg font-semibold text-gray-600 border-b pb-1 w-full">المعلومات الشخصية</legend>
                <input name="name" type="text" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 transition" placeholder="الاسم الكامل" required />
                <input name="phone" type="tel" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 transition" placeholder="رقم الجوال (7xxxxxxxx)" required />
                <div className="grid grid-cols-2 gap-4">
                    <input id="dob" name="dob" type="date" value={formData.dob} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 transition" required aria-label="تاريخ الميلاد" />
                    <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 transition bg-white" required>
                        <option value="" disabled>الجنس...</option>
                        <option value="female">أنثى</option>
                        <option value="male">ذكر</option>
                    </select>
                </div>
            </fieldset>

            {/* Account Info */}
            <fieldset className="space-y-4 pt-4">
                <legend className="text-lg font-semibold text-gray-600 border-b pb-1 w-full">معلومات الحساب</legend>
                <input name="email" type="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 transition" placeholder="البريد الإلكتروني" required />
                <div className="relative">
                    <input name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 transition" placeholder="كلمة المرور" required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-3 top-1/2 -translate-y-1/2"><span className="sr-only">Toggle password visibility</span>{showPassword ? <EyeSlashIcon className="w-6 h-6 text-gray-400" /> : <EyeIcon className="w-6 h-6 text-gray-400" />}</button>
                </div>
                <div className="relative">
                    <input name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 transition" placeholder="تأكيد كلمة المرور" required />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute left-3 top-1/2 -translate-y-1/2"><span className="sr-only">Toggle confirm password visibility</span>{showConfirmPassword ? <EyeSlashIcon className="w-6 h-6 text-gray-400" /> : <EyeIcon className="w-6 h-6 text-gray-400" />}</button>
                </div>
            </fieldset>
            
            {/* Professional Info */}
            <fieldset className="space-y-4 pt-4">
                 <legend className="text-lg font-semibold text-gray-600 border-b pb-1 w-full">المعلومات المهنية</legend>
                 <input name="hospital" type="text" value={formData.hospital} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 transition" placeholder="اسم المستشفى أو المركز الطبي" required />
            </fieldset>

            {/* Address Info */}
            <fieldset className="space-y-4 pt-4">
                <legend className="text-lg font-semibold text-gray-600 border-b pb-1 w-full">العنوان</legend>
                <div className="grid grid-cols-2 gap-4">
                    <input name="city" type="text" value={formData.city} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 transition" placeholder="المدينة" required />
                    <input name="district" type="text" value={formData.district} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 transition" placeholder="الحي" required />
                </div>
                <textarea name="address" value={formData.address} onChange={handleChange} className="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 transition" placeholder="العنوان التفصيلي..." required />
                <button type="button" onClick={handleDetectLocation} className="w-full flex items-center justify-center gap-2 bg-sky-100 text-sky-700 py-2.5 rounded-lg font-semibold hover:bg-sky-200 transition">
                    <MapPinIcon className="w-5 h-5" />
                    تحديد الموقع الحالي
                </button>
            </fieldset>

            {/* Document Uploads */}
            <fieldset className="space-y-4 pt-4">
                <legend className="text-lg font-semibold text-gray-600 border-b pb-1 w-full">المستندات المطلوبة</legend>
                <FileUploadField label="صورة الهوية الوطنية" id="nationalId" onChange={handleFileChange} fileName={files.nationalId?.name || null} />
                <FileUploadField label="شهادة التخرج" id="certificate" onChange={handleFileChange} fileName={files.certificate?.name || null} />
                <FileUploadField label="صورة شخصية" id="photo" onChange={handleFileChange} fileName={files.photo?.name || null} />
                <FileUploadField label="رخصة مزاولة المهنة" id="license" onChange={handleFileChange} fileName={files.license?.name || null} />
            </fieldset>

            {/* Agreement */}
             <fieldset className="space-y-4 pt-4">
                <label className="flex items-center space-x-3 space-x-reverse p-3 bg-gray-50 rounded-lg">
                    <input type="checkbox" name="isAvailable" checked={formData.isAvailable} onChange={handleChange} className="h-5 w-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                    <span className="text-gray-700 font-medium">متاح لتقديم خدمات الرعاية المنزلية</span>
                </label>

                <label className="flex items-start space-x-3 space-x-reverse">
                    <input type="checkbox" name="agreesToTerms" checked={formData.agreesToTerms} onChange={handleChange} className="h-5 w-5 mt-0.5 rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                    <span className="text-gray-600 text-sm">أوافق على <a href="#" className="text-teal-600 hover:underline font-semibold">الشروط والأحكام</a> وسياسة الخصوصية.</span>
                </label>
             </fieldset>
            
            <button type="submit" disabled={!isFormValid} className={`w-full bg-${themeColor}-500 text-white py-3.5 rounded-xl font-bold text-lg shadow-md shadow-${themeColor}-500/30 hover:bg-${themeColor}-600 transition !mt-8 disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed`}>
                إنشاء الحساب
            </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpNurseScreen;
