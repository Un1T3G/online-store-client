import { UserResponse } from '../users'

export interface ReviewResponse {
  id: string
  rating: number
  text: string
  user: UserResponse
  createdAt: string
}

export interface ReviewDto {
  rating: number
  text: string
}
