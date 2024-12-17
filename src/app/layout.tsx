import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Container } from '@mui/material';
import { Metadata } from 'next';
import Header from '@/components/common/Header';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'YouTube Creators Hub',
  description: 'Shine Your Power',
};

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
          <Providers>
            <Container
              maxWidth="xl"
              sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {children}
            </Container>
          </Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
