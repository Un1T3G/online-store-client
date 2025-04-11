'use client'

import { ProductResponse } from 'shared/api'
import { Container } from 'shared/ui'
import { ProductItem, ProductRow } from 'widgets/products'
import { Hero } from './hero'

interface IProps {
  data: {
    title: string
    description: string
    link: string
    products: ProductResponse[]
  }[]
}

export const HomePage = ({ data }: IProps) => {
  return (
    <>
      <Hero />
      <Container className="mb-16">
        <div className="space-y-16 mt-4">
          {data.map((x, index) => (
            <ProductRow
              key={index}
              title={x.title}
              description={x.description}
              moreLink={x.link}
              products={x.products}
              renderProduct={(product) => (
                <ProductItem key={product.id} product={product} />
              )}
            />
          ))}
        </div>
      </Container>
    </>
  )
}
