import React, { useState, useEffect } from 'react';
import { TrashIcon } from './icons';

interface CancellationModalProps {
    orderId: number;
    onClose: () => void;
    onConfirm: (details: { reason: string; otherReason?: string }) => void;
}

const cancellationReasons = [
    'لم أعد بحاجة للخدمة',
    'وجدت خياراً آخر',
    'الحجز عن طريق الخطأ',
    'أخرى',
];

const CancellationModal: React.FC<CancellationModalProps> = ({ orderId, onClose, onConfirm }) => {
    const [reason, setReason] = useState('');
    const [otherReason, setOtherReason] = useState('');
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 10);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = (e?: React.MouseEvent) => {
        if (e && e.target !== e.currentTarget) return;
        setVisible(false);
        setTimeout(onClose, 300);
    };
    
    const handleConfirm = () => {
        if (!reason) {
            alert('الرجاء تحديد سبب الإلغاء.');
            return;
        }
        if (reason === 'أخرى' && !otherReason.trim()) {
            alert('الرجاء كتابة سبب الإلغاء.');
            return;
        }
        setVisible(false);
        setTimeout(() => onConfirm({ reason, otherReason }), 300);
    };
    
    const isConfirmDisabled = !reason || (reason === 'أخرى' && !otherReason.trim());

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 transition-opacity duration-300"
            style={{ opacity: visible ? 1 : 0 }}
            onClick={handleClose}
        >
            <div 
                className={`bg-white rounded-2xl p-6 w-full max-w-sm text-center transform transition-all duration-300 ease-out ${visible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-20 h-20 mx-auto flex items-center justify-center bg-red-100 rounded-full">
                    <TrashIcon className="w-10 h-10 text-red-500" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mt-4">إلغاء الطلب</h2>
                <p className="text-gray-600 text-sm mt-2">هل أنت متأكد من رغبتك في إلغاء الطلب رقم #{orderId}؟</p>

                <div className="text-right my-6">
                    <h3 className="font-semibold text-gray-700 mb-3">سبب الإلغاء:</h3>
                    <div className="space-y-3">
                        {cancellationReasons.map(r => (
                            <label key={r} className="flex items-center space-x-3 space-x-reverse cursor-pointer">
                                <input 
                                    type="radio" 
                                    name="cancellation-reason" 
                                    value={r}
                                    checked={reason === r}
                                    onChange={() => setReason(r)}
                                    className="h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500"
                                />
                                <span className="text-gray-700">{r}</span>
                            </label>
                        ))}
                    </div>
                    {reason === 'أخرى' && (
                        <textarea
                            value={otherReason}
                            onChange={(e) => setOtherReason(e.target.value)}
                            placeholder="الرجاء توضيح السبب..."
                            className="w-full h-20 p-2 mt-3 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                        />
                    )}
                </div>

                <div className="flex flex-col gap-3">
                    <button 
                        onClick={handleConfirm}
                        disabled={isConfirmDisabled}
                        className="w-full bg-red-500 text-white py-3 rounded-lg font-bold text-lg shadow-md hover:bg-red-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        تأكيد الإلغاء
                    </button>
                    <button onClick={() => handleClose()} className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-bold text-lg hover:bg-gray-200 transition">
                        المحافظة على الطلب
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CancellationModal;
