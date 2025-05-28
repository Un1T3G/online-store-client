import { useChatbotGenerativeResponseMutation } from 'entities/chatbot'
import { useFormik } from 'formik'
import { Search, Send } from 'lucide-react'
import { ChatbotDto, ChatbotResponse, errorCatch } from 'shared/api'
import { Button, InputWithLeadingIcon } from 'shared/ui'
import { toast } from 'sonner'

interface IProps {
  onSendMessage: (message: string) => void
  onSuccessResponse: (response: ChatbotResponse) => void
  onError: (error: any) => void
}

export const ChatbotForm = ({
  onSendMessage,
  onSuccessResponse,
  onError,
}: IProps) => {
  const { mutate, isPending } = useChatbotGenerativeResponseMutation({
    onSuccess: (data) => {
      onSuccessResponse(data)
    },
    onError: (error) => {
      toast.error(errorCatch(error))
      onError(error)
    },
  })

  const formik = useFormik<ChatbotDto>({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      if (isPending) {
        return
      }

      onSendMessage(values.message)
      mutate(values)
      formik.resetForm()
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className="flex space-x-2 w-full">
      <InputWithLeadingIcon
        name="message"
        icon={Search}
        placeholder="Запрос по товарам"
        value={formik.values.message}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="flex-1"
        readOnly={isPending}
      />
      <Button disabled={isPending} size="icon" type="submit">
        <Send />
      </Button>
    </form>
  )
}
