
import React from 'react';
import { Page } from './types';

// Using Heroicons v2 (https://heroicons.com/)

export const HomeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
  </svg>
);

export const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);

export const BriefcaseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( // For "タイプ別適職"
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
  </svg>
);

export const ChatBubbleLeftRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( // For "キャリア相談"
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-2.184-1.253a52.484 52.484 0 0 1-1.022.064c-1.135 0-2.118-.362-2.902-.953M15.75 9.301c.465-.45.939-.861 1.451-1.226M15.75 9.301h.001M15.75 9.301S15.75 9.301 15.75 9.301m0 0a2.25 2.25 0 0 1-2.25-2.25C13.5 5.67 14.67 4.5 16.125 4.5c1.455 0 2.625 1.17 2.625 2.625a2.25 2.25 0 0 1-2.25 2.25m-9.75 6.075a2.25 2.25 0 0 1-2.25-2.25C3.75 11.67 4.92 10.5 6.375 10.5c1.455 0 2.625 1.17 2.625 2.625a2.25 2.25 0 0 1-2.25 2.25Zm0 0h.001M6.375 15.375h.001M6.375 15.375S6.375 15.375 6.375 15.375m0 0a2.25 2.25 0 0 1 2.25-2.25c0-1.455-1.17-2.625-2.625-2.625C4.92 10.5 3.75 11.67 3.75 13.125a2.25 2.25 0 0 1 2.25 2.25Z" />
  </svg>
);

export const UserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( // For "マイページ"
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
);

export const NAV_ITEMS = [
  { id: Page.Home, label: 'ホーム', path: '/', Icon: HomeIcon },
  { id: Page.Diagnosis, label: '診断', path: '/diagnosis', Icon: SearchIcon },
  { id: Page.Career, label: 'タイプ別適職', path: '/career', Icon: BriefcaseIcon },
  { id: Page.Consultation, label: 'キャリア相談', path: '/consultation', Icon: ChatBubbleLeftRightIcon },
];

export const MBTI_TYPES: string[] = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP'
];
