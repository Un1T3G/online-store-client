import { MainLayout } from '_pages/layouts'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MainLayout>{children}</MainLayout>
}
