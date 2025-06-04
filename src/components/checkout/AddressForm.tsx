import React, { useState } from 'react';
import { Address } from '@/types/customer';
import { motion } from 'framer-motion';

interface AddressFormProps {
    onSubmit: (address: Address) => void;
    initialData?: Partial<Address>;
    userPhone?: string;
    onUpdatePhone?: (phone: string) => void;
}

const AddressForm = ({ onSubmit, initialData, userPhone, onUpdatePhone }: AddressFormProps) => {
    const [formData, setFormData] = useState({
        full_name: initialData?.full_name || '',
        mobile: initialData?.mobile || userPhone || '',
        address_line1: initialData?.address_line1 || '',
        address_line2: initialData?.address_line2 || '',
        city: initialData?.city || '',
        state: initialData?.state || '',
        pincode: initialData?.pincode || '',
        type: initialData?.type || 'home' as const,
        is_default: initialData?.is_default || false
    });

    const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});

    const validateForm = () => {
        const newErrors: Partial<Record<keyof typeof formData, string>> = {};
        
        if (!formData.full_name) newErrors.full_name = 'Name is required';
        if (!formData.mobile) newErrors.mobile = 'Phone number is required';
        else if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = 'Invalid phone number';
        if (!formData.address_line1) newErrors.address_line1 = 'Address is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.pincode) newErrors.pincode = 'Pincode is required';
        else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Invalid pincode';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData as Address);
        }
    };

    const validatePhone = (phone: string) => {
        return /^\d{10}$/.test(phone);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPhone = e.target.value;
        setFormData(prev => ({ ...prev, mobile: newPhone }));
        if (validatePhone(newPhone) && onUpdatePhone) {
            onUpdatePhone(newPhone);
        }
    };

    const inputClasses = "relative overflow-hidden bg-[#f9f5e9] group/input focus-within:shadow-premium-soft transition-all duration-300 mt-1 block w-full rounded-md border-gray-300";
    const inputShineClasses = "absolute inset-0 bg-gold-shimmer -translate-x-full group-focus-within/input:translate-x-full transition-all duration-1000 opacity-20 pointer-events-none";

    return (
        <form onSubmit={handleSubmit} className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <div className={inputClasses}>
                        <div className={inputShineClasses}></div>
                        <input
                            type="text"
                            value={formData.full_name}
                            onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                            className="w-full px-4 py-2 bg-transparent outline-none"
                        />
                    </div>
                    {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <div className={inputClasses}>
                        <div className={inputShineClasses}></div>
                        <input
                            type="tel"
                            value={formData.mobile}
                            onChange={handlePhoneChange}
                            className="w-full px-4 py-2 bg-transparent outline-none"
                            maxLength={10}
                        />
                    </div>
                    {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Address Line 1</label>
                <div className={inputClasses}>
                    <div className={inputShineClasses}></div>
                    <input
                        type="text"
                        value={formData.address_line1}
                        onChange={(e) => setFormData(prev => ({ ...prev, address_line1: e.target.value }))}
                        className="w-full px-4 py-2 bg-transparent outline-none"
                    />
                </div>
                {errors.address_line1 && <p className="text-red-500 text-xs mt-1">{errors.address_line1}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Address Line 2 (Optional)</label>
                <div className={inputClasses}>
                    <div className={inputShineClasses}></div>
                    <input
                        type="text"
                        value={formData.address_line2}
                        onChange={(e) => setFormData(prev => ({ ...prev, address_line2: e.target.value }))}
                        className="w-full px-4 py-2 bg-transparent outline-none"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <div className={inputClasses}>
                        <div className={inputShineClasses}></div>
                        <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                            className="w-full px-4 py-2 bg-transparent outline-none"
                        />
                    </div>
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">State</label>
                    <div className={inputClasses}>
                        <div className={inputShineClasses}></div>
                        <input
                            type="text"
                            value={formData.state}
                            onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                            className="w-full px-4 py-2 bg-transparent outline-none"
                        />
                    </div>
                    {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Pincode</label>
                    <div className={inputClasses}>
                        <div className={inputShineClasses}></div>
                        <input
                            type="text"
                            value={formData.pincode}
                            onChange={(e) => setFormData(prev => ({ ...prev, pincode: e.target.value }))}
                            className="w-full px-4 py-2 bg-transparent outline-none"
                        />
                    </div>
                    {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Address Type</label>
                    <div className={inputClasses}>
                        <div className={inputShineClasses}></div>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as 'home' | 'office' }))}
                            className="w-full px-4 py-2 bg-transparent outline-none"
                        >
                            <option value="home">Home</option>
                            <option value="office">Office</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="flex items-center mt-4">
                <input
                    type="checkbox"
                    checked={formData.is_default}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_default: e.target.checked }))}
                    className="rounded border-gray-300 text-gray-600 focus:ring-green-500"
                />
                <label className="ml-2 text-sm text-gray-700">Set as default address</label>
            </div>

            <motion.button
                type="submit"
                whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(212, 160, 93, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden w-full px-8 py-3 mt-6 bg-gradient-to-r from-gray-700 to-gray-600 
                    text-white rounded-lg font-medium shadow-gray-glow group"
            >
                <span className="absolute inset-0 w-full bg-gray-200 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                <span className="relative z-10">Save Address</span>
            </motion.button>
        </form>
    );
};

export default AddressForm;