// import React from 'react';
// import { View, Dimensions } from 'react-native';
// import { WebView } from 'react-native-webview';

// // استيراد محتوى ملف admin.html الذي أرسلته
// // يجب أن تضع محتوى ملف admin.html بالكامل هنا بين علامتي التنصيص الخلفيتين (Backticks)
// const htmlContent = `
// <!DOCTYPE html>
// <html lang="ar" dir="rtl">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>نبض جوار - لوحة تحكم المشرف</title>
//     <script src="https://cdn.tailwindcss.com"></script>
//     <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
//     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" xintegrity="sha512-SnH5WK+bZxgPHs44uWIX+LLMD/cdYIuP8YlP2y8fT6/sXJqE6dK9f2tQ3g/T+GvX6g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
//     <style>
//         :root {
//             --primary-color: #00A79D; /* لون التطبيق الأساسي (تركوازي) */
//         }
//         body {
//             font-family: 'Inter', sans-serif;
//             background-color: #f8fafc;
//         }
//         .sidebar {
//             width: 280px;
//         }
//         .main-content {
//             margin-right: 280px; /* ترك مساحة للشريط الجانبي */
//         }
//         .menu-item.active {
//             background-color: var(--primary-color);
//             color: white;
//         }
//         .menu-item.active .icon {
//             color: white;
//         }
//         .menu-item:not(.active):hover {
//             background-color: #e0f7f5;
//         }
//         /* تصميم زر تحديد الموقع الجغرافي */
//         .location-btn {
//             background-color: #f0f9ff;
//             color: #0284c7;
//             border: 1px solid #bae6fd;
//         }
//         /* تخصيص بسيط للألوان في Tailwind */
//         .bg-primary { background-color: var(--primary-color); }
//         .text-primary { color: var(--primary-color); }
//         .border-primary { border-color: var(--primary-color); }
//         /* تصميم الرسوم البيانية البسيط */
//         .chart-bar {
//             height: 100px;
//             background-color: #e0e7ff;
//             border-radius: 4px;
//             display: flex;
//             align-items: flex-end;
//             padding: 5px;
//         }
//         .bar {
//             width: 10%;
//             margin: 0 1%;
//             background-color: var(--primary-color);
//             border-radius: 4px 4px 0 0;
//             transition: height 0.5s;
//         }
//         .nurse-tab.active {
//             border-color: var(--primary-color);
//             color: var(--primary-color);
//         }
//         .nurse-tab:not(.active) {
//             border-color: transparent;
//             color: #6b7280;
//         }
//     </style>
// </head>
// <body class="flex">

//     <div class="sidebar fixed right-0 top-0 h-full bg-white shadow-xl z-50 p-6 flex flex-col">
//         <div class="flex items-center justify-center p-4 mb-8 border-b border-gray-100">
//             <i class="fas fa-heartbeat text-3xl text-primary ml-2"></i>
//             <h1 class="text-2xl font-bold text-gray-800">نبض جوار</h1>
//         </div>

//         <nav class="flex-grow space-y-2">
//             <a href="#" class="menu-item active flex items-center p-3 rounded-xl font-medium transition-all" onclick="showSection('dashboard')">
//                 <i class="fas fa-tachometer-alt text-2xl ml-3 icon"></i>
//                 <span>لوحة التحكم الرئيسية</span>
//             </a>
//             <a href="#" class="menu-item flex items-center p-3 rounded-xl font-medium text-gray-700 transition-all" onclick="showSection('nurses')">
//                 <i class="fas fa-user-nurse text-2xl ml-3 text-primary icon"></i>
//                 <span>إدارة الممرضين</span>
//             </a>
//             <a href="#" class="menu-item flex items-center p-3 rounded-xl font-medium text-gray-700 transition-all" onclick="showSection('patients')">
//                 <i class="fas fa-user-injured text-2xl ml-3 text-primary icon"></i>
//                 <span>إدارة المرضى</span>
//             </a>
//             <a href="#" class="menu-item flex items-center p-3 rounded-xl font-medium text-gray-700 transition-all" onclick="showSection('orders')">
//                 <i class="fas fa-list-alt text-2xl ml-3 text-primary icon"></i>
//                 <span>إدارة الطلبات</span>
//             </a>
//             <a href="#" class="menu-item flex items-center p-3 rounded-xl font-medium text-gray-700 transition-all" onclick="showSection('services')">
//                 <i class="fas fa-hospital-user text-2xl ml-3 text-primary icon"></i>
//                 <span>إدارة الخدمات والتسعير</span>
//             </a>
//             <a href="#" class="menu-item flex items-center p-3 rounded-xl font-medium text-gray-700 transition-all" onclick="showSection('reports')">
//                 <i class="fas fa-chart-line text-2xl ml-3 text-primary icon"></i>
//                 <span>التقارير والتحليلات</span>
//             </a>
//             <a href="#" class="menu-item flex items-center p-3 rounded-xl font-medium text-gray-700 transition-all" onclick="showSection('settings')">
//                 <i class="fas fa-cog text-2xl ml-3 text-primary icon"></i>
//                 <span>الإعدادات العامة</span>
//             </a>
//         </nav>

//         <div class="pt-4 border-t border-gray-100">
//             <div class="flex items-center p-3">
//                 <div class="w-10 h-10 bg-gray-200 rounded-full ml-3 flex items-center justify-center">
//                     <i class="fas fa-user-shield text-gray-600"></i>
//                 </div>
//                 <div>
//                     <p class="text-sm font-semibold">المشرف الرئيسي</p>
//                     <p class="text-xs text-gray-500">Admin@NabdJawwar.com</p>
//                 </div>
//             </div>
//             <a href="#" class="flex items-center text-red-500 p-3 rounded-xl hover:bg-red-50 transition-colors">
//                 <i class="fas fa-sign-out-alt ml-3"></i>
//                 <span>تسجيل الخروج</span>
//             </a>
//         </div>
//     </div>

//     <div class="main-content flex-grow p-8">
//         <header class="mb-8 flex justify-between items-center">
//             <h2 id="page-title" class="text-3xl font-extrabold text-gray-900">لوحة التحكم الرئيسية</h2>
//             <div class="text-sm text-gray-500">
//                 <span id="current-date"></span>
//             </div>
//         </header>

//         <main class="space-y-10">

//             <section id="dashboard" class="content-section">
//                 <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//                     <div class="bg-white p-6 rounded-2xl shadow-lg border-r-4 border-primary">
//                         <i class="fas fa-users text-3xl text-primary mb-3"></i>
//                         <p class="text-sm text-gray-500">إجمالي المستخدمين (المرضى)</p>
//                         <h3 class="text-4xl font-bold text-gray-900 mt-1" id="total-patients">0</h3>
//                     </div>
//                     <div class="bg-white p-6 rounded-2xl shadow-lg border-r-4 border-primary">
//                         <i class="fas fa-user-nurse text-3xl text-primary mb-3"></i>
//                         <p class="text-sm text-gray-500">الممرضون المُعتمدون</p>
//                         <h3 class="text-4xl font-bold text-gray-900 mt-1" id="total-nurses">0</h3>
//                     </div>
//                     <div class="bg-white p-6 rounded-2xl shadow-lg border-r-4 border-yellow-500">
//                         <i class="fas fa-hourglass-half text-3xl text-yellow-600 mb-3"></i>
//                         <p class="text-sm text-gray-500">الطلبات المُعلّقة</p>
//                         <h3 class="text-4xl font-bold text-gray-900 mt-1" id="pending-orders">0</h3>
//                     </div>
//                     <div class="bg-white p-6 rounded-2xl shadow-lg border-r-4 border-green-500">
//                         <i class="fas fa-dollar-sign text-3xl text-green-600 mb-3"></i>
//                         <p class="text-sm text-gray-500">إجمالي الإيرادات (عمولة التطبيق)</p>
//                         <h3 class="text-4xl font-bold text-gray-900 mt-1" id="total-revenue">0 ر.ي</h3>
//                     </div>
//                 </div>

//                 <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                     <div class="bg-white p-6 rounded-2xl shadow-lg">
//                         <h4 class="text-xl font-semibold mb-4 border-b pb-2">نمو التسجيل (آخر 7 أيام)</h4>
//                         <div class="chart-bar" id="growth-chart">
//                             </div>
//                     </div>
//                     <div class="bg-white p-6 rounded-2xl shadow-lg">
//                         <h4 class="text-xl font-semibold mb-4 border-b pb-2">توزيع الطلبات حسب الحالة</h4>
//                         <div class="flex justify-around items-center h-full" id="status-distribution">
//                             </div>
//                     </div>
//                 </div>
//             </section>

//             <section id="nurses" class="content-section hidden">
//                 <h3 class="text-2xl font-bold mb-6">إدارة الممرضين</h3>

//                 <div class="flex mb-6 border-b">
//                     <button class="nurse-tab p-3 text-lg font-medium border-b-2 border-primary text-primary transition-colors active" data-tab="approved">الممرضون المُعتمدون</button>
//                     <button class="nurse-tab p-3 text-lg font-medium text-gray-500 border-b-2 border-transparent hover:border-gray-300 transition-colors" data-tab="pending">طلبات التسجيل الجديدة</button>
//                 </div>

//                 <div id="approved-nurses-list" class="nurse-tab-content">
//                     <div class="bg-white rounded-xl shadow overflow-hidden">
//                         <table class="min-w-full divide-y divide-gray-200">
//                             <thead class="bg-gray-50">
//                                 <tr>
//                                     <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الاسم</th>
//                                     <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التخصص</th>
//                                     <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التقييم</th>
//                                     <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
//                                     <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">إجراءات</th>
//                                 </tr>
//                             </thead>
//                             <tbody class="bg-white divide-y divide-gray-200" id="approved-nurses-table">
//                                 </tbody>
//                         </table>
//                     </div>
//                 </div>

//                 <div id="pending-nurses-list" class="nurse-tab-content hidden">
//                     <div class="bg-white rounded-xl shadow overflow-hidden">
//                         <table class="min-w-full divide-y divide-gray-200">
//                             <thead class="bg-gray-50">
//                                 <tr>
//                                     <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الاسم</th>
//                                     <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تاريخ التسجيل</th>
//                                     <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الوثائق</th>
//                                     <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">إجراءات</th>
//                                 </tr>
//                             </thead>
//                             <tbody class="bg-white divide-y divide-gray-200" id="pending-nurses-table">
//                                 </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </section>

//             <section id="patients" class="content-section hidden">
//                 <h3 class="text-2xl font-bold mb-6">إدارة المرضى</h3>
//                 <div class="bg-white rounded-xl shadow overflow-hidden">
//                     <table class="min-w-full divide-y divide-gray-200">
//                         <thead class="bg-gray-50">
//                             <tr>
//                                 <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الاسم</th>
//                                 <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المدينة</th>
//                                 <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تاريخ التسجيل</th>
//                                 <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">حالة الحساب</th>
//                                 <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">إجراءات</th>
//                             </tr>
//                         </thead>
//                         <tbody class="bg-white divide-y divide-gray-200" id="patients-table">
//                             </tbody>
//                     </table>
//                 </div>
//             </section>

//             <section id="orders" class="content-section hidden">
//                 <h3 class="text-2xl font-bold mb-6">إدارة الطلبات</h3>

//                 <div class="flex flex-wrap gap-3 mb-6">
//                     <button class="order-filter-btn text-sm p-2 rounded-full bg-primary text-white" data-status="الكل">الكل</button>
//                     <button class="order-filter-btn text-sm p-2 rounded-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-100" data-status="قيد الانتظار">قيد الانتظار</button>
//                     <button class="order-filter-btn text-sm p-2 rounded-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-100" data-status="قيد التنفيذ">قيد التنفيذ</button>
//                     <button class="order-filter-btn text-sm p-2 rounded-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-100" data-status="مكتمل">مكتمل</button>
//                     <button class="order-filter-btn text-sm p-2 rounded-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-100" data-status="ملغي">ملغي</button>
//                 </div>

//                 <div class="bg-white rounded-xl shadow overflow-hidden">
//                     <table class="min-w-full divide-y divide-gray-200">
//                         <thead class="bg-gray-50">
//                             <tr>
//                                 <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">رقم الطلب</th>
//                                 <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الخدمة المطلوبة</th>
//                                 <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الممرض</th>
//                                 <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
//                                 <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">إجمالي التكلفة</th>
//                                 <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">إجراءات</th>
//                             </tr>
//                         </thead>
//                         <tbody class="bg-white divide-y divide-gray-200" id="orders-table">
//                             </tbody>
//                     </table>
//                 </div>
//             </section>

//             <section id="services" class="content-section hidden">
//                 <h3 class="text-2xl font-bold mb-6">إدارة الخدمات والتسعير</h3>

//                 <div class="bg-white p-6 rounded-2xl shadow-lg mb-8">
//                     <h4 class="text-xl font-semibold mb-4 text-primary border-b pb-2">خدمات الرعاية (Care Services)</h4>
//                     <div id="care-services-list" class="space-y-4">
//                         </div>
//                 </div>

//                 <div class="bg-white p-6 rounded-2xl shadow-lg">
//                     <h4 class="text-xl font-semibold mb-4 text-primary border-b pb-2">الخدمات الفردية (Individual Services)</h4>
//                     <div id="individual-services-list" class="space-y-4">
//                         </div>
//                 </div>

//                 <button class="mt-6 bg-primary text-white p-3 rounded-xl hover:bg-teal-600 transition-colors" onclick="alert('فتح نموذج إضافة/تعديل خدمة جديدة')">
//                     <i class="fas fa-plus ml-2"></i> إضافة خدمة جديدة
//                 </button>
//             </section>

//             <section id="reports" class="content-section hidden">
//                 <h3 class="text-2xl font-bold mb-6">التقارير والتحليلات</h3>

//                 <div class="bg-white p-6 rounded-2xl shadow-lg mb-8">
//                     <h4 class="text-xl font-semibold mb-4 border-b pb-2">التقارير المالية</h4>
//                     <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         <div class="p-4 border rounded-lg">
//                             <p class="text-sm text-gray-500">إجمالي العمولة لهذا الشهر</p>
//                             <p class="text-2xl font-bold text-green-600">58,000 ر.ي</p>
//                         </div>
//                         <div class="p-4 border rounded-lg">
//                             <p class="text-sm text-gray-500">المدفوعات المستحقة للممرضين</p>
//                             <p class="text-2xl font-bold text-red-600">125,000 ر.ي</p>
//                         </div>
//                         <div class="p-4 border rounded-lg">
//                             <p class="text-sm text-gray-500">النمو عن الشهر السابق</p>
//                             <p class="text-2xl font-bold text-green-600">+12%</p>
//                         </div>
//                     </div>
//                 </div>

//                 <div class="bg-white p-6 rounded-2xl shadow-lg">
//                     <h4 class="text-xl font-semibold mb-4 border-b pb-2">أداء الممرضين والتقييمات</h4>
//                     <p class="mb-4">متوسط التقييم العام للتطبيق: <span class="text-lg font-bold text-yellow-500">4.7</span> نجوم</p>
//                     <ul class="space-y-3">
//                         <li class="p-3 border rounded-lg flex justify-between items-center bg-green-50">
//                             <span>**أفضل ممرض تقييماً:** محمد الأحمد (4.9 نجمة) - تخصص: ما بعد العمليات</span>
//                             <span class="text-sm text-primary cursor-pointer hover:underline" onclick="alert('فتح ملف محمد الأحمد')">عرض الملف</span>
//                         </li>
//                         <li class="p-3 border rounded-lg flex justify-between items-center bg-red-50">
//                             <span>**ممرض بحاجة لمراجعة:** فاطمة علي (3.2 نجمة) - 3 شكاوى مؤخراً</span>
//                             <span class="text-sm text-primary cursor-pointer hover:underline" onclick="alert('عرض شكاوى فاطمة علي')">عرض الشكاوى</span>
//                         </li>
//                     </ul>
//                 </div>
//             </section>

//             <section id="settings" class="content-section hidden">
//                 <h3 class="text-2xl font-bold mb-6">الإعدادات العامة</h3>

//                 <div class="bg-white p-6 rounded-2xl shadow-lg space-y-6">
//                     <div>
//                         <h4 class="text-xl font-semibold mb-2 text-primary">إدارة حسابات المشرفين والصلاحيات</h4>
//                         <p class="text-gray-600 mb-4">هنا يمكنك تحديد من يملك صلاحية إدارة الممرضين، ومن يملك صلاحية رؤية التقارير المالية فقط.</p>
//                         <button class="bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300" onclick="alert('فتح صفحة إدارة صلاحيات المشرفين')">
//                             <i class="fas fa-users-cog ml-2"></i> تعديل الصلاحيات
//                         </button>
//                     </div>

//                     <div>
//                         <h4 class="text-xl font-semibold mb-2 text-primary">تعديل شروط الخدمة والنصوص</h4>
//                         <textarea class="w-full h-32 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mt-2" placeholder="أدخل نص شروط الخدمة هنا..."></textarea>
//                         <button class="mt-2 bg-primary text-white p-3 rounded-xl hover:bg-teal-600 transition-colors">
//                             <i class="fas fa-save ml-2"></i> حفظ الشروط
//                         </button>
//                     </div>

//                     <div>
//                         <h4 class="text-xl font-semibold mb-2 text-primary">إرسال إشعار جماعي</h4>
//                         <input type="text" class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mt-2" placeholder="عنوان الإشعار">
//                         <textarea class="w-full h-24 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mt-2" placeholder="نص الإشعار..."></textarea>
//                         <select class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mt-2">
//                             <option>إرسال إلى: جميع المستخدمين</option>
//                             <option>إرسال إلى: جميع الممرضين</option>
//                             <option>إرسال إلى: ممرضين محددين</option>
//                         </select>
//                         <button class="mt-2 bg-primary text-white p-3 rounded-xl hover:bg-teal-600 transition-colors">
//                             <i class="fas fa-paper-plane ml-2"></i> إرسال الآن
//                         </button>
//                     </div>
//                 </div>
//             </section>

//         </main>
//     </div>

//     <div id="detail-modal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-[999]" onclick="closeModal(event)">
//         <div class="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full transform transition-all duration-300 scale-95" onclick="event.stopPropagation()">
//             <div class="flex justify-between items-center border-b pb-4 mb-4">
//                 <h3 class="text-2xl font-bold text-gray-800" id="modal-title">تفاصيل الملف</h3>
//                 <button onclick="document.getElementById('detail-modal').classList.add('hidden')" class="text-gray-500 hover:text-gray-800">
//                     <i class="fas fa-times text-xl"></i>
//                 </button>
//             </div>
//             <div id="modal-content" class="space-y-4">
//                 </div>
//         </div>
//     </div>

//     <script>
//         // إعداد البيانات الوهمية (Mock Data)
//         // الأسعار بالريال اليمني (ر.ي)
//         const YEMENI_CURRENCY = 'ر.ي'; 
//         const mockData = {
//             patients: [
//                 { id: 1, name: 'سارة خالد', city: 'صنعاء', date: '2024-07-01', status: 'نشط', phone: '777123456' },
//                 { id: 2, name: 'أحمد سعيد', city: 'عدن', date: '2024-07-05', status: 'نشط', phone: '733987654' },
//                 { id: 3, name: 'فاطمة العلي', city: 'تعز', date: '2024-07-10', status: 'محظور', phone: '711555123' },
//             ],
//             nurses: {
//                 approved: [
//                     // تم إضافة الممرضين الرئيسيين الذين تم توصيف واجهاتهم
//                     { id: 101, name: 'محمد الأحمد', specialty: 'ما بعد العمليات', rating: 4.9, status: 'متاح', docs: ['صحيحة'] , phone: '770123456', email: 'mohammed@najd.com'},
//                     { id: 102, name: 'ليلى فهد', specialty: 'تصفية دورية', rating: 4.5, status: 'استراحة', docs: ['صحيحة'], phone: '735987654', email: 'layla@najd.com' },
//                     { id: 103, name: 'علي القحطاني', specialty: 'رعاية فردية', rating: 4.2, status: 'غير متصل', docs: ['صحيحة'], phone: '715555123', email: 'ali@najd.com' },
//                     { id: 104, name: 'فاطمة العودي', specialty: 'عناية بالجروح', rating: 4.7, status: 'متاح', docs: ['صحيحة'], phone: '771321456', email: 'fatima@najd.com' },
//                 ],
//                 pending: [
//                     { id: 201, name: 'نورة السالم', date: '2024-10-15', docs: ['مرفقة'] },
//                     { id: 202, name: 'خالد الزهراني', date: '2024-10-18', docs: ['مرفقة'] },
//                 ]
//             },
//             orders: [
//                 { id: 5001, service: 'تركيب كانجولا', nurse: 'محمد الأحمد', status: 'مكتمل', cost: 15000 },
//                 { id: 5002, service: 'رعاية ما بعد الولادة', nurse: 'ليلى فهد', status: 'قيد التنفيذ', cost: 90000 },
//                 { id: 5003, service: 'قياس السكر والضغط', nurse: 'غير محدد', status: 'قيد الانتظار', cost: 10000 },
//                 { id: 5004, service: 'ضرب إبرة', nurse: 'علي القحطاني', status: 'ملغي', cost: 8000 },
//                 { id: 5005, service: 'عناية بالجروح', nurse: 'فاطمة العودي', status: 'مكتمل', cost: 25000 },
//             ],
//             services: {
//                 care: [
//                     { name: 'ما بعد العمليات', desc: 'رعاية شاملة للحالات الحرجة.', price: '70,000 - 200,000' },
//                     { name: 'أمراض مزمنة', desc: 'إدارة شاملة لحالات السكري والضغط.', price: '60,000 - 180,000' },
//                     { name: 'حالات ولادة', desc: 'رعاية الأم والطفل حديث الولادة.', price: '100,000 - 300,000' }
//                 ],
//                 individual: [
//                     { name: 'ضرب إبرة', desc: 'حقن وريدي أو عضلي.', price: '8,000' },
//                     { name: 'تركيب كانجولا', desc: 'إجراء تركيب القنية الوريدية.', price: '15,000' },
//                     { name: 'قياس السكر والضغط', desc: 'خدمة قياس ومتابعة فورية.', price: '10,000' }
//                 ]
//             }
//         };

//         // ------------------ وظائف عامة ------------------
        
//         // عرض التاريخ الحالي
//         document.getElementById('current-date').textContent = new Date().toLocaleDateString('ar-EG', {
//             year: 'numeric', month: 'long', day: 'numeric'
//         });

//         // وظيفة التبديل بين الأقسام
//         function showSection(sectionId) {
//             // إخفاء جميع الأقسام
//             document.querySelectorAll('.content-section').forEach(section => {
//                 section.classList.add('hidden');
//             });
//             // إظهار القسم المطلوب
//             const activeSection = document.getElementById(sectionId);
//             if (activeSection) {
//                 activeSection.classList.remove('hidden');
//                 // تحديث عنوان الصفحة
//                 const menuItem = document.querySelector(`.menu-item[onclick*="${sectionId}"]`);
//                 if (menuItem) {
//                     document.getElementById('page-title').textContent = menuItem.querySelector('span').textContent;
//                 }
//                 // تحديث حالة القائمة الجانبية
//                 document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));
//                 menuItem.classList.add('active');

//                 // إعادة تحميل البيانات للقسم النشط
//                 if (sectionId === 'dashboard') loadDashboardMetrics();
//                 if (sectionId === 'nurses') renderNursesTable('approved');
//                 if (sectionId === 'patients') renderPatientsTable();
//                 if (sectionId === 'orders') renderOrdersTable('الكل');
//                 if (sectionId === 'services') renderServices();
//             }
//         }

//         // وظيفة فتح النافذة المنبثقة (Modal)
//         function openModal(title, content) {
//             document.getElementById('modal-title').textContent = title;
//             document.getElementById('modal-content').innerHTML = content;
//             document.getElementById('detail-modal').classList.remove('hidden');
//             document.getElementById('detail-modal').classList.add('flex');
//         }
        
//         // وظيفة إغلاق النافذة المنبثقة
//         function closeModal(event) {
//             if (event.target.id === 'detail-modal') {
//                 document.getElementById('detail-modal').classList.add('hidden');
//             }
//         }


//         // ------------------ 1. وظائف لوحة التحكم الرئيسية ------------------

//         function loadDashboardMetrics() {
//             // تحديث المقاييس
//             document.getElementById('total-patients').textContent = mockData.patients.length;
//             document.getElementById('total-nurses').textContent = mockData.nurses.approved.length;
//             document.getElementById('pending-orders').textContent = mockData.orders.filter(o => o.status === 'قيد الانتظار').length;
            
//             // حساب الإيرادات (افتراضياً 20% عمولة من الطلبات المكتملة)
//             const completedRevenue = mockData.orders
//                 .filter(o => o.status === 'مكتمل')
//                 .reduce((sum, order) => sum + order.cost, 0);
//             const totalRevenue = Math.round(completedRevenue * 0.20);
//             document.getElementById('total-revenue').textContent = `${totalRevenue.toLocaleString()} ${YEMENI_CURRENCY}`;

//             // توليد مخطط النمو (7 أيام)
//             const growthChart = document.getElementById('growth-chart');
//             growthChart.innerHTML = '';
//             const weeklyGrowth = [10, 15, 20, 18, 25, 30, 22]; // قيم وهمية لنمو المستخدمين
//             weeklyGrowth.forEach((value, index) => {
//                 const bar = document.createElement('div');
//                 const heightPercentage = (value / 30) * 100; // 30 هو القيمة القصوى
//                 bar.className = 'bar';
//                 bar.style.height = `${heightPercentage}%`;
//                 bar.title = `${value} تسجيل في يوم ${index + 1}`;
//                 growthChart.appendChild(bar);
//             });

//             // توليد توزيع حالة الطلبات (دائري بسيط)
//             const statusDistribution = document.getElementById('status-distribution');
//             statusDistribution.innerHTML = '';
//             const statusCounts = mockData.orders.reduce((acc, order) => {
//                 acc[order.status] = (acc[order.status] || 0) + 1;
//                 return acc;
//             }, {});

//             const statusColors = {
//                 'مكتمل': 'bg-green-500',
//                 'قيد التنفيذ': 'bg-blue-500',
//                 'قيد الانتظار': 'bg-yellow-500',
//                 'ملغي': 'bg-red-500'
//             };

//             Object.keys(statusCounts).forEach(status => {
//                 const count = statusCounts[status];
//                 const item = document.createElement('div');
//                 item.className = 'flex flex-col items-center p-3 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer';
//                 item.innerHTML = `
//                     <div class="w-10 h-10 rounded-full ${statusColors[status] || 'bg-gray-500'} flex items-center justify-center text-white text-lg font-bold">${count}</div>
//                     <p class="text-sm mt-2">${status}</p>
//                 `;
//                 statusDistribution.appendChild(item);
//             });
//         }


//         // ------------------ 2. وظائف إدارة الممرضين ------------------
        
//         // وظيفة عرض جدول الممرضين
//         function renderNursesTable(type) {
//             document.querySelectorAll('.nurse-tab-content').forEach(content => content.classList.add('hidden'));
//             document.querySelectorAll('.nurse-tab').forEach(tab => tab.classList.remove('active'));
            
//             document.getElementById(`${type}-nurses-list`).classList.remove('hidden');
//             document.querySelector(`.nurse-tab[data-tab="${type}"]`).classList.add('active');

//             const tableBody = document.getElementById(`${type}-nurses-table`);
//             tableBody.innerHTML = '';

//             if (type === 'approved') {
//                 mockData.nurses.approved.forEach(nurse => {
//                     const statusColor = nurse.status === 'متاح' ? 'bg-green-100 text-green-800' : nurse.status === 'استراحة' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800';
//                     const row = `
//                         <tr class="hover:bg-gray-50">
//                             <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${nurse.name}</td>
//                             <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${nurse.specialty}</td>
//                             <td class="px-6 py-4 whitespace-nowrap text-sm text-yellow-500">
//                                 ${nurse.rating} <i class="fas fa-star"></i>
//                             </td>
//                             <td class="px-6 py-4 whitespace-nowrap">
//                                 <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}">
//                                     ${nurse.status}
//                                 </span>
//                             </td>
//                             <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                 <button class="text-primary hover:text-teal-600 ml-3" onclick="showNurseDetails(${nurse.id}, 'approved')"><i class="fas fa-eye"></i> عرض</button>
//                                 <button class="text-red-600 hover:text-red-900" onclick="alert('حظر الممرض ${nurse.name}')"><i class="fas fa-ban"></i> حظر</button>
//                             </td>
//                         </tr>
//                     `;
//                     tableBody.innerHTML += row;
//                 });
//             } else if (type === 'pending') {
//                 mockData.nurses.pending.forEach(nurse => {
//                     const row = `
//                         <tr class="hover:bg-gray-50">
//                             <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${nurse.name}</td>
//                             <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${nurse.date}</td>
//                             <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
//                                     ${nurse.docs[0]}
//                                 </span>
//                             </td>
//                             <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                 <button class="text-primary hover:text-teal-600 ml-3" onclick="showNurseDetails(${nurse.id}, 'pending')"><i class="fas fa-file-check"></i> مراجعة الوثائق</button>
//                                 <button class="text-red-600 hover:text-red-900" onclick="alert('رفض تسجيل الممرض ${nurse.name}')"><i class="fas fa-times"></i> رفض</button>
//                             </td>
//                         </tr>
//                     `;
//                     tableBody.innerHTML += row;
//                 });
//             }
//         }
        
//         // وظيفة لعرض تفاصيل الممرض في النافذة المنبثقة
//         function showNurseDetails(id, type) {
//             const nurse = mockData.nurses[type].find(n => n.id === id);
//             let content = '';

//             if (nurse) {
//                 if (type === 'approved') {
//                     content = `
//                         <div class="flex items-center mb-4 pb-4 border-b">
//                             <i class="fas fa-user-nurse text-4xl text-primary ml-4"></i>
//                             <div>
//                                 <p class="text-lg font-bold">${nurse.name}</p>
//                                 <p class="text-sm text-gray-600">${nurse.specialty} - تقييم: ${nurse.rating} <i class="fas fa-star text-yellow-500"></i></p>
//                             </div>
//                         </div>
//                         <p><strong>الهاتف:</strong> ${nurse.phone}</p>
//                         <p><strong>البريد:</strong> ${nurse.email}</p>
//                         <p><strong>الحالة الحالية:</strong> <span class="font-semibold text-primary">${nurse.status}</span></p>
//                         <p><strong>عدد الطلبات المكتملة:</strong> 45</p>
//                         <div class="mt-4 pt-4 border-t flex justify-end space-x-2 space-x-reverse">
//                             <button class="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600" onclick="alert('حظر الممرض ${nurse.name}')">حظر الحساب</button>
//                             <button class="bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300" onclick="document.getElementById('detail-modal').classList.add('hidden')">إغلاق</button>
//                         </div>
//                     `;
//                 } else if (type === 'pending') {
//                     content = `
//                         <div class="flex items-center mb-4 pb-4 border-b">
//                             <i class="fas fa-user-nurse text-4xl text-primary ml-4"></i>
//                             <div>
//                                 <p class="text-lg font-bold">${nurse.name}</p>
//                                 <p class="text-sm text-gray-600">تاريخ التسجيل: ${nurse.date}</p>
//                             </div>
//                         </div>
//                         <h4 class="font-semibold text-primary mb-2">الوثائق المرفوعة:</h4>
//                         <ul class="list-disc list-inside space-y-1">
//                             <li>البطاقة الشخصية: <span class="text-green-600">تم الرفع</span></li>
//                             <li>شهادة التخرج: <span class="text-green-600">تم الرفع</span></li>
//                             <li>رخصة مزاولة المهنة: <span class="text-yellow-600">قيد المراجعة</span></li>
//                             <li>صورة شخصية: <span class="text-green-600">تم الرفع</span></li>
//                         </ul>
//                         <p class="mt-4 font-semibold text-red-600">ملاحظة: يجب مراجعة رخصة مزاولة المهنة يدوياً.</p>
//                         <div class="mt-4 pt-4 border-t flex justify-end space-x-2 space-x-reverse">
//                             <button class="bg-primary text-white p-2 rounded-lg hover:bg-teal-600" onclick="alert('قبول الممرض ${nurse.name}')">قبول</button>
//                             <button class="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600" onclick="alert('رفض الممرض ${nurse.name}')">رفض</button>
//                         </div>
//                     `;
//                 }
//             }

//             openModal(`تفاصيل ${type === 'approved' ? 'الممرض' : 'طلب التسجيل'}`, content);
//         }

//         // إعداد المستمع لتبديل التبويبات
//         document.addEventListener('DOMContentLoaded', () => {
//              document.querySelectorAll('.nurse-tab').forEach(tab => {
//                 tab.addEventListener('click', function() {
//                     renderNursesTable(this.dataset.tab);
//                 });
//             });
//         });


//         // ------------------ 3. وظائف إدارة المرضى ------------------

//         function renderPatientsTable() {
//             const tableBody = document.getElementById('patients-table');
//             tableBody.innerHTML = '';

//             mockData.patients.forEach(patient => {
//                 const statusColor = patient.status === 'نشط' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
//                 const row = `
//                     <tr class="hover:bg-gray-50">
//                         <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${patient.name}</td>
//                         <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${patient.city}</td>
//                         <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${patient.date}</td>
//                         <td class="px-6 py-4 whitespace-nowrap">
//                             <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}">
//                                 ${patient.status}
//                             </span>
//                         </td>
//                         <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                             <button class="text-primary hover:text-teal-600 ml-3" onclick="showPatientDetails(${patient.id})"><i class="fas fa-eye"></i> عرض</button>
//                             <button class="text-red-600 hover:text-red-900" onclick="alert('${patient.status === 'نشط' ? 'حظر' : 'تنشيط'} حساب ${patient.name}')">
//                                 <i class="fas ${patient.status === 'نشط' ? 'fa-ban' : 'fa-check'}"></i> ${patient.status === 'نشط' ? 'حظر' : 'تنشيط'}
//                             </button>
//                         </td>
//                     </tr>
//                 `;
//                 tableBody.innerHTML += row;
//             });
//         }
        
//         function showPatientDetails(id) {
//             const patient = mockData.patients.find(p => p.id === id);
//             if (patient) {
//                 const content = `
//                     <div class="flex items-center mb-4 pb-4 border-b">
//                         <i class="fas fa-user-injured text-4xl text-primary ml-4"></i>
//                         <div>
//                             <p class="text-lg font-bold">${patient.name}</p>
//                             <p class="text-sm text-gray-600">مدينة: ${patient.city}</p>
//                         </div>
//                     </div>
//                     <p><strong>رقم الهاتف:</strong> ${patient.phone}</p>
//                     <p><strong>تاريخ التسجيل:</strong> ${patient.date}</p>
//                     <p><strong>حالة الحساب:</strong> <span class="font-semibold text-primary">${patient.status}</span></p>
//                     <p><strong>عدد الطلبات الكلية:</strong> 7</p>
//                     <div class="mt-4 pt-4 border-t flex justify-end space-x-2 space-x-reverse">
//                         <button class="bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300" onclick="document.getElementById('detail-modal').classList.add('hidden')">إغلاق</button>
//                     </div>
//                 `;
//                 openModal('تفاصيل المريض', content);
//             }
//         }


//         // ------------------ 4. وظائف إدارة الطلبات ------------------

//         function renderOrdersTable(filterStatus) {
//             const tableBody = document.getElementById('orders-table');
//             tableBody.innerHTML = '';
            
//             // تحديث أزرار الفلترة
//             document.querySelectorAll('.order-filter-btn').forEach(btn => {
//                 btn.classList.remove('bg-primary', 'text-white', 'border-gray-300');
//                 btn.classList.add('bg-white', 'text-gray-700', 'border');
//                 if (btn.dataset.status === filterStatus) {
//                     btn.classList.add('bg-primary', 'text-white');
//                     btn.classList.remove('bg-white', 'text-gray-700', 'border', 'border-gray-300', 'hover:bg-gray-100');
//                 }
//             });


//             const filteredOrders = filterStatus === 'الكل' 
//                 ? mockData.orders 
//                 : mockData.orders.filter(o => o.status === filterStatus);

//             filteredOrders.forEach(order => {
//                 let statusColor;
//                 switch (order.status) {
//                     case 'مكتمل': statusColor = 'bg-green-100 text-green-800'; break;
//                     case 'قيد التنفيذ': statusColor = 'bg-blue-100 text-blue-800'; break;
//                     case 'قيد الانتظار': statusColor = 'bg-yellow-100 text-yellow-800'; break;
//                     case 'ملغي': statusColor = 'bg-red-100 text-red-800'; break;
//                     default: statusColor = 'bg-gray-100 text-gray-800';
//                 }

//                 const row = `
//                     <tr class="hover:bg-gray-50">
//                         <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#${order.id}</td>
//                         <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.service}</td>
//                         <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.nurse}</td>
//                         <td class="px-6 py-4 whitespace-nowrap">
//                             <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}">
//                                 ${order.status}
//                             </span>
//                         </td>
//                         <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">${order.cost.toLocaleString()} ${YEMENI_CURRENCY}</td>
//                         <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                             <button class="text-primary hover:text-teal-600" onclick="showOrderDetails(${order.id})"><i class="fas fa-info-circle"></i> التفاصيل</button>
//                         </td>
//                     </tr>
//                 `;
//                 tableBody.innerHTML += row;
//             });
//         }
        
//         // إعداد مستمعي الفلترة
//         document.addEventListener('DOMContentLoaded', () => {
//             document.querySelectorAll('.order-filter-btn').forEach(btn => {
//                 btn.addEventListener('click', function() {
//                     renderOrdersTable(this.dataset.status);
//                 });
//             });
//         });
        
//         function showOrderDetails(id) {
//              const order = mockData.orders.find(o => o.id === id);
//              if (order) {
//                  const content = `
//                     <p><strong>رقم الطلب:</strong> #${order.id}</p>
//                     <p><strong>الخدمة:</strong> ${order.service}</p>
//                     <p><strong>الممرض:</strong> ${order.nurse}</p>
//                     <p><strong>الحالة:</strong> <span class="font-semibold text-primary">${order.status}</span></p>
//                     <p><strong>التاريخ المتوقع:</strong> 2024-10-30</p>
//                     <p><strong>عنوان المريض:</strong> صنعاء، حي حدة</p>
//                     <p><strong>إجمالي التكلفة:</strong> <span class="font-bold text-lg text-green-600">${order.cost.toLocaleString()} ${YEMENI_CURRENCY}</span></p>
//                     <div class="mt-4 pt-4 border-t flex justify-end space-x-2 space-x-reverse">
//                         <button class="bg-primary text-white p-2 rounded-lg hover:bg-teal-600" onclick="alert('تعديل حالة الطلب #${order.id}')">تغيير الحالة</button>
//                         <button class="bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300" onclick="document.getElementById('detail-modal').classList.add('hidden')">إغلاق</button>
//                     </div>
//                 `;
//                  openModal(`تفاصيل الطلب #${order.id}`, content);
//              }
//         }


//         // ------------------ 5. وظائف إدارة الخدمات والتسعير ------------------

//         function renderServices() {
//             const careList = document.getElementById('care-services-list');
//             const individualList = document.getElementById('individual-services-list');
//             careList.innerHTML = '';
//             individualList.innerHTML = '';

//             const renderItem = (service) => {
//                 const item = document.createElement('div');
//                 item.className = 'flex justify-between items-center p-3 border rounded-lg bg-gray-50';
//                 item.innerHTML = `
//                     <div>
//                         <p class="font-semibold text-gray-800">${service.name}</p>
//                         <p class="text-sm text-gray-500">${service.desc}</p>
//                     </div>
//                     <div class="flex items-center">
//                         <span class="text-lg font-bold text-green-600 ml-4">${service.price.toLocaleString()} ${YEMENI_CURRENCY}</span>
//                         <button class="text-primary hover:text-teal-600" onclick="alert('تعديل خدمة ${service.name}')"><i class="fas fa-edit"></i></button>
//                     </div>
//                 `;
//                 return item;
//             };

//             mockData.services.care.forEach(service => careList.appendChild(renderItem(service)));
//             mockData.services.individual.forEach(service => individualList.appendChild(renderItem(service)));
//         }
        
//         // التشغيل الأولي
//         document.addEventListener('DOMContentLoaded', () => {
//             showSection('dashboard');
//         });
//     </script>
// </body>
// </html>
// `;


// const { width, height } = Dimensions.get('window');

// const AdminWebViewScreen: React.FC = () => {
//   return (
//     <View style={{ flex: 1, width: width, height: height, overflow: 'hidden' }}>
//       <WebView
//         originWhitelist={['*']}
//         source={{ html: htmlContent }}
//         style={{ flex: 1 }}
//         // يجب تعيين هذا الخيار على false لإظهار الروابط الخارجية مثل Tailwind CDN
//         setSupportMultipleWindows={false} 
//         javaScriptEnabled={true}
//         domStorageEnabled={true}
//       />
//     </View>
//   );
// };

// export default AdminWebViewScreen;