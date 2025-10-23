import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import { Review } from '../types';

interface NurseReviewsScreenProps {
    reviews: Review[];
    onBack: () => void;
}

const NurseReviewsScreen: React.FC<NurseReviewsScreenProps> = ({ reviews, onBack }) => {
    const averageRating = reviews.length > 0
        ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
        : 'N/A';

    return (
        <div className="flex flex-col h-full bg-gray-50">
            <div className="p-4 flex items-center border-b bg-white sticky top-0 z-10">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100">
                    <ArrowRightIcon className="w-6 h-6 text-gray-600" />
                </button>
                <h1 className="text-xl font-bold text-gray-800 mx-auto">تقييماتي</h1>
            </div>

            <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {/* Summary */}
                <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
                    <p className="text-gray-500">متوسط التقييم العام</p>
                    <div className="flex items-center justify-center gap-2 mt-1">
                        <StarIcon className="w-8 h-8 text-yellow-400" />
                        <span className="text-4xl font-bold text-gray-800">{averageRating}</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">من {reviews.length} تقييم</p>
                </div>

                {/* Reviews List */}
                <div className="space-y-3">
                    {reviews.map(review => (
                        <div key={review.id} className="bg-white p-4 rounded-lg shadow-sm border">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-gray-800">{review.patientName}</h3>
                                    <p className="text-xs text-gray-400">{review.date}</p>
                                </div>
                                <div className="flex items-center flex-shrink-0">
                                    {[...Array(5)].map((_, i) => (
                                        <StarIcon
                                            key={i}
                                            className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 mt-2 pt-2 border-t border-dashed">
                                {review.comment}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NurseReviewsScreen;
