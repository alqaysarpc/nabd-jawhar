import React from 'react';

// Illustration for User/Patient Welcome/Auth screens
export const UserWelcomeIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 300 250" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#clip0_user)">
      <rect width="300" height="250" rx="20" fill="#F0FDFA"/>

      {/* Sofa */}
      <rect x="40" y="150" width="220" height="50" rx="10" fill="#CFFAFE"/>
      <rect x="45" y="145" width="210" height="15" rx="7.5" fill="#A5F3FC"/>
      <rect x="50" y="200" width="20" height="10" rx="5" fill="#0891B2"/>
      <rect x="230" y="200" width="20" height="10" rx="5" fill="#0891B2"/>

      {/* Patient Character */}
      <g transform="translate(180, 100)">
        <rect y="10" width="50" height="50" rx="25" fill="#E0F2FE"/>
        <circle cx="25" cy="10" r="15" fill="#06B6D4"/>
        <rect x="15" y="55" width="20" height="30" rx="10" fill="#E0F2FE"/>
      </g>
      
      {/* Nurse Character */}
      <g transform="translate(80, 80)">
        <rect y="30" width="55" height="70" rx="15" fill="#FFFFFF"/>
        <circle cx="27.5" cy="15" r="15" fill="#A5F3FC"/>
        <path d="M20 15 L35 15 M27.5 7.5 L27.5 22.5" stroke="#0891B2" strokeWidth="2" strokeLinecap="round"/>
        <rect x="10" y="95" width="15" height="30" rx="7.5" fill="#FFFFFF"/>
        <rect x="30" y="95" width="15" height="30" rx="7.5" fill="#FFFFFF"/>
      </g>

      {/* Heart Icon */}
      <path d="M150 50 C140 40, 120 45, 120 60 C120 80, 150 100, 150 100 C150 100, 180 80, 180 60 C180 45, 160 40, 150 50Z" fill="#F472B6" opacity="0.5"/>
    </g>
    <defs>
      <clipPath id="clip0_user">
        <rect width="300" height="250" rx="20" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

// Illustration for Nurse Welcome/Auth screens
export const NurseWelcomeIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 300 250" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#clip0_nurse)">
      <rect width="300" height="250" rx="20" fill="#F0F9FF"/>

      {/* Background elements */}
      <path d="M-20 200 L100 80 L220 160 L320 100" stroke="#A5F3FC" strokeWidth="15" strokeLinecap="round"/>
      <circle cx="250" cy="50" r="30" fill="#CFFAFE"/>

      {/* Nurse Character */}
      <g transform="translate(122.5, 60)">
        <rect y="30" width="55" height="110" rx="27.5" fill="#FFFFFF" stroke="#E0F2FE" strokeWidth="4"/>
        <circle cx="27.5" cy="15" r="15" fill="#A5F3FC"/>
        <rect x="12.5" y="45" width="30" height="30" fill="#E0F2FE"/>
        <path d="M20 60 L35 60 M27.5 52.5 L27.5 67.5" stroke="#0891B2" strokeWidth="3" strokeLinecap="round"/>
        <rect x="5" y="130" width="15" height="40" rx="7.5" fill="#FFFFFF" stroke="#E0F2FE" strokeWidth="4"/>
        <rect x="35" y="130" width="15" height="40" rx="7.5" fill="#FFFFFF" stroke="#E0F2FE" strokeWidth="4"/>
      </g>
      
      {/* Stethoscope */}
      <g transform="translate(100, 40)">
        <path d="M0 15 C0 -5, 40 -5, 40 15 V 50" stroke="#6B7280" strokeWidth="4" fill="none" />
        <path d="M100 15 C100 -5, 60 -5, 60 15 V 50" stroke="#6B7280" strokeWidth="4" fill="none" />
        <path d="M40 50 L60 50" stroke="#6B7280" strokeWidth="4" fill="none" />
        <circle cx="50" cy="60" r="10" fill="#0891B2" stroke="white" strokeWidth="2"/>
      </g>
    </g>
    <defs>
      <clipPath id="clip0_nurse">
        <rect width="300" height="250" rx="20" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

// Illustration for Auth Gateway based on user's image
export const CareIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 300 180" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Sofa */}
    <rect x="25" y="100" width="250" height="40" rx="8" fill="#CFFAFE"/>
    <rect x="30" y="95" width="240" height="10" rx="5" fill="#A5F3FC"/>
    <rect x="40" y="140" width="30" height="8" rx="4" fill="#0891B2"/>
    <rect x="230" y="140" width="30" height="8" rx="4" fill="#0891B2"/>
    
    {/* Nurse/Caregiver */}
    <g transform="translate(60, 45)">
      <rect y="15" width="60" height="60" rx="10" fill="white"/>
      <rect x="5" y="70" width="20" height="25" rx="5" fill="white"/>
      <rect x="35" y="70" width="20" height="25" rx="5" fill="white"/>
      <circle cx="30" cy="15" r="15" fill="#A5F3FC"/>
      <path d="M25 15 H 35 M 30 10 V 20" stroke="#0891B2" strokeWidth="2" strokeLinecap="round"/>
    </g>
    
    {/* Patient */}
    <g transform="translate(180, 55)">
      <rect y="10" width="50" height="50" rx="10" fill="#E0F2FE"/>
      <rect x="10" y="55" width="15" height="20" rx="5" fill="#E0F2FE"/>
      <rect x="25" y="55" width="15" height="20" rx="5" fill="#E0F2FE"/>
      <circle cx="25" cy="10" r="15" fill="#06B6D4"/>
    </g>

    {/* Heart */}
    <path d="M150 10 C 135 0, 110 5, 110 25 C 110 50, 150 70, 150 70 C 150 70, 190 50, 190 25 C 190 5, 165 0, 150 10Z" fill="#F472B6"/>
  </svg>
);

export const AuthGatewayIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 300 180" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Background elements */}
    <path d="M 20 180 Q 150 140 280 180" fill="#CFFAFE" />
    <rect y="80" width="300" height="100" fill="#F0FDFA" />
    
    {/* House */}
    <rect x="100" y="60" width="100" height="90" rx="8" fill="white" />
    <path d="M90 65 L 150 30 L 210 65 Z" fill="#A5F3FC" />
    <rect x="135" y="100" width="30" height="50" rx="5" fill="#A5F3FC" />
    <circle cx="158" cy="125" r="3" fill="#0891B2" />
    
    {/* Heart above house */}
    <path d="M150 10 C140 5, 130 10, 130 20 C130 35, 150 45, 150 45 C150 45, 170 35, 170 20 C170 10, 160 5, 150 10Z" fill="#F472B6"/>

    {/* Nurse Character */}
    <g transform="translate(40, 90)">
      <rect y="10" width="45" height="60" rx="22.5" fill="#FFFFFF" stroke="#E0F2FE" strokeWidth="3"/>
      <circle cx="22.5" cy="10" r="10" fill="#A5F3FC"/>
      <rect x="11.25" y="20" width="22.5" height="22.5" fill="#E0F2FE"/>
      <path d="M18 27.5 H 27 M 22.5 23 V 32" stroke="#0891B2" strokeWidth="2" strokeLinecap="round"/>
    </g>
  </svg>
);

export const SignUpIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 300 180" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="150" cy="90" r="120" fill="#F0FDFA" />
    {/* Document/Form */}
    <rect x="100" y="30" width="130" height="120" rx="10" fill="white" stroke="#CFFAFE" strokeWidth="4" />
    <path d="M120 50h70 M120 70h70 M120 90h40" stroke="#A5F3FC" strokeWidth="4" strokeLinecap="round" />
    
    {/* Checkmark Circle */}
    <circle cx="195" cy="115" r="15" fill="#34D399" />
    <path d="M190 115 l3 3 l6 -6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

    {/* Character */}
    <g transform="translate(50, 60)">
      <rect y="10" width="50" height="60" rx="25" fill="#E0F2FE"/>
      <circle cx="25" cy="10" r="15" fill="#06B6D4"/>
    </g>
    
    {/* Sparkles */}
    <path d="M60 40 l5 10 l10 -5 l-10 5 l5 10 l-5 -10 l-10 5 l10 -5z" fill="#FBBF24" />
    <path d="M240 60 l3 6 l6 -3 l-6 3 l3 6 l-3 -6 l-6 3 l6 -3z" fill="#A78BFA" opacity="0.8" />
  </svg>
);

export const LoginRoleSelectionIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 300 180" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Background shape */}
    <path d="M0 20C0 8.95431 8.95431 0 20 0H280C291.046 0 300 8.95431 300 20V180H0V20Z" fill="#F0FDFA"/>
    
    {/* Central path/split */}
    <path d="M150 180V90C150 62.3858 127.614 40 100 40H70" stroke="#A5F3FC" strokeWidth="8" strokeLinecap="round"/>
    <path d="M150 180V90C150 62.3858 172.386 40 200 40H230" stroke="#A5F3FC" strokeWidth="8" strokeLinecap="round"/>

    {/* Nurse Side */}
    <g transform="translate(30, 50)">
      {/* Head */}
      <circle cx="25" cy="15" r="15" fill="#A5F3FC"/>
      {/* Body */}
      <rect y="30" width="50" height="60" rx="10" fill="white"/>
      {/* Cross */}
      <rect x="15" y="40" width="20" height="20" fill="#E0F2FE"/>
      <path d="M22 50 H 32 M 27 45 V 55" stroke="#0891B2" strokeWidth="2" strokeLinecap="round"/>
      {/* Legs */}
      <rect x="10" y="90" width="10" height="25" rx="5" fill="white"/>
      <rect x="30" y="90" width="10" height="25" rx="5" fill="white"/>
    </g>

    {/* User Side */}
    <g transform="translate(220, 55)">
      {/* Head */}
      <circle cx="25" cy="10" r="15" fill="#06B6D4"/>
      {/* Body */}
      <rect y="25" width="50" height="50" rx="10" fill="#E0F2FE"/>
      {/* Legs */}
      <rect x="10" y="75" width="10" height="20" rx="5" fill="#E0F2FE"/>
      <rect x="30" y="75" width="10" height="20" rx="5" fill="#E0F2FE"/>
    </g>
    
    {/* Decorative Elements */}
    <circle cx="150" cy="15" r="10" fill="#F472B6" />
    <path d="M10 120 l5 10 l10 -5 l-10 5 l5 10" fill="#FBBF24" opacity="0.8"/>
    <path d="M280 100 l5 10 l10 -5 l-10 5 l5 10" fill="#A78BFA" opacity="0.8"/>
  </svg>
);


// Illustration for Admin Dashboard Welcome card
export const AdminWelcomeIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#clip0_admin)">
      <rect width="200" height="150" fill="#F3F4F6"/>
      {/* Desk */}
      <rect x="10" y="120" width="180" height="10" rx="5" fill="#9CA3AF"/>
      {/* Screen */}
      <rect x="40" y="40" width="120" height="80" rx="10" fill="white"/>
      <rect x="45" y="45" width="110" height="60" fill="#E0F2FE"/>
      {/* Chart on screen */}
      <path d="M55 95 L75 75 L95 85 L115 65 L135 75" stroke="#3B82F6" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <rect x="90" y="120" width="20" height="20" fill="#E5E7EB"/>
      
      {/* Admin Character */}
      <g transform="translate(75, 70)">
        <rect y="10" width="50" height="50" rx="25" fill="#D1D5DB"/>
        <circle cx="25" cy="10" r="15" fill="#4B5563"/>
      </g>

      {/* Floating Icons */}
      <g transform="translate(20, 50)" opacity="0.7">
        <circle cx="10" cy="10" r="10" fill="#A5F3FC"/>
        <path d="M7 10h6M10 7v6" stroke="#0891B2" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
      <g transform="translate(160, 70)" opacity="0.7">
        <circle cx="10" cy="10" r="10" fill="#A78BFA"/>
        <path d="M7 7l6 6m0-6l-6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    </g>
    <defs>
      <clipPath id="clip0_admin">
        <rect width="200" height="150" rx="10" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

export const OnboardingIllustration1: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 300 250" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Background */}
    <rect width="300" height="250" rx="20" fill="#F0FDFA"/>
    
    {/* Floor */}
    <path d="M0 230 C 50 240, 250 240, 300 230 V 250 H 0 Z" fill="#A5F3FC"/>
    
    {/* Doorway */}
    <path d="M100 230 V 80 C 100 68.9543 108.954 60 120 60 H 180 C 191.046 60 200 68.9543 200 80 V 230" fill="#FFFFFF"/>
    <rect x="180" y="140" width="8" height="8" rx="4" fill="#CFFAFE"/>
    
    {/* Nurse Character */}
    <g transform="translate(160, 130)">
        <rect y="20" width="50" height="70" rx="25" fill="#FFFFFF" stroke="#E0F2FE" strokeWidth="4"/>
        <circle cx="25" cy="10" r="10" fill="#A5F3FC"/>
        <path d="M22 10 H 28 M 25 7 V 13" stroke="#0891B2" strokeWidth="2" strokeLinecap="round"/>
        {/* Medical Bag */}
        <g transform="translate(-30, 30)">
            <rect width="25" height="20" rx="5" fill="#0891B2"/>
            <rect x="5" y="-5" width="15" height="5" rx="2.5" fill="#06B6D4"/>
            <path d="M8 7 H 17 M 12.5 3 V 11" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </g>
    </g>
    
    {/* Heart Icon */}
    <path d="M230 70 C 220 60, 200 65, 200 80 C 200 100, 230 120, 230 120 C 230 120, 260 100, 260 80 C 260 65, 240 60, 230 70Z" fill="#F472B6"/>
  </svg>
);

export const OnboardingIllustration2: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 300 250" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="300" height="250" rx="20" fill="#F0FDF4"/>
    
    {/* Background Podium/Stage */}
    <path d="M50 250 C 100 200, 200 200, 250 250 Z" fill="#D1FAE5"/>
    
    {/* Central Nurse */}
    <g transform="translate(120, 40)">
      <rect y="30" width="60" height="120" rx="30" fill="white" stroke="#A7F3D0" strokeWidth="4"/>
      <circle cx="30" cy="15" r="15" fill="#A7F3D0"/>
      {/* Clipboard */}
      <rect x="-10" y="60" width="30" height="40" rx="5" fill="#E0F2FE"/>
      <rect x="-15" y="55" width="40" height="5" rx="2.5" fill="#BFDBFE"/>
    </g>
    
    {/* Floating Elements representing skills/ratings */}
    {/* Star */}
    <g transform="translate(50, 60)">
        <path d="M25 0 l7.73 15.6 17.27 2.5 -12.5 12.18 2.95 17.22 -15.45 -8.12 -15.45 8.12 2.95 -17.22 -12.5 -12.18 17.27 -2.5Z" fill="#FBBF24"/>
    </g>
    {/* Certificate */}
    <g transform="translate(200, 80)">
        <rect width="50" height="60" rx="5" fill="#DBEAFE"/>
        <path d="M10 15 H 40 M 10 25 H 40 M 10 35 H 30" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="25" cy="48" r="6" fill="#60A5FA"/>
    </g>
     {/* Heart */}
    <g transform="translate(70, 160)">
      <path d="M20 10 C15 5 5 10 5 17 C5 27 20 32 20 32 C20 32 35 27 35 17 C35 10 25 5 20 10Z" fill="#F472B6"/>
    </g>
  </svg>
);


export const OnboardingIllustration3: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 300 250" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="300" height="250" rx="20" fill="#EFF6FF"/>

    {/* Phone */}
    <g transform="translate(150, 40)">
      <rect width="110" height="170" rx="20" fill="white" stroke="#BFDBFE" strokeWidth="4"/>
      <rect x="5" y="5" width="100" height="160" rx="15" fill="#F0FDFA"/>
      <rect x="40" y="10" width="30" height="4" rx="2" fill="#BFDBFE"/>
    </g>

    {/* Finger Tapping */}
    <path d="M180 120 C 170 110, 155 115, 150 130 L 140 200 H 170 Z" fill="#A5F3FC" stroke="#0891B2" strokeWidth="3"/>
    
    {/* "Book" button on phone screen */}
    <rect x="170" y="140" width="70" height="30" rx="15" fill="#06B6D4"/>
    <text x="205" y="160" textAnchor="middle" fill="white" fontWeight="bold" fontSize="12" fontFamily="Tajawal, sans-serif">احجز الآن</text>
    
    {/* Path from click to Nurse */}
    <path d="M150 130 C 100 130, 90 80, 50 80" stroke="#0891B2" strokeWidth="3" fill="none" strokeDasharray="5 5" strokeLinecap="round"/>
    
    {/* Nurse arriving */}
    <g transform="translate(30, 90)">
        <circle cx="15" cy="10" r="10" fill="#A5F3FC"/>
        <rect y="20" width="30" height="40" rx="15" fill="white"/>
        {/* Medical bag */}
        <g transform="translate(25, 25)">
            <rect width="15" height="12" rx="3" fill="#0891B2"/>
            <rect x="4" y="-3" width="7" height="3" rx="1.5" fill="#06B6D4"/>
        </g>
    </g>
  </svg>
);