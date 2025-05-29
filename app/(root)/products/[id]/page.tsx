import { ProductDetailPage } from '_pages/product-detail'
import { Metadata } from 'next'
import { productService } from 'shared/api'

async function getProduct(id: string) {
  const product = await productService.getById(id)
  return product
}

async function getSimilarProducts(id: string) {
  const products = await productService.getSimilar(id, { perPage: 4 })
  return products.data
}

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const product = await getProduct(params.id)

  return {
    title: product.title,
    description: product.description,
    other: {
      title: product.title,
      description: product.description,
      images: [product.images[0]],
    },
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.images[0]],
    },
    twitter: {
      title: product.title,
      description: product.description,
      images: [product.images[0]],
    },
  }
}

export default async function NextProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [product, similarProducts] = await Promise.all([
    getProduct(id),
    getSimilarProducts(id),
  ])

  return (
    <ProductDetailPage product={product} similarProducts={similarProducts} />
  )
}
