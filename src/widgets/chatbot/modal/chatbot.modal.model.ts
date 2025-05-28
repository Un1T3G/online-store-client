import { useState } from 'react'
import { ChatItem } from './chatbot.modal.types'

const initialValues = [
  {
    isUser: false,
    content: 'Привет! Чем могу помочь?',
  },
]

export const useChatbot = () => {
  const [messages, setMessages] = useState<ChatItem[]>(initialValues)

  const addMessage = (message: ChatItem) =>
    setMessages((prev) => [...prev, message])

  return {
    messages,
    addMessage,
  }
}
