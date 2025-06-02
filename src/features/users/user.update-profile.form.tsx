import { useUserUpdateProfileMutation } from 'entities/users'
import { useFormik } from 'formik'
import { Save, User } from 'lucide-react'
import { ReactNode } from 'react'
import {
  UserProfileUpdateDto,
  errorCatch,
  userUpdateProfileFormSchema,
} from 'shared/api'
import { Button, FormField, InputWithLeadingIcon } from 'shared/ui'
import { toast } from 'sonner'

const defaultInitialValues: UserProfileUpdateDto = {
  name: '',
  avatarUrl: '',
}

interface IProps {
  initialValues?: UserProfileUpdateDto
  renderImageUpload: (props: {
    name: string
    src: string
    onChangeSrc: (newSrc: string) => void
  }) => ReactNode
}

export const UserUpdateProfileForm = ({
  initialValues,
  renderImageUpload,
}: IProps) => {
  const { mutate } = useUserUpdateProfileMutation({
    onSuccess: () => {
      toast.success('Профиль успешно обновлен')
    },
    onError: (error) => {
      toast.error(errorCatch(error))
    },
  })

  const formik = useFormik({
    initialValues: initialValues ?? defaultInitialValues,
    onSubmit: (values) => {
      mutate(values)
    },
    validationSchema: userUpdateProfileFormSchema,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormField
        formik={formik}
        name="name"
        label="Имя"
        className="mb-2"
        renderField={(props) => (
          <InputWithLeadingIcon icon={User} placeholder="Имя" {...props} />
        )}
      />
      <FormField
        formik={formik}
        name="avatarUrl"
        label="Аватар"
        className="mb-2"
        renderField={(props) =>
          renderImageUpload({
            name: props.name,
            src: props.value,
            onChangeSrc: (newSrc) => formik.setFieldValue(props.name, newSrc),
          })
        }
      />
      <Button type="submit" className="w-full">
        <Save />
        Сохранить
      </Button>
    </form>
  )
}
