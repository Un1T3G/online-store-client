import { useMutation } from '@tanstack/react-query'
import { ChatbotDto, ChatbotResponse, chatbotService } from 'shared/api'
import { MutationOptions } from 'shared/types'

export const chatbotKeys = {
  generativeResponse: ['chatbot', 'generative-response'],
}

export const useChatbotGenerativeResponseMutation = (
  options?: MutationOptions<ChatbotResponse, Error, ChatbotDto>
) => {
  return useMutation({
    mutationKey: chatbotKeys.generativeResponse,
    mutationFn: (dto: ChatbotDto) => chatbotService.generativeResponse(dto),
    ...options,
  })
}
