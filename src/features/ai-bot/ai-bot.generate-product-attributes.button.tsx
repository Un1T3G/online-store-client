import { useAIbotGenerateProductAttributesMutation } from 'entities/ai-bot'
import { Bot } from 'lucide-react'
import { AIbotProductAttributeResponse, errorCatch } from 'shared/api'
import { LoadingButton } from 'shared/ui'
import { toast } from 'sonner'

interface IProps {
  productTitle: string
  onSuccess: (response: AIbotProductAttributeResponse[]) => void
  className?: string
}

export const AIbotGenerateProductAttributesButton = ({
  productTitle,
  onSuccess,
  className,
}: IProps) => {
  const { mutate, isPending } = useAIbotGenerateProductAttributesMutation({
    onSuccess,
    onError: (error) => {
      toast.error(errorCatch(error))
    },
  })

  const handleOnClick = () => {
    mutate({
      message: productTitle,
    })
  }

  return (
    <LoadingButton
      loading={isPending}
      onClick={handleOnClick}
      className={className}
    >
      <Bot />
      Генерировать
    </LoadingButton>
  )
}
