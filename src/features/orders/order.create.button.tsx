import { useCreateOrderMutation } from 'entities/orders'
import { useRouter } from 'next/navigation'
import { errorCatch } from 'shared/api'
import { useAppSelector } from 'shared/lib'
import { LoadingButton } from 'shared/ui'
import { toast } from 'sonner'

interface IProps {
  className?: string
}

export const OrderCreateButton = ({ className }: IProps) => {
  const items = useAppSelector((state) => state.cartReducer.items)
  const router = useRouter()

  const { mutate, isPending } = useCreateOrderMutation({
    onSuccess: (data) => {
      router.push(data.confirmation.confirmation_url)
    },
    onError: (error) => toast.error(errorCatch(error)),
  })

  const handleOnClick = () => {
    mutate({
      items: items.map(({ product, quantity }) => ({
        price: product.price,
        quantity,
        productId: product.id,
      })),
    })
  }

  return (
    <LoadingButton
      loading={isPending}
      onClick={handleOnClick}
      className={className}
    >
      Прыти к оплате
    </LoadingButton>
  )
}
