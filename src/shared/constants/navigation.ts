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
      { id: 'webpConverter', label: 'Webp Converter', path: '/webpConverter' },
      { id: 'cropper', label: 'Cropper', path: '/cropper' },
    ],
  },
  {
    id: 'community',
    label: '커뮤니티',
    path: '/community',
    children: [
      { id: 'notice', label: '공지', path: '/notice' },
      { id: 'post', label: '글 작성', path: '/post' },
    ],
  },
] as const;
