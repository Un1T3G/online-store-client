import { fetchAuth } from '../fetch'
import {
  MainStatisticsItem,
  MiddleStatisticsResponse,
} from './statistics.types'

class StatisticsService {
  getMain() {
    return fetchAuth.get<MainStatisticsItem[]>('statistics/main')
  }

  getMiddle() {
    return fetchAuth.get<MiddleStatisticsResponse>('statistics/middle')
  }
}

export const statisticsService = new StatisticsService()
