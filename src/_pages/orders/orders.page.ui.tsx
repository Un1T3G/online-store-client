'use client'

import { Container } from 'shared/ui'
import { OrderUserDataTable } from 'widgets/orders'

export const OrdersPage = () => {
  return (
    <div className="flex-1 py-4">
      <Container className="space-y-4">
        <h1 className="text-2xl font-bold">Ваши заказы</h1>
        <OrderUserDataTable />
      </Container>
    </div>
  )
}
