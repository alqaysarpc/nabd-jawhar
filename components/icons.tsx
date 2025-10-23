import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  active?: boolean;
  progress?: number;
}

export const LogoIcon: React.FC<IconProps> = (props) => (
    <svg {...props} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ECFEFF"/>
            <stop offset="100%" stopColor="#CFFAFE"/>
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="50" fill="url(#backgroundGradient)"/>
        <path d="M50 85C50 85 20 65 20 42.5C20 28.5 31.25 18.75 43.75 23.75C46.875 25.15 50 30 50 30C50 30 53.125 25.15 56.25 23.75C68.75 18.75 80 28.5 80 42.5C80 65 50 85 50 85Z" fill="#06B6D4"/>
        <path d="M33 55H41L45 49L55 61L59 55H67" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const SyringeIcon: React.FC<IconProps> = ({ progress = 0, ...props }) => {
  const fillHeight = 28 + (100 - progress) * 0.44;
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="22" y="8" width="16" height="4" rx="2" fill="#A5F3FC"/>
      <rect x="25" y="12" width="10" height="40" rx="5" fill="#E0F2FE"/>
      {/* Liquid */}
      <rect x="28" y={fillHeight} width="4" height={72-fillHeight} rx="2" fill="#06B6D4" />
      <rect x="25" y="48" width="10" height="4" rx="2" fill="#A5F3FC"/>
    </svg>
  );
};

export const HomeIcon: React.FC<IconProps> = ({ active, ...props }) => (
    <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" stroke={active ? '#06B6D4' : '#6B7280'} />
    </svg>
);

export const DocumentTextIcon: React.FC<IconProps> = ({ active, ...props }) => (
    <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke={active ? '#06B6D4' : '#6B7280'} />
    </svg>
);

export const UsersIcon: React.FC<IconProps> = ({ active, ...props }) => (
    <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m9 5.197a6 6 0 00-3.75-5.485M9 21a6 6 0 01-9-5.197" stroke={active ? '#06B6D4' : '#6B7280'} />
    </svg>
);

export const UserCircleIcon: React.FC<IconProps> = ({ active, ...props }) => (
    <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" stroke={active ? '#06B6D4' : '#6B7280'} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a9 9 0 100-18 9 9 0 000 18z" stroke={active ? '#06B6D4' : '#6B7280'} />
    </svg>
);

export const ServicesIcon: React.FC<IconProps> = ({ active, ...props }) => (
    <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" {...props}>
        {/* The bag body */}
        <path stroke={active ? '#06B6D4' : '#6B7280'} strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5h13.5A2.25 2.25 0 0121 9.75v8.5A2.25 2.25 0 0118.75 20.5H5.25A2.25 2.25 0 013 18.25v-8.5A2.25 2.25 0 015.25 7.5z" />
        {/* The handle */}
        <path stroke={active ? '#06B6D4' : '#6B7280'} strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V5.25A2.25 2.25 0 0110.5 3h3A2.25 2.25 0 0115.75 5.25V7.5" />
        {/* The plus sign */}
        <path stroke={active ? '#06B6D4' : '#6B7280'} strokeLinecap="round" strokeLinejoin="round" d="M12 11.25v4.5m-2.25-2.25h4.5" />
    </svg>
);

export const HeaderBellIcon: React.FC<IconProps> = (props) => (
    <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
);

export const FilterIcon: React.FC<IconProps> = (props) => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L16 11.414V16l-4 2v-6.586L3.293 6.707A1 1 0 013 6V4z" />
    </svg>
);

export const CheckCircleIcon: React.FC<IconProps> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const MapIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.5-10.5h-7a2.25 2.25 0 00-2.25 2.25v10.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25V8.25a2.25 2.25 0 00-2.25-2.25H12.75" />
    </svg>
);

export const ListIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);

export const LanguageIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
    </svg>
);

export const PencilSquareIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
);

export const GlobeAltIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c1.358 0 2.665-.182 3.898-.515M12 3c1.358 0 2.665.182 3.898.515M3.284 9.747c.052.162.108.32.168.477M20.716 9.747c-.052.162-.108.32-.168.477M12 3a8.962 8.962 0 016.284 2.658M12 3a8.962 8.962 0 00-6.284 2.658M12 21a8.962 8.962 0 01-6.284-2.658M12 21a8.962 8.962 0 006.284-2.658" />
    </svg>
);

export const QuestionMarkCircleIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
    </svg>
);

export const ArrowLeftOnRectangleIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
    </svg>
);

export const MapPinIcon: React.FC<IconProps> = (props) => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
);

export const ClockIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const XCircleIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const HeartIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
);

export const StethoscopeIcon: React.FC<IconProps> = ({ active, ...props }) => {
    let strokeColor = 'currentColor';
    if (active === true) {
        strokeColor = '#06B6D4';
    } else if (active === false) {
        strokeColor = '#6B7280';
    }

    return (
        <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" {...props}>
            <path stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" d="M6 4h-1a2 2 0 0 0 -2 2v3.5h0a5.5 5.5 0 0 0 11 0v-3.5a2 2 0 0 0 -2 -2h-1" />
            <path stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" d="M8 15a6 6 0 1 0 12 0v-3" />
            <path stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" d="M11 3v2" />
            <path stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" d="M6 3v2" />
            <path stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" d="M20 10m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        </svg>
    );
};

export const BeakerIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v11.141a3.75 3.75 0 005.25.166l4.5-3.375a3.75 3.75 0 00-5.25-5.916L9.75 3.104zm0 0A3.75 3.75 0 0112 1.5h.75c2.071 0 3.75 1.679 3.75 3.75v.033" />
    </svg>
);

export const PhoneIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
    </svg>
);

export const ChatBubbleLeftEllipsisIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.435l-4.25 1.063.98-3.633A9.764 9.764 0 013 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
    </svg>
);

export const TrashIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.033-2.134h-3.868c-1.123 0-2.033.954-2.033 2.134v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
);

export const SparklesIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 21.75l-.648-1.188a2.25 2.25 0 01-1.47-1.47l-1.188-.648 1.188-.648a2.25 2.25 0 011.47-1.47l.648-1.188.648 1.188a2.25 2.25 0 011.47 1.47l1.188.648-1.188.648a2.25 2.25 0 01-1.47 1.47z" />
    </svg>
);

export const WalletIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 3a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 12m18 0v-3.375c0-1.02-.746-1.875-1.732-2.062L17.25 6H6.75L5.007 6.563A2.25 2.25 0 003 8.625V12" />
    </svg>
);

export const DocumentCheckIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const SunIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
);

export const DashboardIcon: React.FC<IconProps> = ({ active, ...props }) => (
    <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke={active ? '#14B8A6' : '#6B7280'} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
);

export const NurseDocumentTextIcon: React.FC<IconProps> = ({ active, ...props }) => (
    <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke={active ? '#14B8A6' : '#6B7280'} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
);

export const CalendarDaysIconNav: React.FC<IconProps> = ({ active, ...props }) => (
    <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke={active ? '#14B8A6' : '#6B7280'} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

export const NurseUserCircleIcon: React.FC<IconProps> = ({ active, ...props }) => (
    <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke={active ? '#14B8A6' : '#6B7280'} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
    </svg>
);

export const MoonIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
);

export const PauseCircleIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9v6m-4.5 0v-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const BanknotesIcon: React.FC<IconProps> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const ExclamationCircleIcon: React.FC<IconProps> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
  </svg>
);

export const ArrowUpIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" /></svg>
);

export const ArrowDownIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
);

export const SearchIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
);


// Admin Icons
export const AdminChartBarIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>
);

export const AdminUsersGroupIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962c.57-1.023-.095-2.212-1.242-2.212-1.147 0-1.812 1.189-1.242 2.212M15 12a3 3 0 11-6 0 3 3 0 016 0zM12 14.25c-1.655 0-3.16.67-4.243 1.757a6.022 6.022 0 00-1.63 4.243 1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5 6.022 6.022 0 00-1.63-4.243A6.022 6.022 0 0012 14.25z" /></svg>
);

export const AdminCalendarIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M-4.5 12h22.5" /></svg>
);

export const AdminClockIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);

export const AdminCog6ToothIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-1.007 1.11-.95.542.057.955.542.955 1.11 0 .524-.368.968-.884 1.093l.28.28A7.487 7.487 0 0115.42 6.32l.22-.22c.24-.242.458-.487.674-.74.242-.28.536-.52.846-.71.51-.32 1.113-.242 1.488.134.4.4.46 1.056.134 1.488-.19.31-.43.604-.71.846-.253.216-.5.434-.74.674l-.22.22a7.487 7.487 0 01-2.046 2.046l-.28.28c.125.516.57 1.026 1.094 1.094.557.056 1.055-.34 1.11-.954.057-.57-.368-1.055-.94-1.11l-.222-.03a7.502 7.502 0 01-1.584-1.584l-.03-.222c-.054-.572.48-1.014 1.11-1.014.57 0 1.055.442 1.11.94.056.557-.34 1.055-.954 1.11l-.28.28a7.487 7.487 0 01-2.046 2.046l-.22.22c-.242.24-.487.458-.74.674-.28.242-.52.536-.71.846-.32.51-.242 1.113.134 1.488.4.4 1.056.46 1.488.134.31-.19.604-.43.846-.71.216-.253.434-.5.674-.74l.22-.22a7.487 7.487 0 012.046-2.046l.28-.28c.516.125 1.026.57 1.094 1.094.056-.557-.34 1.055-.954 1.11-.57.056-1.055-.368-1.11-.94l-.222-.03a7.502 7.502 0 01-1.584 1.584l.03.222c.054.572.48 1.014 1.11 1.014.57 0 1.055-.442 1.11-.94.056-.557-.34-1.055-.954-1.11l-.28-.28a7.487 7.487 0 01-2.046-2.046l-.22-.22c-.242-.24-.487-.458-.74-.674-.28-.242-.52-.536-.71-.846-.32-.51-.242-1.113.134-1.488.4-.4 1.056-.46 1.488.134.31.19.604.43.846.71.216.253.434.5.674.74l.22.22a7.487 7.487 0 012.046 2.046l.28.28c.516-.125 1.026-.57 1.094-1.094.056-.557.34-1.055.954-1.11.57-.056 1.055.368 1.11.94zM4.506 7.042a7.5 7.5 0 0110.988-1.584l.03.222c.054.572-.48 1.014-1.11 1.014.57 0 1.055.442 1.11.94.056.557-.34 1.055-.954 1.11l-.28-.28a7.487 7.487 0 01-2.046-2.046l-.22-.22c-.242-.24-.487-.458-.74-.674-.28-.242-.52-.536-.71-.846-.32-.51-.242-1.113.134-1.488.4-.4 1.056-.46 1.488.134.31.19.604.43.846.71.216.253.434.5.674.74l.22.22a7.487 7.487 0 012.046 2.046l.28.28c.516.125 1.026.57 1.094 1.094.056-.557-.34 1.055-.954 1.11-.57.056-1.055-.368-1.11-.94l-.222-.03a7.502 7.502 0 01-1.584-1.584l-.03-.222c-.054-.572.48-1.014 1.11-1.014.57 0 1.055.442 1.11.94.056.557-.34-1.055-.954-1.11l-.28.28a7.487 7.487 0 01-2.046 2.046l-.22.22c-.242.24-.487.458-.74.674-.28.242-.52.536-.71-.846-.32.51-.242 1.113.134-1.488.4-.4 1.056-.46 1.488.134.31.19.604.43.846.71.216.253.434.5.674.74l.22.22a7.487 7.487 0 012.046 2.046l.28.28c.516-.125 1.026-.57 1.094-1.094.056-.557.34-1.055.954-1.11.57-.056 1.055.368 1.11.94z" /></svg>
);