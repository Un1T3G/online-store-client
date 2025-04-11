import { useQuery } from '@tanstack/react-query'
import {
  MainStatisticsItem,
  MiddleStatisticsResponse,
  statisticsService,
} from 'shared/api'
import { QueryOptions } from 'shared/types'

export const statisticsKeys = {
  main: ['statistics', 'main'],
  middle: ['statistics', 'middle'],
}

export const useMainStatisticsQuery = (
  options?: QueryOptions<MainStatisticsItem[]>
) => {
  return useQuery({
    queryKey: statisticsKeys.main,
    queryFn: () => statisticsService.getMain(),
    ...options,
  })
}

export const useMiddleStatisticsQuery = (
  options?: QueryOptions<MiddleStatisticsResponse>
) => {
  return useQuery({
    queryKey: statisticsKeys.middle,
    queryFn: () => statisticsService.getMiddle(),
    ...options,
  })
}
