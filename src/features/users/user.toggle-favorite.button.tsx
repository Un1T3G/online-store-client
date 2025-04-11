'use client'

import { useFavoriteProductsQuery } from 'entities/products'
import { useUserToggleFavoriteMutation } from 'entities/users'
import { Heart, HeartCrack } from 'lucide-react'
import { useEffect, useState } from 'react'
import { errorCatch } from 'shared/api'
import { LoadingButton } from 'shared/ui'
import { toast } from 'sonner'

interface IProps {
  productId: string
}

export const UserToggleFavoriteButton = ({ productId }: IProps) => {
  const [isFavorite, setIsFavorite] = useState(false)

  const { data: favoriteProducts } = useFavoriteProductsQuery(
    {},
    { perPage: 9999 }
  )
  const { mutateAsync, isPending } = useUserToggleFavoriteMutation(productId, {
    onSuccess: (result) => {
      if (result) {
        toast.success('Добавлен в избранное')
      } else {
        toast.success('Удален из избранного')
      }
    },
    onError: (error) => {
      toast.error(errorCatch(error))
    },
  })

  useEffect(() => {
    if (favoriteProducts) {
      setIsFavorite(
        favoriteProducts.data.some((product) => product.id === productId)
      )
    }
  }, [favoriteProducts])

  const handleToggleFavorite = async () => {
    const result = await mutateAsync({})
    setIsFavorite(result)
  }

  return (
    <LoadingButton
      loading={isPending}
      size="icon"
      onClick={handleToggleFavorite}
    >
      {isFavorite ? <HeartCrack /> : <Heart />}
    </LoadingButton>
  )
}
