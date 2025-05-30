import { useMutation } from '@tanstack/react-query'
import {
  AIbotChatResponse,
  AIbotDto,
  AIbotProductAttributeResponse,
  aiBotService,
} from 'shared/api'
import { MutationOptions } from 'shared/types'

export const aiBotKeys = {
  generativeResponse: ['ai-bot', 'generative-response'],
  generateProductAttributes: ['ai-bot', 'generate-product-attributes'],
}

export const useAIbotGenerativeResponseMutation = (
  options?: MutationOptions<AIbotChatResponse, Error, AIbotDto>
) => {
  return useMutation({
    mutationKey: aiBotKeys.generativeResponse,
    mutationFn: (dto: AIbotDto) => aiBotService.generativeResponse(dto),
    ...options,
  })
}

export const useAIbotGenerateProductAttributesMutation = (
  options?: MutationOptions<AIbotProductAttributeResponse[], Error, AIbotDto>
) => {
  return useMutation({
    mutationKey: aiBotKeys.generateProductAttributes,
    mutationFn: (dto: AIbotDto) => aiBotService.generateProductAttributes(dto),
    ...options,
  })
}
