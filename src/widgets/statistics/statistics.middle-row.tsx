import { formatPrice } from 'entities/products'
import { useMiddleStatisticsQuery } from 'entities/statistics'

import Image from 'next/image'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import {
  Card,
  CardTitle,
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ErrorCard,
  Skeleton,
} from 'shared/ui'

const chartConfig = {
  value: {
    label: 'Прибыль',
    color: '#3B82F6',
  },
} satisfies ChartConfig

const fakeData = [
  {
    date: '2023-01-01',
    value: 100000,
  },
  {
    date: '2023-02-01',
    value: 200000,
  },
  {
    date: '2023-03-01',
    value: 150000,
  },
  {
    date: '2023-04-01',
    value: 180000,
  },
  {
    date: '2023-05-01',
    value: 170000,
  },
  {
    date: '2023-06-01',
    value: 140000,
  },
]

interface IProps {
  showFakeData?: boolean
}

export const StatisticsMiddleRow = ({ showFakeData = false }: IProps) => {
  const {
    data: middleStatistics,
    isLoading,
    isError,
    error,
  } = useMiddleStatisticsQuery()

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-4 xl:flex-row xl:space-x-4 xl:space-y-0">
        <Skeleton className="w-full xl:w-[300px]" />
        <Skeleton className="w-full h-[400px]" />
      </div>
    )
  }

  if (isError) {
    return <ErrorCard error={error} />
  }

  return (
    <div className="flex flex-col space-y-4 xl:flex-row xl:space-x-4 xl:space-y-0">
      <Card className="w-full flex-2 xl:basis-3xl">
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={showFakeData ? fakeData : middleStatistics!.monthlySales}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={formatPrice}
                  indicator="line"
                />
              }
            />
            <Area
              dataKey="value"
              type="natural"
              fill="var(--color-value)"
              stroke="var(--color-value)"
            />
          </AreaChart>
        </ChartContainer>
      </Card>
      <Card className="flex-1 xl:basis-sm p-4 gap-0">
        <CardTitle className="mb-4">Покупатели</CardTitle>
        <div className="space-y-2 w-full">
          {middleStatistics!.lastUsers.map((x) => (
            <div key={x.id} className="flex items-center space-x-2">
              <div className="relative w-9 h-9 rounded-full overflow-hidden bg-slate-100 shrink-0 grow-0">
                <Image
                  src={x.avatarUrl}
                  alt={x.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <span className="text-sm font-medium">{x.name}</span>
                <span className="text-sm font-bold text-ellipsis max-w-[120px] overflow-hidden sm:max-w-full">
                  {x.email}
                </span>
              </div>
              <span className="text-base sm:text-xl font-medium">
                +{formatPrice(x.total)}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
