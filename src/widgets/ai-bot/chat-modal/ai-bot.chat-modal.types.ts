import { AIbotChatResponse } from 'shared/api'

export interface ChatItem {
  isUser: boolean
  content: string | AIbotChatResponse
}
