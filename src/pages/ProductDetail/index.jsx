import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getPath } from '../../utils'
import LazyImage from '../../components/LazyImage'
import { ProductService } from '@/services'
import SpinnerLoader from '@components/SpinnerLoader'
import { IMAGE_PREFIX } from '@/contants'
import { IoArrowBack } from 'react-icons/io5'

export default function ProductDetail() {
  const { id } = useParams()

  const [product, setProduct] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(() => {
    ProductService.getById(id)
      .then((response) => setProduct(response))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    fetchData()
  }, [])
  if (loading) return <SpinnerLoader />

  return (
    <div className="min-h-screen flex flex-col gap-4">
      <div style={{ '--aspect-ratio': '1' }}>
        <div>
          <LazyImage
            className="absolute top-0 left-0 w-full h-full object-cover rounded-b-xl"
            src={IMAGE_PREFIX + product.photo}
          />
        </div>
      </div>

      <div className="px-4">
        <Link
          to={getPath('categoryDetail', { id: product.category._id })}
          className="flex gap-2 items-center"
        >
          <IoArrowBack size={16} />
          <span className="text-xl">{product.category.title}</span>
        </Link>
      </div>

      <div className="flex-1 px-4 mb-4 flex flex-col">
        <div className="flex justify-between items-end">
          <span className="font-medium text-xl">{product.title}</span>
          <span className="text-2xl">{`${product.price.toFixed(2)}`.replace('.', ',')} TL</span>
        </div>
        {product?.description && <div>{product.description}</div>}
      </div>
    </div>
  )
}
