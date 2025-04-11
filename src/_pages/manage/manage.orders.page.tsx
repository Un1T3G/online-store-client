'use client'

import { OrderAdminDataTable } from 'widgets/orders'

export const ManageOrdersPage = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Заказы</h1>
      <OrderAdminDataTable />
    </div>
  )
}
