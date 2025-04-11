import { useQueryClient } from '@tanstack/react-query'
import {
  reviewKeys,
  useReviewCreateMutation,
} from 'entities/reviews/review.queries'
import { useFormik } from 'formik'
import { Star } from 'lucide-react'
import { ReviewDto, errorCatch, reviewCreateFormSchema } from 'shared/api'
import {
  FormField,
  InputWithLeadingIcon,
  LoadingButton,
  Textarea,
} from 'shared/ui'
import { toast } from 'sonner'

const initialValues: ReviewDto = {
  rating: 0,
  text: '',
}

interface IProps {
  productId: string
  onSuccess?: () => void
}

export const ReviewCreateForm = ({ productId, onSuccess }: IProps) => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useReviewCreateMutation(productId, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...reviewKeys.reviews, productId],
      })
      toast.success('Отзыв успешно создан')
      onSuccess?.()
    },
    onError: (error) => {
      toast.error(errorCatch(error))
    },
  })

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      mutate(values)
    },
    validationSchema: reviewCreateFormSchema,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormField
        formik={formik}
        name="rating"
        label="Рейтинг"
        className="mb-2"
        renderField={(props) => (
          <InputWithLeadingIcon
            icon={Star}
            type="number"
            placeholder="Рейтинг"
            {...props}
          />
        )}
      />
      <FormField
        formik={formik}
        name="text"
        label="Текст"
        className="mb-4"
        renderField={(props) => <Textarea {...props} placeholder="Текст" />}
      />
      <LoadingButton loading={isPending} type="submit" className="w-full">
        Оставить
      </LoadingButton>
    </form>
  )
}
