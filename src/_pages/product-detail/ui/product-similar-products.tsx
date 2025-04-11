import { ProductResponse } from 'shared/api'
import { ProductGrid, ProductItem } from 'widgets/products'

interface IProps {
  similarProducts: ProductResponse[]
}

export const ProductSimilarProducts = ({ similarProducts }: IProps) => {
  return (
    <>
      <h1 className="text-xl font-bold mb-2">Похожие товары</h1>
      <ProductGrid
        products={similarProducts}
        className="mb-8"
        renderProduct={(product) => (
          <ProductItem key={product.id} product={product} />
        )}
      />
    </>
  )
}
