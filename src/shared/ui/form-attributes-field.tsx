'use client'

import { Notebook, Trash } from 'lucide-react'
import { ProductAttribute } from 'shared/api'

import { useMemo } from 'react'
import { Button } from './button'
import { InputWithLeadingIcon } from './input-with-leading-icon'

interface IProps {
  formik: any
}

export const FormAttributesField = ({ formik }: IProps) => {
  const handleCreate = () => {
    formik.setFieldValue('attributes', [
      ...formik.values.attributes,
      { title: '', value: '' },
    ])
  }

  const handleDelete = (index: number) => {
    const newValues = [...formik.values.attributes]
    newValues.splice(index, 1)
    formik.setFieldValue('attributes', newValues)
  }

  const elements = useMemo(
    () =>
      formik.values.attributes.map((x: ProductAttribute, index: number) => (
        <div key={index} className="flex space-x-2">
          <InputWithLeadingIcon
            icon={Notebook}
            placeholder="Название"
            value={x.title}
            className="flex-1"
            onChange={(e) => {
              formik.setFieldValue(`attributes.${index}.title`, e.target.value)
            }}
          />
          <InputWithLeadingIcon
            icon={Notebook}
            placeholder="Значение"
            value={x.value}
            className="flex-1"
            onChange={(e) => {
              formik.setFieldValue(`attributes.${index}.value`, e.target.value)
            }}
          />
          <Button
            size="icon"
            variant="destructive"
            onClick={() => handleDelete(index)}
          >
            <Trash />
          </Button>
        </div>
      )),
    [formik.values]
  )

  return (
    <div className="space-y-2">
      {elements}
      <Button className="w-full" onClick={() => handleCreate()}>
        Добавить
      </Button>
    </div>
  )
}
