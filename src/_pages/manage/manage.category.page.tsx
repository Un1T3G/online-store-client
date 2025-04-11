'use client'

import { CirclePlus, Search } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { routes } from 'shared/config'
import { Button, InputWithLeadingIcon } from 'shared/ui'
import { CategoryDataTable } from 'widgets/category'

export const ManageCategoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleOnChange = (e: any) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Категории</h1>
        <Button asChild>
          <Link href={routes.adminCategoryCreate}>
            <CirclePlus />
            Создать
          </Link>
        </Button>
      </div>
      <InputWithLeadingIcon
        icon={Search}
        placeholder="Поиск по названию"
        className="w-full md:w-xl"
        value={searchTerm}
        onChange={handleOnChange}
      />
      <CategoryDataTable searchTerm={searchTerm} />
    </div>
  )
}
