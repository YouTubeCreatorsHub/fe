export const NAVIGATION_ITEMS = [
  {
    id: 'home',
    label: '홈',
    path: '/',
    children: [],
  },
  {
    id: 'utility',
    label: '유틸리티',
    path: '/utility',
    children: [
      { id: 'imageConverter', label: '이미지컨버터', path: '/imageConverter' },
    ],
  },
  {
    id: 'community',
    label: '커뮤니티',
    path: '/community',
    children: [{ id: 'notice', label: '공지', path: '/notice' }],
  },
] as const;
