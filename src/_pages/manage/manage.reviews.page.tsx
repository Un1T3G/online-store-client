'use client'

import { ReviewDataTable } from 'widgets/reviews'

export const ManageReviewsPage = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Отзывы</h1>
      </div>
      <ReviewDataTable />
    </div>
  )
}
