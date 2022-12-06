import { IMAGE_PREFIX } from '@/contants'
import { ProductService } from '@/services'
import { getPath } from '@/utils'
import FloatButton from '@components/admin/Buttons/FloatButton'
import FloatingContainer from '@components/admin/FloatingContainer'
import ImageInput from '@components/admin/ImageInput'
import Button from '@components/Button'
import Input from '@components/Input'
import SpinnerLoader from '@components/SpinnerLoader'
import { useCallback, useEffect, useState } from 'react'
import { GoCheck, GoX } from 'react-icons/go'
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
        <div className="max-w-xs">
          <Input value={product.title} />
        </div>
        <div className="flex gap-3">
          <div className="rounded-2xl w-56">
            <ImageInput initalPhoto={IMAGE_PREFIX + product.photo} />
          </div>

          <div className="mt-auto">
            <Input value={product.price} />
          </div>
        </div>
        <div className="max-w-[417px]">
          <Input
            type="textarea"
            rows="6"
            value={product.description}
          />
        </div>
      </div>
      <FloatingContainer>
        <FloatButton
          icon={GoX}
          size={16}
          to={getPath('admin.records.products.detail', { productId })}
        />
        <FloatButton
          icon={GoCheck}
          link={false}
        />
      </FloatingContainer>
    </>
  )
}
export default ProductDetail
