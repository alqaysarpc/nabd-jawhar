import React, { useState } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { MapPinIcon } from './icons';

interface EditAddressScreenProps {
    address: { city: string, neighborhood: string, details: string };
    onBack: () => void;
    onSave: (newAddress: { city: string, neighborhood: string, details: string }) => void;
}

const InputField = ({ label, value, onChange, placeholder }: { label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder?: string }) => (
    <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">{label}</label>
        <input 
            type="text" 
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
        />
    </div>
);

const EditAddressScreen: React.FC<EditAddressScreenProps> = ({ address, onBack, onSave }) => {
    const [city, setCity] = useState(address.city);
    const [neighborhood, setNeighborhood] = useState(address.neighborhood);
    const [details, setDetails] = useState(address.details);

    const handleSave = () => {
        onSave({ city, neighborhood, details });
    };

    return (
        <div className="flex flex-col h-full bg-gray-50">
            <div className="p-4 flex items-center border-b bg-white sticky top-0 z-10">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100">
                    <ArrowRightIcon className="w-6 h-6 text-gray-600" />
                </button>
                <h1 className="text-xl font-bold text-gray-800 mx-auto">تعديل العنوان</h1>
            </div>

            <div className="flex-grow overflow-y-auto p-4 md:p-6 lg:p-8 flex flex-col items-center">
                <form className="bg-white p-4 md:p-6 rounded-lg shadow-sm border space-y-4 text-right w-full max-w-lg">
                    <InputField label="المدينة" value={city} onChange={(e) => setCity(e.target.value)} placeholder="مثال: الرياض" />
                    <InputField label="الحي" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} placeholder="مثال: حي الياسمين" />
                    <InputField label="العنوان التفصيلي" value={details} onChange={(e) => setDetails(e.target.value)} placeholder="اسم الشارع، رقم المبنى..." />
                    
                    <button type="button" className="w-full flex items-center justify-center gap-2 bg-sky-100 text-sky-700 py-2.5 mt-4 rounded-lg font-semibold hover:bg-sky-200 transition">
                       <MapPinIcon />
                        تحديد الموقع الجغرافي الحالي
                    </button>
                </form>
            </div>

            <div className="p-4 bg-white border-t sticky bottom-0">
                <button onClick={handleSave} className="w-full bg-cyan-500 text-white py-3 rounded-lg font-bold text-lg shadow-md hover:bg-cyan-600 transition">
                    حفظ التغييرات
                </button>
            </div>
        </div>
    );
};

export default EditAddressScreen;