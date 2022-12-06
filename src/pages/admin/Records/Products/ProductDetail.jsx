import { IMAGE_PREFIX } from '@/contants'
import { ProductService } from '@/services'
import { getPath } from '@/utils'
import FloatButton from '@components/admin/Buttons/FloatButton'
import FloatingContainer from '@components/admin/FloatingContainer'
import Button from '@components/Button'
import SpinnerLoader from '@components/SpinnerLoader'
import { useCallback, useEffect, useState } from 'react'
import { GoPencil } from 'react-icons/go'
import { Link, useParams } from 'react-router-dom'

const ProductDetail = () => {
  const { productId } = useParams()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [product, setProduct] = useState(false)

  const fetchData = useCallback(() => {
    setLoading(true)
    ProductService.getById(productId)
      .then((response) => {
        setError(false)
        setProduct(response)
      })
      .catch(() => {
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) return <SpinnerLoader />

  if (error)
    return (
      <>
        Hata! <Button onClick={fetchData}>Tekrar Dene</Button>
      </>
    )

  return (
    <>
      <div className="flex flex-col gap-3">
        <Link
          to={getPath('admin.records.categories.detail', { categoryId: product.category._id })}
          className="font-medium text-xl"
        >
          {product.category.title}
        </Link>
        <span className="font-medium text-xl">{product.title}</span>
        <div className="flex gap-3">
          <img
            src={IMAGE_PREFIX + product.photo}
            alt={product.title}
            className="rounded-2xl w-56 aspect-square object-cover"
          />
          <span className="text-lg mt-auto">{product.price} ₺</span>
        </div>
        <div>{product.description}</div>
      </div>
      <FloatingContainer>
        <FloatButton
          icon={GoPencil}
          to={'/'}
        />
      </FloatingContainer>
    </>
  )
}
export default ProductDetail
