import { useCategoryQuery } from 'entities/category'
import { CategoryDeleteButton } from 'features/category'
import { Pen } from 'lucide-react'
import Link from 'next/link'
import { routes } from 'shared/config'
import { usePagePaginate } from 'shared/lib'
import { Button, DataTable, TableCell, TableRow } from 'shared/ui'

const headers = ['N#', 'Название', 'Действия']
const itemsPerPage = 5

interface IProps {
  searchTerm?: string
}

export const CategoryDataTable = ({ searchTerm }: IProps) => {
  const { page, fetchNext, fetchPrev } = usePagePaginate()
  const { data, isFetching, isError, error } = useCategoryQuery(
    {},
    { searchTerm, page, perPage: itemsPerPage }
  )

  return (
    <DataTable
      data={data!}
      headers={headers}
      isError={isError}
      isLoading={isFetching}
      error={error}
      skeletonItemLength={itemsPerPage}
      fetchNext={fetchNext}
      fetchPrev={fetchPrev}
      renderRow={(item, index) => (
        <TableRow key={item.id}>
          <TableCell>{index + 1 + itemsPerPage * (page - 1)}</TableCell>
          <TableCell>{item.title}</TableCell>
          <TableCell className="flex justify-end space-x-2">
            <CategoryDeleteButton id={item.id} />
            <Button size="icon" asChild>
              <Link href={routes.adminCategoryEdit(item.id)}>
                <Pen />
              </Link>
            </Button>
          </TableCell>
        </TableRow>
      )}
    />
  )
}
