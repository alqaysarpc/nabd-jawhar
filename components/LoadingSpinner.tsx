import React from 'react';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex justify-center items-center py-12">
            <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent border-dashed rounded-full animate-spin"></div>
        </div>
    );
};

export default LoadingSpinner;
