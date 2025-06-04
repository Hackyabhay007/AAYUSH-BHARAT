import { useState, useCallback } from 'react';
import DatabaseService, { AddressDocument, AddressData } from '@/services/DatabaseService';

export const useAddresses = () => {
    const [addresses, setAddresses] = useState<AddressDocument[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<AddressDocument | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAddresses = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            
            const userId = localStorage.getItem("userid");
            if (!userId) {
                throw new Error('Not logged in');
            }

            const fetchedAddresses = await DatabaseService.getUserAddresses(userId);
            setAddresses(fetchedAddresses);
            
            // Set default address if available
            if (fetchedAddresses.length > 0) {
                const defaultAddr = fetchedAddresses.find((addr) => addr.is_default) || fetchedAddresses[0];
                setSelectedAddress(defaultAddr);
            }
        } catch (error) {
            console.error('Error fetching addresses:', error);
            setError('Failed to load addresses. Please try again.');
        } finally {
            setLoading(false);
        }
    }, []);    const addAddress = useCallback(async (addressData: Omit<AddressDocument, "$id" | "userId">) => {
        try {
            setError(null);
            const userId = localStorage.getItem("userid");
            if (!userId) {
                throw new Error('Not logged in');
            }

            // We know addressData has all required fields except userId            // addressData has all fields except userId since we omitted it
            const fullAddressData: AddressData = {
                full_name: addressData.full_name,
                address_line1: addressData.address_line1,
                address_line2: addressData.address_line2,
                city: addressData.city,
                state: addressData.state,
                pincode: addressData.pincode,
                type: addressData.type,
                mobile: addressData.mobile,
                country: addressData.country || 'IN',
                userId,
                is_default: addresses.length === 0 // Make first address default
            };

            const createdAddress = await DatabaseService.createAddress(fullAddressData);
            setAddresses(prev => [...prev, createdAddress]);
            setSelectedAddress(createdAddress);

            return createdAddress;
        } catch (error) {
            console.error('Error adding address:', error);
            setError('Failed to save address. Please try again.');
            throw error;
        }
    }, [addresses]);

    return {
        addresses,
        selectedAddress,
        loading,
        error,
        fetchAddresses,
        addAddress,
        setSelectedAddress
    };
};
