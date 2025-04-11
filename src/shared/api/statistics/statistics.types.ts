import { UserResponse } from '../users'

export interface MainStatisticsItem {
  id: string
  name: string
  value: string
}

export interface MiddleStatisticsResponse {
  lastUsers: ({ total: number } & Pick<
    UserResponse,
    'id' | 'name' | 'email' | 'avatarUrl'
  >)[]
  monthlySales: any[]
}
