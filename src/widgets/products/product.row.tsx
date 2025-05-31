import { Link2 } from 'lucide-react'
import Link from 'next/link'
import { ReactNode } from 'react'
import { ProductResponse } from 'shared/api'
import { Button } from 'shared/ui'

interface IProps {
  title: string
  description: string
  moreLink: string
  products: ProductResponse[]
  renderProduct: (product: ProductResponse) => ReactNode
}

export const ProductRow = ({
  title,
  description,
  moreLink,
  products,
  renderProduct,
}: IProps) => {
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <div className="mb-2 md:mb-0 w-full">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Button
          variant="link"
          className="w-full md:w-auto text-blue-500"
          asChild
        >
          <Link href={moreLink}>
            <Link2 />
            Узнать больше
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map(renderProduct)}
      </div>
    </div>
  )
}
