import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Container } from '@mui/material';
import Header from '@/components/common/Header';
import { Providers } from './providers';

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
