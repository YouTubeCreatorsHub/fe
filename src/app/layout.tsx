import Header from '@/components/common/header/header';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <AppRouterCacheProvider>
          <Header />
          <section>{children}</section>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
