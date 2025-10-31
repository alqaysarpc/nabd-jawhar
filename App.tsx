

import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import OnboardingScreen from './components/OnboardingScreen';
import AuthGatewayScreen from './components/AuthGatewayScreen';
import SignUpScreen from './components/SignUpScreen';
import LoginRoleSelection from './components/LoginRoleSelection';
import LoginScreen from './components/LoginScreen';
import SignUpUserScreen from './components/SignUpUserScreen';
import SignUpNurseScreen from './components/SignUpNurseScreen';
import MainLayout from './components/MainLayout';
import HomeScreen from './components/HomeScreen';
import AllServicesScreen from './components/AllServicesScreen';
import OrdersScreen from './components/OrdersScreen';
import NursesScreen from './components/NursesScreen';
import ProfileScreen from './components/ProfileScreen';
import ServiceDetailScreen from './components/ServiceDetailScreen';
import NurseProfileScreen from './components/NurseProfileScreen';
import BookingConfirmationScreen from './components/BookingConfirmationScreen';
import SearchResultsScreen from './components/SearchResultsScreen';
import NotificationsScreen from './components/NotificationsScreen';
import OrderDetailScreen from './components/OrderDetailScreen';
import EditProfileScreen from './components/EditProfileScreen';
import EditAddressScreen from './components/EditAddressScreen';
import HelpAndSupportScreen from './components/HelpAndSupportScreen';
import LanguageModal from './components/LanguageModal';
import BookingSuccessModal from './components/BookingSuccessModal';
import RatingModal from './components/RatingModal';
import CancellationModal from './components/CancellationModal';
import NurseTrackingScreen from './components/NurseTrackingScreen';
import LoginPromptModal from './components/LoginPromptModal';
import 'leaflet/dist/leaflet.css';


import NurseMainLayout from './components/NurseMainLayout';
import NurseDashboardScreen from './components/NurseDashboardScreen';
import NurseRequestsScreen from './components/NurseRequestsScreen';
import NurseScheduleScreen from './components/NurseScheduleScreen';
import NurseProfileScreenComponent from './components/NurseProfileScreenComponent';
import NurseRequestDetailScreen from './components/NurseRequestDetailScreen';
import AvailabilityStatusModal from './components/AvailabilityStatusModal';
import NurseReviewsScreen from './components/NurseReviewsScreen';
import NurseEditProfileScreen from './components/NurseEditProfileScreen';
import NurseDocumentsScreen from './components/NurseDocumentsScreen';
import NurseBankDetailsScreen from './components/NurseBankDetailsScreen';
import NurseEditAddressScreen from './components/NurseEditAddressScreen';
import AdminLayout from './components/admin/AdminLayout';
import AuthBranding from './components/AuthBranding';
import AdminDashboard from './components/AdminDashboard';


import { Role, MainTab, NurseTab, BookingConfirmationDetails, JobRequest, AvailabilityStatus, Review } from './types';

// Mock Data
const mockJobRequests: JobRequest[] = [
    { id: 1, service: 'قياس السكر بالدم', serviceDescription: 'فحص مستوى السكر في الدم', patientName: 'خالد عبدالعزيز', location: 'حي الخزان', time: 'فوري', price: 5000, isUrgent: true, status: 'new', date: '2024-08-05', patientInfo: { age: 65, gender: 'ذكر' }, patientCount: 1, address: 'حي الخزان، الشارع العام  ' },
    { id: 2, service: 'العناية بالجروح', serviceDescription: 'تغيير ضماد جرح قدم', patientName: 'سارة الفيصل', location: 'حي المساكن', time: '04:00 م', price: 10000, isUrgent: false, status: 'new', date: '2024-08-05', patientInfo: { age: 40, gender: 'أنثى' }, patientCount: 1, address: 'مقابل بيتزاء هاوس ' },
    { id: 98, service: 'العناية بالجروح', patientName: 'محمد علي', location: 'حي الثورة', time: '02:00 م', price: 8000, isUrgent: false, status: 'accepted', date: new Date().toISOString().split('T')[0], serviceDescription: 'وصف الخدمة هنا', patientInfo: { age: 50, gender: 'ذكر' }, patientCount: 1, address: 'مقبل مسجد الصفاء ' },
    { id: 99, service: 'رعاية كبار السن', patientName: 'فاطمة عبدالله', location: 'فوة الانشاءات', time: '05:30 م', price: 12000, isUrgent: false, status: 'accepted', date: new Date().toISOString().split('T')[0], serviceDescription: 'وصف الخدمة هنا', patientInfo: { age: 80, gender: 'أنثى' }, patientCount: 1, address: 'مقابل رئاسة الجامعة' },
    { id: 100, service: 'إعطاء حقنة عضل', patientName: 'أحمد الصالح', location: 'الديس ', time: '09:00 ص', price: 4000, isUrgent: false, status: 'completed', date: '2024-08-04', serviceDescription: 'وصف الخدمة هنا', patientInfo: { age: 30, gender: 'ذكر' }, patientCount: 1, address: 'مقابل ادارة المياة ' },
];

const mockReviews: Review[] = [
    { id: 1, patientName: 'أحمد الصالح', date: '2024-08-04', rating: 5, comment: 'خدمة ممتازة وسريعة، الممرضة كانت محترفة جداً.' },
    { id: 2, patientName: 'نورة إبراهيم', date: '2024-08-02', rating: 4, comment: 'جيد جداً، تأخرت قليلاً عن الموعد لكن الخدمة كانت رائعة.' },
];

type View =
  | { name: 'splash' }
  | { name: 'onboarding' }
  | { name: 'authGateway' }
  | { name: 'signUp' }
  | { name: 'loginRoleSelection' }
  | { name: 'login'; role: Role }
  | { name: 'signUpUser' }
  | { name: 'signUpNurse' }
  | { name: 'user_main'; tab: MainTab }
  | { name: 'user_notifications' }
  | { name: 'user_serviceDetail'; serviceId: string }
  | { name: 'user_nurseProfile'; nurseId: number }
  | { name: 'user_orderDetail'; orderId: number }
  | { name: 'user_booking'; serviceId: string; nurseId?: number | null }
  | { name: 'user_searchResults'; query: string }
  | { name: 'user_editProfile' }
  | { name: 'user_editAddress' }
  | { name: 'user_help' }
  | { name: 'nurse_main'; tab: NurseTab }
  | { name: 'nurse_requestDetail'; requestId: number }
  | { name: 'nurse_editProfile' }
  | { name: 'nurse_reviews' }
  | { name: 'nurse_documents' }
  | { name: 'nurse_editAddress' }
  | { name: 'nurse_help' }
  | { name: 'admin_main' };

const App: React.FC = () => {
    const [view, setView] = useState<View>({ name: 'splash' });
    const [isGuest, setIsGuest] = useState(false);
    const [isLoginPromptOpen, setLoginPromptOpen] = useState(false);
    const [isLanguageModalOpen, setLanguageModalOpen] = useState(false);
    const [bookingSuccessDetails, setBookingSuccessDetails] = useState<BookingConfirmationDetails | null>(null);
    const [ratingOrderId, setRatingOrderId] = useState<number | null>(null);
    const [cancelOrderId, setCancelOrderId] = useState<number | null>(null);
    const [trackOrderId, setTrackOrderId] = useState<number | null>(null);

    // Nurse State
    const [nurseAvailability, setNurseAvailability] = useState<AvailabilityStatus>('available');
    const [isAvailabilityModalOpen, setAvailabilityModalOpen] = useState(false);
    const [nurseRequests, setNurseRequests] = useState<JobRequest[]>(mockJobRequests);
    const [nurseRequestFilter, setNurseRequestFilter] = useState<"new" | "accepted" | "completed" | "all">('all');
    const [userAddress, setUserAddress] = useState({ city: 'المكلا', neighborhood: 'حي السكنه', details: 'الشارع الاول، مبنى 123' });
    const [nurseAddress, setNurseAddress] = useState({ city: 'المكلا', neighborhood: 'حي السلام', details: 'سكة يعقوب، مبنى 456' });

    useEffect(() => {
        if (view.name === 'splash') {
            const timer = setTimeout(() => setView({ name: 'onboarding' }), 2800);
            return () => clearTimeout(timer);
        }
    }, [view]);

    const handleLoginSuccess = (role: Role) => {
        setIsGuest(false);
        if (role === 'user') {
            setView({ name: 'user_main', tab: 'home' });
        } else {
            setView({ name: 'nurse_main', tab: 'dashboard' });
        }
    };
    
    const handleAdminLoginSuccess = () => {
        setView({ name: 'admin_main' });
    };

    const handleLogout = () => {
        setIsGuest(false);
        setView({ name: 'authGateway' });
    }

    const handleGuestClick = () => {
        setIsGuest(true);
        setView({ name: 'user_main', tab: 'home' });
    };

    const handleUserTabChange = (tab: MainTab) => {
        if (isGuest && (tab === 'orders' || tab === 'profile')) {
            setLoginPromptOpen(true);
        } else {
            setView({ name: 'user_main', tab });
        }
    };

    const handleNotificationsClick = () => {
        if (isGuest) {
            setLoginPromptOpen(true);
        } else {
            setView({ name: 'user_notifications' });
        }
    };

    const handleRequestBooking = (serviceId: string, nurseId?: number | null) => {
        if (isGuest) {
            setLoginPromptOpen(true);
        } else {
            setView({ name: 'user_booking', serviceId, nurseId });
        }
    };
    
    const renderAdminView = () => {
    if (view.name === 'admin_main') {
        return <AdminDashboard onLogout={handleLogout} />;
    }
    return null;
    };


    const renderUserView = () => {
        if (view.name.startsWith('user_')) {
            switch (view.name) {
                case 'user_main':
                    return (
                        <MainLayout activeTab={view.tab} onTabChange={handleUserTabChange} onNotificationsClick={handleNotificationsClick} isGuest={isGuest}>
                            {view.tab === 'home' && <HomeScreen onServiceSelect={(id) => setView({ name: 'user_serviceDetail', serviceId: id })} onViewProfile={(id) => setView({ name: 'user_nurseProfile', nurseId: id })} onSearch={(q) => setView({ name: 'user_searchResults', query: q })} onViewAllServices={() => handleUserTabChange('allServices')} />}
                            {view.tab === 'allServices' && <AllServicesScreen onServiceSelect={(id) => setView({ name: 'user_serviceDetail', serviceId: id })} />}
                            {view.tab === 'orders' && <OrdersScreen onViewDetails={(id) => setView({ name: 'user_orderDetail', orderId: id })} />}
                            {view.tab === 'nurses' && <NursesScreen onViewProfile={(id) => setView({ name: 'user_nurseProfile', nurseId: id })} />}
                            {view.tab === 'profile' && <ProfileScreen onLogout={handleLogout} onEditProfile={() => setView({ name: 'user_editProfile' })} onManageAddress={() => setView({name: 'user_editAddress'})} onLanguageChange={() => setLanguageModalOpen(true)} onHelpAndSupport={() => setView({ name: 'user_help' })} />}
                        </MainLayout>
                    );
                case 'user_notifications':
                     return (
                        <MainLayout activeTab={'home'} onTabChange={handleUserTabChange} onNotificationsClick={() => setView({ name: 'user_main', tab: 'home' })} isGuest={isGuest}>
                           <NotificationsScreen />
                        </MainLayout>
                    );
                case 'user_serviceDetail':
                    return <ServiceDetailScreen serviceId={view.serviceId} onBack={() => setView({ name: 'user_main', tab: 'allServices' })} onRequestBooking={(id) => handleRequestBooking(id)} isGuest={isGuest} />;
                case 'user_nurseProfile':
                    return <NurseProfileScreen nurseId={view.nurseId} onBack={() => setView({ name: 'user_main', tab: 'nurses' })} onRequestService={(nurseId) => alert(`Requesting service from nurse ${nurseId}`)} />;
                case 'user_orderDetail':
                    return <OrderDetailScreen orderId={view.orderId} onBack={() => setView({ name: 'user_main', tab: 'orders' })} onRateService={setRatingOrderId} onRequestCancelOrder={setCancelOrderId} onTrackNurse={setTrackOrderId} />;
                case 'user_booking':
                    // FIX: Corrected the argument passed to `setView`. The previous implementation used an invalid signature for a functional update. It now passes the state object directly.
                    return <BookingConfirmationScreen serviceId={view.serviceId} preselectedNurseId={view.nurseId} onBack={() => setView({ name: 'user_serviceDetail', serviceId: view.serviceId })} onConfirm={(details) => setBookingSuccessDetails(details)} userAddress={userAddress.details} />;
                case 'user_searchResults':
                    return <SearchResultsScreen query={view.query} onBack={() => setView({ name: 'user_main', tab: 'home' })} onServiceSelect={(id) => setView({ name: 'user_serviceDetail', serviceId: id })} onViewProfile={(id) => setView({ name: 'user_nurseProfile', nurseId: id })} />;
                case 'user_editProfile':
                    return <EditProfileScreen onBack={() => setView({name: 'user_main', tab: 'profile'})} onSave={() => {alert('Profile Saved!'); setView({name: 'user_main', tab: 'profile'})}} />;
                case 'user_editAddress':
                    return <EditAddressScreen address={userAddress} onBack={() => setView({name: 'user_main', tab: 'profile'})} onSave={(newAddr) => {setUserAddress(newAddr); alert('Address Saved!'); setView({name: 'user_main', tab: 'profile'})}} />;
                case 'user_help':
                     return <HelpAndSupportScreen onBack={() => setView({name: 'user_main', tab: 'profile'})} />;
                default: return <div>Not found</div>;
            }
        }
        return null;
    }
    
    const renderNurseView = () => {
        if (view.name.startsWith('nurse_')) {
            switch(view.name) {
                case 'nurse_main':
                    return (
                        <NurseMainLayout activeTab={view.tab} onTabChange={(tab) => setView({ name: 'nurse_main', tab })} currentStatus={nurseAvailability} onStatusChangeClick={() => setAvailabilityModalOpen(true)}>
                            {view.tab === 'dashboard' && <NurseDashboardScreen newRequests={nurseRequests.filter(r => r.status === 'new')} completedRequestsCount={nurseRequests.filter(r => r.status === 'completed').length} averageRating={4.8} totalEarnings={1250000} onViewRequestDetails={(id) => setView({ name: 'nurse_requestDetail', requestId: id })} onViewFilteredRequests={(filter) => {setNurseRequestFilter(filter); setView({name: 'nurse_main', tab: 'requests'})}} />}
                            {view.tab === 'requests' && <NurseRequestsScreen requests={nurseRequests} onViewDetails={(id) => setView({ name: 'nurse_requestDetail', requestId: id })} filter={nurseRequestFilter} onFilterChange={setNurseRequestFilter} />}
                            {view.tab === 'schedule' && <NurseScheduleScreen appointments={nurseRequests.filter(r => r.status === 'accepted')} />}
                            {view.tab === 'profile' && <NurseProfileScreenComponent reviews={mockReviews} onLogout={handleLogout} onEditProfile={() => setView({ name: 'nurse_editProfile' })} onViewReviews={() => setView({ name: 'nurse_reviews' })} onManageDocuments={() => setView({ name: 'nurse_documents' })} onManageAddress={() => setView({ name: 'nurse_editAddress' })} onHelpAndSupport={() => setView({ name: 'nurse_help' })} />}
                        </NurseMainLayout>
                    );
                case 'nurse_requestDetail':
                    const request = nurseRequests.find(r => r.id === view.requestId);
                    if (!request) return <div>Request not found</div>;
                    return <NurseRequestDetailScreen 
                        request={request}
                        onBack={() => setView({ name: 'nurse_main', tab: 'requests' })}
                        onAccept={(id) => {setNurseRequests(reqs => reqs.map(r => r.id === id ? {...r, status: 'accepted'} : r)); setView({ name: 'nurse_main', tab: 'requests' })}}
                        onReject={(id) => {setNurseRequests(reqs => reqs.map(r => r.id === id ? {...r, status: 'cancelled'} : r)); setView({ name: 'nurse_main', tab: 'requests' })}}
                        onStartNavigation={id => alert(`Navigating to request ${id}`)}
                        onMarkAsCompleted={(id) => {setNurseRequests(reqs => reqs.map(r => r.id === id ? {...r, status: 'completed'} : r)); setView({ name: 'nurse_main', tab: 'requests' })}}
                    />;
                case 'nurse_reviews':
                    return <NurseReviewsScreen reviews={mockReviews} onBack={() => setView({ name: 'nurse_main', tab: 'profile' })} />;
                case 'nurse_editProfile':
                    return <NurseEditProfileScreen onBack={() => setView({ name: 'nurse_main', tab: 'profile' })} onSave={() => {alert('Profile Saved!'); setView({ name: 'nurse_main', tab: 'profile' })}} />;
                case 'nurse_documents':
                    return <NurseDocumentsScreen onBack={() => setView({ name: 'nurse_main', tab: 'profile' })} />;
                case 'nurse_editAddress':
                    return <NurseEditAddressScreen address={nurseAddress} onBack={() => setView({name: 'nurse_main', tab: 'profile'})} onSave={(newAddr) => {setNurseAddress(newAddr); alert('Address Saved!'); setView({name: 'nurse_main', tab: 'profile'})}} />;
                // FIX: The argument to `setView` was an incorrect functional update `() => ({...})`. It has been corrected to pass the state object directly, which resolves the TypeScript error.
                case 'nurse_help':
                    return <HelpAndSupportScreen onBack={() => setView({ name: 'nurse_main', tab: 'profile' })} />;
                default: return <div>Not found</div>;
            }
        }
        return null;
    }

    const renderModals = () => (
        <>
            {isLanguageModalOpen && <LanguageModal onClose={() => setLanguageModalOpen(false)} />}
            {bookingSuccessDetails && <BookingSuccessModal 
                bookingDetails={{
                    serviceName: bookingSuccessDetails.service.name, 
                    patientCount: bookingSuccessDetails.patientCount, 
                    totalCost: bookingSuccessDetails.totalCost, 
                    selectionType: bookingSuccessDetails.selectionType,
                    bookingFor: bookingSuccessDetails.bookingFor,
                    recipientDetails: bookingSuccessDetails.recipientDetails
                }} 
                onClose={() => {setBookingSuccessDetails(null); setView({ name: 'user_main', tab: 'orders' });}} 
                onBookAnother={() => {setBookingSuccessDetails(null); setView({ name: 'user_main', tab: 'allServices' });}} 
            />}
            {ratingOrderId && <RatingModal orderId={ratingOrderId} onClose={() => setRatingOrderId(null)} onSubmit={() => {alert('Thank you for your feedback!'); setRatingOrderId(null);}} />}
            {cancelOrderId && <CancellationModal orderId={cancelOrderId} onClose={() => setCancelOrderId(null)} onConfirm={(_details) => {alert('Order cancelled.'); setCancelOrderId(null);}} />}
            {trackOrderId && <NurseTrackingScreen orderId={trackOrderId} onBack={() => setTrackOrderId(null)} />}
            {isAvailabilityModalOpen && <AvailabilityStatusModal currentStatus={nurseAvailability} onClose={() => setAvailabilityModalOpen(false)} onUpdateStatus={(status) => {setNurseAvailability(status); setAvailabilityModalOpen(false);}} />}
        </>
    );

    const renderContent = () => {
        const adminView = renderAdminView();
        if (adminView) return adminView;

        const authFormViews: View['name'][] = ['signUp', 'loginRoleSelection', 'login', 'signUpUser', 'signUpNurse'];
        if (authFormViews.includes(view.name)) {
            let authScreenComponent;
            switch (view.name) {
                case 'signUp':
                    authScreenComponent = <SignUpScreen onBack={() => setView({ name: 'authGateway' })} onSelectRole={(role) => setView({ name: role === 'user' ? 'signUpUser' : 'signUpNurse' })} />;
                    break;
                case 'loginRoleSelection':
                    authScreenComponent = <LoginRoleSelection onBack={() => setView({ name: 'authGateway' })} onSelectRole={(role) => setView({ name: 'login', role })} />;
                    break;
                case 'login':
                    authScreenComponent = <LoginScreen role={view.role} onBack={() => setView({ name: 'loginRoleSelection' })} onLoginSuccess={handleLoginSuccess} onAdminLoginSuccess={handleAdminLoginSuccess} />;
                    break;
                case 'signUpUser':
                    authScreenComponent = <SignUpUserScreen onBack={() => setView({ name: 'signUp' })} onSignUpSuccess={() => handleLoginSuccess('user')} />;
                    break;
                case 'signUpNurse':
                    authScreenComponent = <SignUpNurseScreen onBack={() => setView({ name: 'signUp' })} onSignUpSuccess={() => handleLoginSuccess('nurse')} />;
                    break;
            }

            return authScreenComponent;
        }

        const userView = renderUserView();
        if (userView) return userView;
        
        const nurseView = renderNurseView();
        if (nurseView) return nurseView;

        switch (view.name) {
            case 'splash': return <SplashScreen />;
            case 'onboarding': return <OnboardingScreen onComplete={() => setView({ name: 'authGateway' })} />;
            case 'authGateway': return <AuthGatewayScreen onLoginClick={() => setView({ name: 'loginRoleSelection' })} onSignUpClick={() => setView({ name: 'signUp' })} onGuestClick={handleGuestClick} />;
            default: return <div>Not Found</div>;
        }
    }
    
    const isAdminView = view.name === 'admin_main';

    const containerClasses = `h-screen w-full relative ${
        isAdminView ? 'bg-gray-100 dark:bg-gray-900' : 'bg-white'
    }`;
    const mainAreaClasses = `h-screen w-full relative bg-white`;

    return (
        <div className={containerClasses}>
            <div className={mainAreaClasses}>
                {renderContent()}
                {(view.name.startsWith('user_') || view.name.startsWith('nurse_')) && renderModals()}
                <LoginPromptModal 
                    isOpen={isLoginPromptOpen}
                    onClose={() => setLoginPromptOpen(false)}
                    onLogin={() => {
                        setLoginPromptOpen(false);
                        setView({ name: 'loginRoleSelection' });
                    }}
                    onSignUp={() => {
                        setLoginPromptOpen(false);
                        setView({ name: 'signUp' });
                    }}
                />
            </div>
        </div>
    );
}

export default App;
