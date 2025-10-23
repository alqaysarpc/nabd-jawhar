

import React from 'react';

export type Role = 'user' | 'nurse';

export type MainTab = 'home' | 'allServices' | 'orders' | 'nurses' | 'profile';
export type NurseTab = 'dashboard' | 'requests' | 'schedule' | 'profile';
export type AdminPage = 'dashboard' | 'users' | 'appointments' | 'logs' | 'settings';

export type AvailabilityStatus = 'available' | 'busy' | 'offline' | 'on_break';

export interface Nurse {
    id: number;
    name: string;
    img: string;
    rating: number;
    specialty: string;
    experience: number;
    availability: 'available' | 'busy' | 'offline';
    languages: string[];
    arrivalTime?: number;
}

export interface Order {
    id: number;
    service: string;
    nurse: string;
    date: string;
    status: 'pending' | 'accepted' | 'completed';
}

export interface Service {
    id: string;
    name: string;
    description: string;
    // FIX: Changed type from React.ReactNode to React.ReactElement for better type safety with React.cloneElement.
    icon: React.ReactElement;
    category: string;
    longDescription: string;
    priceRange: string;
    requirements: string[];
}

export interface BookingConfirmationDetails {
    selectionType: 'auto' | 'manual';
    service: Service;
    patientCount: number;
    totalCost: number;
    date: string;
    time: string;
    notes: string;
    bookingFor: 'self' | 'other';
    recipientDetails?: {
        name: string;
        phone: string;
        relation: string;
        address: string;
    };
    hours?: number;
}

export interface JobRequest {
    id: number;
    service: string;
    serviceDescription: string;
    patientName: string;
    location: string;
    time: string;
    price: number;
    isUrgent: boolean;
    status: 'new' | 'accepted' | 'completed' | 'cancelled';
    date: string;
    patientInfo: {
        age: number;
        gender: string;
    };
    patientCount: number;
    address: string;
    notes?: string;
}

export interface Review {
    id: number;
    patientName: string;
    date: string;
    rating: number;
    comment: string;
}