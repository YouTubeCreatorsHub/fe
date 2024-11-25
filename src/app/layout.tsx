import Header from '@/components/common/header/header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
