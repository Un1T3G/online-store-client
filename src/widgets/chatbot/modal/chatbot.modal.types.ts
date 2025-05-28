import { ChatbotResponse } from 'shared/api'

export interface ChatItem {
  isUser: boolean
  content: string | ChatbotResponse
}
