import { fetchClassic } from '../fetch'
import { ChatbotDto, ChatbotResponse } from './chatbot.types'

class ChatbotService {
  async generativeResponse(dto: ChatbotDto) {
    return fetchClassic.post<ChatbotResponse>('chatbot', dto)
  }
}

export const chatbotService = new ChatbotService()
