import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import categories from '../../categories.json'
import { getPath } from '../../utils'
import LazyImage from '../../components/LazyImage'

export default function ProductDetail() {
  const { id } = useParams()

  const product = useMemo(
    () =>
      categories
        .map((x) => x.products)
        .flat()
        .find((product) => product.id === id),
    [id]
  )

  const category = useMemo(
    () => categories.find((x) => x.products.map((p) => p.id).includes(id)),
    [product]
  )

  return (
    <div className="min-h-screen flex flex-col gap-4">
      <div style={{ '--aspect-ratio': '1' }}>
        <div>
          <LazyImage
            className="absolute top-0 left-0 w-full h-full object-fill rounded-b-xl"
            src={product.image}
          />
        </div>
      </div>

      <div className="px-4">
        <Link to={getPath('categoryDetail', { id: category.id })}>
          <span className="flex gap-2">{category.name}</span>
        </Link>
      </div>

      <div className="flex-1 px-4 mb-4 flex flex-col">
        <div className="flex justify-between items-end">
          <span className="font-medium text-xl">{product.name}</span>
          <span className="text-2xl">{`${product.price.toFixed(2)}`.replace('.', ',')} TL</span>
        </div>
        {product?.description && <div>{product.description}</div>}
      </div>
    </div>
  )
}
