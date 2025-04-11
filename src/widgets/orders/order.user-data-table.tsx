import { getOrderStatus, useOrdersByUserQuery } from 'entities/orders'
import { formatPrice } from 'entities/products'
import { orderHeaders } from 'shared/config'
import { DataTable, TableCell, TableRow } from 'shared/ui'

export const OrderUserDataTable = () => {
  const { data, isLoading, isError, error } = useOrdersByUserQuery()

  return (
    <DataTable
      data={{
        data: data!,
        meta: {
          total: data?.length || 0,
          next: null,
          prev: null,
        },
      }}
      headers={orderHeaders}
      isError={isError}
      isLoading={isLoading}
      error={error}
      skeletonItemLength={5}
      renderRow={(item, index) => (
        <TableRow key={item.id}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
          <TableCell>{getOrderStatus(item.status)}</TableCell>
          <TableCell className="justify-end">
            {formatPrice(Number(item.total))}
          </TableCell>
        </TableRow>
      )}
    />
  )
}
