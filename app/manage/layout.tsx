import { AdminLayout } from '_pages/layouts'
import { PropsWithChildren } from 'react'

export default function ManageLayout({ children }: PropsWithChildren) {
  return <AdminLayout>{children}</AdminLayout>
}
