'use client'

import { StatisticsMainRow, StatisticsMiddleRow } from 'widgets/statistics'

const showFakeData = process.env.NODE_ENV === 'development'

export const ManageStatisticsPage = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Статистика</h1>
      <StatisticsMainRow />
      <StatisticsMiddleRow showFakeData={showFakeData} />
    </div>
  )
}
