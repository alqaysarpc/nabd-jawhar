import React, { useState, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

interface RatingModalProps {
    orderId: number;
    onClose: () => void;
    onSubmit: () => void;
}

// Mock data to fetch nurse details based on orderId
const mockOrderDetails = {
    1: { nurseName: 'ماريا باجبير ', nurseImg: '/2.png', serviceName: 'قياس السكر بالدم' },
    4: { nurseName: ' شروق صالح', nurseImg: '/3.png', serviceName: 'تغيير على جرح' }
};

const RatingModal: React.FC<RatingModalProps> = ({ orderId, onClose, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [visible, setVisible] = useState(false);

    const orderInfo = mockOrderDetails[orderId as keyof typeof mockOrderDetails] || { nurseName: 'ممرض/ة', nurseImg: 'https://picsum.photos/seed/placeholder/80/80', serviceName: 'خدمة' };

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 10);
        return () => clearTimeout(timer);
    }, []);

    const handleStarClick = (index: number) => {
        setRating(index);
    };

    const handleClose = (e?: React.MouseEvent) => {
        if (e && e.target !== e.currentTarget) return;
        setVisible(false);
        setTimeout(onClose, 300);
    };
    
    const handleSubmit = () => {
        if (rating === 0) {
            alert('الرجاء تحديد تقييم.');
            return;
        }
        setVisible(false);
        setTimeout(onSubmit, 300);
    };

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
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">تقييم الخدمة</h2>
                    <button onClick={() => handleClose()} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                </div>
                
                <div className="flex flex-col items-center mb-4">
                    <img src={orderInfo.nurseImg} alt={orderInfo.nurseName} className="w-20 h-20 rounded-full mb-2 border-2 border-cyan-100" />
                    <p className="font-semibold text-gray-700">كيف كانت خدمة {orderInfo.serviceName}</p>
                    <p className="text-sm text-gray-500">مع الممرضة: {orderInfo.nurseName}؟</p>
                </div>

                <div className="flex justify-center items-center gap-2 mb-4" onMouseLeave={() => setHoverRating(0)}>
                    {[1, 2, 3, 4, 5].map(index => (
                        <StarIcon
                            key={index}
                            className={`w-10 h-10 cursor-pointer transition-colors ${
                                (hoverRating || rating) >= index ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                            onClick={() => handleStarClick(index)}
                            onMouseEnter={() => setHoverRating(index)}
                        />
                    ))}
                </div>

                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="أضف تعليقك هنا (اختياري)..."
                    className="w-full h-24 p-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                />

                <button 
                    onClick={handleSubmit}
                    className="w-full bg-cyan-500 text-white py-3 mt-4 rounded-lg font-bold text-lg shadow-md hover:bg-cyan-600 transition"
                >
                    إرسال التقييم
                </button>
            </div>
        </div>
    );
};

export default RatingModal;