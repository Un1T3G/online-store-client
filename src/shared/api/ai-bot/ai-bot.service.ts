import { fetchClassic } from '../fetch'
import {
  AIbotChatResponse,
  AIbotDto,
  AIbotProductAttributeResponse,
} from './ai-bot.types'

class AIbotService {
  async generativeResponse(dto: AIbotDto) {
    return fetchClassic.post<AIbotChatResponse>('ai-bot/chat', dto)
  }

  async generateProductAttributes(dto: AIbotDto) {
    return fetchClassic.post<AIbotProductAttributeResponse[]>(
      'ai-bot/product-attributes',
      dto
    )
  }
}

export const aiBotService = new AIbotService()
