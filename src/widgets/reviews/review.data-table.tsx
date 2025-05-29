import { useReviewsQuery } from 'entities/reviews/review.queries'
import { ReviewDeleteButton } from 'features/reviews'

import { Star } from 'lucide-react'
import { arrayRange, cn, usePagePaginate } from 'shared/lib'
import { DataTable, TableCell, TableRow } from 'shared/ui'

const headers = ['N#', 'Пользователь', 'Оценка', 'Действия']
const itemsPerPage = 5

export const ReviewDataTable = () => {
  const { page, fetchNext, fetchPrev } = usePagePaginate()
  const { data, isLoading, isError, error } = useReviewsQuery(
    {},
    { page, perPage: itemsPerPage }
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
          <TableCell>{item.user.name}</TableCell>
          <TableCell>
            <div className="flex space-x-1">
              {arrayRange(5).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'w-4 h-4',
                    item.rating > i
                      ? 'text-yellow-400'
                      : 'text-muted-foreground'
                  )}
                />
              ))}
            </div>
          </TableCell>
          <TableCell className="flex justify-end space-x-2">
            <ReviewDeleteButton id={item.id} />
          </TableCell>
        </TableRow>
      )}
    />
  )
}
