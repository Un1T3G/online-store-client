import { getOrderStatus, useOrdersQuery } from 'entities/orders'
import { formatPrice } from 'entities/products'
import { orderHeaders } from 'shared/config'
import { usePagePaginate } from 'shared/lib'
import { DataTable, TableCell, TableRow } from 'shared/ui'

const itemsPerPage = 5

export const OrderAdminDataTable = () => {
  const { page, fetchNext, fetchPrev } = usePagePaginate()
  const { data, isLoading, isError, error } = useOrdersQuery(
    {},
    { page, perPage: itemsPerPage }
  )

  return (
    <DataTable
      data={data!}
      headers={orderHeaders}
      isError={isError}
      isLoading={isLoading}
      error={error}
      skeletonItemLength={itemsPerPage}
      fetchNext={fetchNext}
      fetchPrev={fetchPrev}
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
