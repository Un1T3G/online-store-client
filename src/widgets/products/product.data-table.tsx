import { formatPrice, useProductsQuery } from 'entities/products'

import { ProductDeleteButton } from 'features/products'
import { Pen } from 'lucide-react'
import Link from 'next/link'
import { routes } from 'shared/config'
import { usePagePaginate } from 'shared/lib'
import { Button, DataTable, TableCell, TableRow } from 'shared/ui'

const headers = ['N#', 'Название', 'Цена', 'Цвет', 'Категория', 'Действия']
const itemsPerPage = 5

interface IProps {
  searchTerm?: string
}

export const ProductDataTable = ({ searchTerm }: IProps) => {
  const { page, fetchNext, fetchPrev } = usePagePaginate()
  const { data, isLoading, isError, error } = useProductsQuery(
    {},
    { searchTerm, page, perPage: itemsPerPage }
  )

  return (
    <DataTable
      data={data!}
      headers={headers}
      isError={isError}
      isLoading={isLoading}
      error={error}
      skeletonItemLength={itemsPerPage}
      fetchNext={fetchNext}
      fetchPrev={fetchPrev}
      renderRow={(item, index) => (
        <TableRow key={item.id}>
          <TableCell>{index + 1 + itemsPerPage * (page - 1)}</TableCell>
          <TableCell>{item.title}</TableCell>
          <TableCell>{formatPrice(item.price)}</TableCell>
          <TableCell>
            <div className="flex items-center space-x-2">
              <span
                className="block w-6 h-6 rounded-full"
                style={{ backgroundColor: item.color.value }}
                aria-hidden="true"
              />
              <span>{item.color.value}</span>
            </div>
          </TableCell>
          <TableCell>{item.category.title}</TableCell>
          <TableCell className="flex justify-end space-x-2">
            <ProductDeleteButton id={item.id} />
            <Button size="icon" asChild>
              <Link href={routes.adminProductEdit(item.id)}>
                <Pen />
              </Link>
            </Button>
          </TableCell>
        </TableRow>
      )}
    />
  )
}
