import { FormikState } from 'formik'
import { ReactNode } from 'react'
import { cn } from 'shared/lib'
import { Label } from './label'

interface IProps<T extends Object> {
  name: keyof T
  label: string
  formik: Pick<FormikState<T>, 'values' | 'errors' | 'touched'> & {
    handleBlur: (...args: any[]) => void
    handleChange: (...args: any[]) => void
  }
  className?: string
  renderField: (props: {
    name: keyof T
    value: any
    onChange: (...args: any[]) => void
    onBlur: () => void
  }) => ReactNode
}

export const FormField = <T extends Object>({
  name,
  label,
  formik,
  className,
  renderField,
}: IProps<T>) => {
  return (
    <div className={cn('space-y-1', className)}>
      <Label htmlFor={name as string}>{label}</Label>
      {renderField({
        name,
        value: formik.values[name],
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
      })}
      {formik.touched[name] && formik.errors[name] && (
        <p className="text-red-500 text-sm">{formik.errors[name] as string}</p>
      )}
    </div>
  )
}
