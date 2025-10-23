

import React, { useEffect, useState } from 'react';
import { CheckCircleIcon } from './icons';

interface BookingDetails {
    selectionType: 'auto' | 'manual';
    serviceName: string;
    patientCount: number;
    totalCost: number;
    bookingFor: 'self' | 'other';
    recipientDetails?: {
        name: string;
    };
    hours?: number;
}

interface BookingSuccessModalProps {
    onClose: () => void;
    onBookAnother: () => void;
    bookingDetails: BookingDetails;
}

const BookingSuccessModal: React.FC<BookingSuccessModalProps> = ({ onClose, onBookAnother, bookingDetails }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Trigger animation on mount
        const timer = setTimeout(() => setVisible(true), 10);
        return () => clearTimeout(timer);
    }, []);

    const { selectionType, serviceName, patientCount, totalCost, bookingFor, recipientDetails, hours } = bookingDetails;
    const title = "تم تأكيد الحجز!";
    const description = bookingFor === 'other'
        ? `تم تأكيد طلبك لـ ${recipientDetails?.name || 'شخص آخر'}. ${selectionType === 'auto' ? 'سيتم البحث عن أفضل ممرض للخدمة.' : 'سيتم إشعار الممرض الذي اخترته بطلبك.'} يمكنك متابعة الحالة من شاشة الطلبات.`
        : `تم تأكيد طلبك. ${selectionType === 'auto' ? 'سيتم البحث عن أفضل ممرض لخدمتك.' : 'سيتم إشعار الممرض الذي اخترته بطلبك.'} يمكنك متابعة حالة طلبك من شاشة "الطلبات".`;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 transition-opacity duration-300"
             style={{ opacity: visible ? 1 : 0 }}
        >
            <div className={`bg-white rounded-2xl p-6 w-full max-w-sm text-center transform transition-all duration-300 ease-out ${visible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
                <div className="w-24 h-24 mx-auto flex items-center justify-center bg-green-100 rounded-full">
                    <CheckCircleIcon className="w-16 h-16 text-green-500 animate-check-in" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-2">{title}</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
                
                {/* Mini Invoice */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 my-6 text-sm text-right space-y-2">
                    {bookingFor === 'other' && recipientDetails && (
                        <div className="flex justify-between">
                            <span className="text-gray-500">الخدمة لـ:</span>
                            <span className="font-semibold text-gray-800">{recipientDetails.name}</span>
                        </div>
                    )}
                    <div className="flex justify-between">
                        <span className="text-gray-500">الخدمة:</span>
                        <span className="font-semibold text-gray-800">{serviceName}</span>
                    </div>
                    {hours && (
                         <div className="flex justify-between">
                            <span className="text-gray-500">المدة:</span>
                            <span className="font-semibold text-gray-800">{hours} ساعات</span>
                        </div>
                    )}
                    <div className="flex justify-between">
                        <span className="text-gray-500">عدد المرضى:</span>
                        <span className="font-semibold text-gray-800">{patientCount}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-dashed">
                        <span className="font-bold text-gray-600">الإجمالي:</span>
                        <span className="font-bold text-cyan-600">{totalCost.toLocaleString('ar-SA')} ﷼</span>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <button onClick={onClose} className="w-full bg-cyan-500 text-white py-3 rounded-lg font-bold text-lg shadow-md hover:bg-cyan-600 transition">
                        عرض طلباتي
                    </button>
                    <button onClick={onBookAnother} className="w-full bg-gray-100 text-cyan-600 py-3 rounded-lg font-bold text-lg hover:bg-gray-200 transition">
                        حجز خدمة أخرى
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingSuccessModal;