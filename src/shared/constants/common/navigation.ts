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
      { id: 'home', label: '유틸리티 홈', path: '' },
      { id: 'webpConverter', label: 'Webp Converter', path: '/webpConverter' },
      { id: 'cropper', label: 'Cropper', path: '/cropper' },
      { id: 'gifMaker', label: 'Gif Maker', path: '/gifMaker' },
    ],
  },
  {
    id: 'community',
    label: '커뮤니티',
    path: '/community',
    children: [
      { id: 'home', label: '커뮤니티 홈', path: '' },
      { id: 'notice', label: '공지', path: '/notice' },
      { id: 'write', label: '글 작성', path: '/write' },
    ],
  },
] as const;
