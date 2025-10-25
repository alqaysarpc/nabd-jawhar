
import React, { useState } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { BanknotesIcon } from './icons';

interface NurseBankDetailsScreenProps {
    onBack: () => void;
    onSave: () => void;
}

const InputField = ({ label, value, onChange, placeholder }: { label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder?: string }) => (
    <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">{label}</label>
        <input 
            type="text" 
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
        />
    </div>
);

const NurseBankDetailsScreen: React.FC<NurseBankDetailsScreenProps> = ({ onBack, onSave }) => {
    const [accountHolder, setAccountHolder] = useState(' خولة بارجاش ');
    const [iban, setIban] = useState('YE******************1234');
    const [bankName, setBankName] = useState('البنك اليمني ');

    return (
        <div className="flex flex-col h-full bg-gray-50">
            <div className="p-4 flex items-center border-b bg-white sticky top-0 z-10">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100">
                    <ArrowRightIcon className="w-6 h-6 text-gray-600" />
                </button>
                <h1 className="text-xl font-bold text-gray-800 mx-auto">البيانات البنكية</h1>
            </div>

            <div className="flex-grow overflow-y-auto p-4 space-y-4">
                <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border">
                    <div className="w-16 h-16 flex items-center justify-center bg-teal-50 text-teal-500 rounded-full">
                        <BanknotesIcon className="w-8 h-8" />
                    </div>
                    <p className="mt-4 text-center text-gray-600">
                        أضف بياناتك البنكية لاستلام أرباحك بشكل آمن ومباشر.
                    </p>
                </div>
                
                <form className="bg-white p-4 rounded-lg shadow-sm border space-y-4 text-right">
                    <InputField label="اسم صاحب الحساب (مطابق للهوية)" value={accountHolder} onChange={(e) => setAccountHolder(e.target.value)} />
                    <InputField label="رقم الآيبان (IBAN)" value={iban} onChange={(e) => setIban(e.target.value)} placeholder="SAXXXXXXXXXXXXXXXXXXXXXX" />
                    <InputField label="اسم البنك" value={bankName} onChange={(e) => setBankName(e.target.value)} />
                </form>
            </div>

            <div className="p-4 bg-white border-t sticky bottom-0">
                <button onClick={onSave} className="w-full bg-teal-500 text-white py-3 rounded-lg font-bold text-lg shadow-md hover:bg-teal-600 transition">
                    حفظ البيانات
                </button>
            </div>
        </div>
    );
};

export default NurseBankDetailsScreen;
