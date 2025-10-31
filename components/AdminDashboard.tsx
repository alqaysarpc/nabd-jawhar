import React, { useState, useEffect } from 'react';
import { PowerIcon, UserGroupIcon, ClockIcon, ClipboardDocumentListIcon, HomeIcon, BeakerIcon, ArrowLeftIcon, XMarkIcon, PlusCircleIcon, MinusCircleIcon, TrashIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

// تعريف أنواع البيانات الوهمية
interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'ذكر' | 'أنثى';
  condition: string;
  lastVisit: string;
  nurseId: string;
}

interface Nurse {
  id: string;
  name: string;
  specialty: string;
  phone: string;
  status: 'نشط' | 'في إجازة';
  patientsCount: number;
}

interface Order {
  id: string;
  patientName: string;
  service: string;
  date: string;
  status: 'جديد' | 'قيد التنفيذ' | 'مكتمل';
  amount: number;
}

interface Service {
  name: string;
  desc: string;
  price: number;
}

type Section = 'dashboard' | 'patients' | 'nurses' | 'orders' | 'services';

// --- البيانات الوهمية (Mock Data) ---
const YEMENI_CURRENCY = 'ر.ي'; 

const mockData = {
  patients: [
    { id: 'P001', name: 'علي محمد', age: 65, gender: 'ذكر', condition: 'سكري وضغط', lastVisit: '2025-10-25', nurseId: 'N001' },
    { id: 'P002', name: 'فاطمة أحمد', age: 78, gender: 'أنثى', condition: 'عناية بعد عملية', lastVisit: '2025-10-28', nurseId: 'N002' },
    { id: 'P003', name: 'خالد سعيد', age: 45, gender: 'ذكر', condition: 'مراقبة عامة', lastVisit: '2025-10-29', nurseId: 'N001' },
    { id: 'P004', name: 'سلمى يوسف', age: 88, gender: 'أنثى', condition: 'رعاية المسنين', lastVisit: '2025-10-27', nurseId: 'N003' },
  ] as Patient[],
  nurses: [
    { id: 'N001', name: 'آلاء جمال', specialty: 'عناية مزمنة', phone: '777000111', status: 'نشط', patientsCount: 2 },
    { id: 'N002', name: 'سمية ناصر', specialty: 'ما بعد الجراحة', phone: '777000222', status: 'نشط', patientsCount: 1 },
    { id: 'N003', name: 'مريم علي', specialty: 'رعاية مسنين', phone: '777000333', status: 'في إجازة', patientsCount: 1 },
  ] as Nurse[],
  orders: [
    { id: 'O001', patientName: 'علي محمد', service: 'قياس الضغط اليومي', date: '2025-10-31', status: 'جديد', amount: 5000 },
    { id: 'O002', patientName: 'فاطمة أحمد', service: 'تغيير ضماد', date: '2025-10-30', status: 'قيد التنفيذ', amount: 8000 },
    { id: 'O003', patientName: 'خالد سعيد', service: 'إدارة الأدوية', date: '2025-10-29', status: 'مكتمل', amount: 4500 },
    { id: 'O004', patientName: 'سلمى يوسف', service: 'مساعدة في الحركة', date: '2025-10-28', status: 'مكتمل', amount: 6000 },
  ] as Order[],
  services: {
    care: [
        { name: 'عناية شاملة', desc: 'رعاية 24 ساعة لمرضى الحالات المزمنة', price: 150000 },
        { name: 'عناية يومية', desc: '4 ساعات زيارة يومية للخدمات الأساسية', price: 60000 },
    ] as Service[],
    individual: [
        { name: 'قياس العلامات الحيوية', desc: 'ضغط، سكر، حرارة', price: 5000 },
        { name: 'تغيير ضماد الجروح', desc: 'تضميد احترافي للجروح', price: 8000 },
        { name: 'إدارة الأدوية الوريدية', desc: 'حقن وإدارة الأدوية', price: 12000 },
    ] as Service[],
  }
};

interface AdminDashboardProps {
    onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeSection, setActiveSection] = useState<Section>('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', body: '' });

  // دالة لعرض رسائل النظام (تستبدل alert)
  const showMessage = (title: string, body: string) => {
    setModalContent({ title, body });
    setIsModalOpen(true);
  };

  // --- دوال المساعدة للأنماط ---
  const getStatusClasses = (status: Order['status']) => {
    switch (status) {
      case 'جديد': return 'bg-yellow-100 text-yellow-800';
      case 'قيد التنفيذ': return 'bg-blue-100 text-blue-800';
      case 'مكتمل': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSidebarItemClass = (section: Section) => 
    `menu-item flex items-center p-3 rounded-xl transition duration-200 cursor-pointer ${
      activeSection === section ? 'bg-teal-500 text-white' : 'text-gray-600 hover:bg-gray-100'
    }`;

  // --- مكونات عرض الأقسام ---

  const RenderDashboard = () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-2 border-gray-200">لوحة القيادة</h2>
      
      {/* بطاقات المؤشرات الرئيسية */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[{title: 'إجمالي المرضى', value: mockData.patients.length, icon: UserGroupIcon, color: 'blue'},
          {title: 'الممرضات النشطات', value: mockData.nurses.filter(n => n.status === 'نشط').length, icon: BeakerIcon, color: 'teal'},
          {title: 'طلبات جديدة اليوم', value: mockData.orders.filter(o => o.status === 'جديد').length, icon: ClockIcon, color: 'yellow'},
          {title: 'أوامر مكتملة', value: mockData.orders.filter(o => o.status === 'مكتمل').length, icon: CheckCircleIcon, color: 'green'},
        ].map((card, index) => (
          <div key={index} className={`bg-white p-6 rounded-2xl shadow-lg border border-${card.color}-100 transform transition duration-300 hover:scale-[1.02] cursor-pointer`}>
            <card.icon className={`w-8 h-8 text-${card.color}-600 mb-3`} />
            <p className="text-sm font-medium text-gray-500">{card.title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{card.value}</p>
          </div>
        ))}
      </div>

      {/* الطلبات الأخيرة */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">أحدث الطلبات</h3>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    {['#الطلب', 'اسم المريض', 'الخدمة', 'التاريخ', 'الحالة', 'المبلغ'].map(header => (
                        <th key={header} className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {mockData.orders.slice(0, 5).map(order => (
                    <tr key={order.id} className="hover:bg-gray-50 transition duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.patientName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.service}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(order.status)}`}>
                                {order.status}
                            </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                            {order.amount.toLocaleString()} {YEMENI_CURRENCY}
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
        <button onClick={() => setActiveSection('orders')} className="mt-4 text-teal-600 hover:text-teal-800 text-sm font-medium transition">عرض كل الطلبات &larr;</button>
      </div>
    </div>
  );

  const RenderPatients = () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-2 border-gray-200">إدارة المرضى ({mockData.patients.length})</h2>
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    {['ID', 'الاسم', 'العمر', 'الحالة', 'آخر زيارة', 'الممرضة المسؤولة', 'إجراء'].map(header => (
                        <th key={header} className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {mockData.patients.map(patient => (
                    <tr key={patient.id} className="hover:bg-gray-50 transition duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{patient.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{patient.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{patient.age}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">{patient.condition}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.lastVisit}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-teal-600">
                            {mockData.nurses.find(n => n.id === patient.nurseId)?.name || 'غير محدد'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button onClick={() => showMessage('تعديل', `تعديل بيانات المريض ${patient.name}`)} className="text-teal-600 hover:text-teal-800 ml-3"><i className="fas fa-edit"></i></button>
                            <button onClick={() => showMessage('حذف', `هل أنت متأكد من حذف المريض ${patient.name}؟`)} className="text-red-600 hover:text-red-800"><i className="fas fa-trash"></i></button>
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
      </div>
    </div>
  );

  const RenderNurses = () => (
    <div className="space-y-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-2 border-gray-200">إدارة الممرضات ({mockData.nurses.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockData.nurses.map(nurse => (
                <div key={nurse.id} className={`bg-white p-6 rounded-2xl shadow-lg border-t-4 border-teal-500 transform transition duration-300 hover:shadow-xl`}>
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <h3 className="text-xl font-bold text-gray-800">{nurse.name}</h3>
                            <p className="text-sm text-gray-500">{nurse.specialty}</p>
                        </div>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${nurse.status === 'نشط' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {nurse.status}
                        </span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 text-sm">
                        <p className="text-gray-600"><strong><i className="fas fa-phone ml-2"></i>الهاتف:</strong> {nurse.phone}</p>
                        <p className="text-gray-600"><strong><i className="fas fa-user ml-2"></i>المرضى المسؤول عنهم:</strong> {nurse.patientsCount}</p>
                    </div>
                    <div className="mt-4 flex justify-end space-x-3">
                        <button onClick={() => showMessage('تعديل', `تعديل بيانات الممرضة ${nurse.name}`)} className="text-teal-600 hover:text-teal-800 text-sm font-medium"><i className="fas fa-edit"></i> تعديل</button>
                        <button onClick={() => showMessage('حذف', `هل أنت متأكد من فصل الممرضة ${nurse.name}؟`)} className="text-red-600 hover:text-red-800 text-sm font-medium"><i className="fas fa-trash"></i> فصل</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );

  const RenderOrders = () => (
    <div className="space-y-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-2 border-gray-200">إدارة الطلبات ({mockData.orders.length})</h2>
        <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {['#الطلب', 'المريض', 'الخدمة المطلوبة', 'تاريخ الطلب', 'الحالة', 'المبلغ', 'إجراء'].map(header => (
                            <th key={header} className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {mockData.orders.map(order => (
                        <tr key={order.id} className="hover:bg-gray-50 transition duration-150">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.patientName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.service}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(order.status)}`}>
                                    {order.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                                {order.amount.toLocaleString()} {YEMENI_CURRENCY}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button onClick={() => showMessage('تعديل', `تعديل حالة الطلب ${order.id}`)} className="text-teal-600 hover:text-teal-800 ml-3"><i className="fas fa-edit"></i></button>
                                <button onClick={() => showMessage('حذف', `حذف الطلب ${order.id}`)} className="text-red-600 hover:text-red-800"><i className="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    </div>
  );
  
  const RenderServices = () => {
    const renderServiceList = (services: Service[], title: string, id: string) => (
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b pb-2 border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
            <button onClick={() => showMessage('إضافة', `إضافة خدمة جديدة إلى ${title}`)} className="text-teal-600 hover:text-teal-800 text-sm font-medium flex items-center">
                <PlusCircleIcon className="w-5 h-5 ml-1"/> إضافة خدمة
            </button>
        </div>
        <div id={id} className="space-y-3">
          {services.map((service, index) => (
            <div key={index} className="flex justify-between items-center p-4 border rounded-xl bg-white shadow-sm hover:shadow-md transition">
              <div>
                  <p className="font-semibold text-lg text-gray-800">{service.name}</p>
                  <p className="text-sm text-gray-500">{service.desc}</p>
              </div>
              <div className="flex items-center">
                  <span className="text-xl font-bold text-green-600 ml-4">
                      {service.price.toLocaleString()} {YEMENI_CURRENCY}
                  </span>
                  <button onClick={() => showMessage('تعديل', `تعديل خدمة ${service.name}`)} className="text-teal-600 hover:text-teal-800 p-2 rounded-full hover:bg-teal-50"><i className="fas fa-edit"></i></button>
                  <button onClick={() => showMessage('حذف', `حذف خدمة ${service.name}`)} className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50"><i className="fas fa-trash"></i></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    return (
      <div className="space-y-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-2 border-gray-200">إدارة الخدمات</h2>
        <div className="grid grid-cols-1 gap-8">
          {renderServiceList(mockData.services.care, 'برامج الرعاية الشاملة', 'care-services-list')}
          {renderServiceList(mockData.services.individual, 'الخدمات الفردية', 'individual-services-list')}
        </div>
      </div>
    );
  };
  

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <RenderDashboard />;
      case 'patients':
        return <RenderPatients />;
      case 'nurses':
        return <RenderNurses />;
      case 'orders':
        return <RenderOrders />;
      case 'services':
        return <RenderServices />;
      default:
        return <RenderDashboard />;
    }
  };

  const SidebarItem: React.FC<{ section: Section, icon: React.ElementType, label: string }> = ({ section, icon: Icon, label }) => (
    <div className={getSidebarItemClass(section)} onClick={() => setActiveSection(section)}>
      <Icon className="w-6 h-6 ml-3" />
      <span className="font-semibold text-lg">{label}</span>
    </div>
  );

  const CustomModal: React.FC<{ isOpen: boolean, onClose: () => void, title: string, body: string }> = ({ isOpen, onClose, title, body }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 z-[9999] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 text-right transform transition-all duration-300 scale-100">
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 text-gray-600">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">{body}</p>
                <div className="flex justify-end">
                    <button onClick={onClose} className="bg-teal-500 text-white py-2 px-6 rounded-xl font-semibold hover:bg-teal-600 transition">
                        حسناً
                    </button>
                </div>
            </div>
        </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50 text-right">
      {/* الشريط الجانبي (Sidebar) */}
      <div className="sidebar fixed right-0 top-0 h-full bg-white shadow-xl z-50 p-6 flex flex-col w-72">
        <div className="flex-none pb-6 mb-6 border-b border-gray-200">
          <div className="text-2xl font-extrabold text-teal-600">
            <i className="fas fa-heartbeat text-red-500 ml-2"></i> نبض جوار
          </div>
          <p className="text-sm text-gray-500 mt-1">لوحة تحكم المشرف</p>
        </div>
        
        {/* قائمة الأقسام */}
        <div className="flex-grow space-y-2">
          <SidebarItem section="dashboard" icon={HomeIcon} label="لوحة القيادة" />
          <SidebarItem section="patients" icon={UserGroupIcon} label="المرضى" />
          <SidebarItem section="nurses" icon={BeakerIcon} label="الممرضات" />
          <SidebarItem section="orders" icon={ClipboardDocumentListIcon} label="الطلبات" />
          <SidebarItem section="services" icon={ClockIcon} label="الخدمات" />
        </div>
        
        {/* زر تسجيل الخروج */}
        <div className="flex-none pt-6 mt-6 border-t border-gray-200">
          <button onClick={onLogout} className="w-full flex items-center p-3 rounded-xl transition duration-200 bg-red-500 text-white hover:bg-red-600 shadow-md shadow-red-500/30">
            <PowerIcon className="w-6 h-6 ml-3" />
            <span className="font-semibold text-lg">تسجيل الخروج</span>
          </button>
        </div>
      </div>

      {/* المحتوى الرئيسي (Main Content) */}
      <div className="flex-grow p-8 mr-72 overflow-y-auto">
        {renderActiveSection()}
      </div>

      {/* النافذة المنبثقة المخصصة (Custom Modal) */}
      <CustomModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={modalContent.title} 
        body={modalContent.body} 
      />
    </div>
  );
};

export default AdminDashboard;
