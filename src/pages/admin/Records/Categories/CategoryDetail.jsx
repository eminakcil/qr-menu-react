import { CategoryService } from '@/services'
import { getPath } from '@/utils'
import IconItem from '@components/admin/IconItem'
import Button from '@components/Button'
import SpinnerLoader from '@components/SpinnerLoader'
import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { IMAGE_PREFIX } from '@/contants'
import FloatingContainer from '@components/admin/FloatingContainer'
import { GoPencil, GoPlus } from 'react-icons/go'
import FloatButton from '@components/admin/Buttons/FloatButton'
import Divider from '@components/Divider'

const CategoryDetail = () => {
  const { categoryId } = useParams()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [category, setCategory] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = useCallback(() => {
    CategoryService.getById(categoryId)
      .then((response) => {
        setCategory(response)
      })
      .catch(() => {
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
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
      <div className="w-full flex flex-col gap-3">
        <Link
          to={getPath('admin.records')}
          className="font-medium text-xl"
        >
          Kategoriler
        </Link>
        <Divider />
        <div className="flex items-center">
          <span className="font-medium text-3xl">{category.title}</span>
          <div className="ml-auto w-36 px-3">
            <img
              src={IMAGE_PREFIX + category.photo}
              className="w-full aspect-square object-cover rounded-3xl"
            />
          </div>
        </div>
        <Divider />
        <div className="flex gap-1 flex-wrap">
          {category.products.map((product) => (
            <IconItem
              key={product._id}
              title={product.title}
              imgSrc={IMAGE_PREFIX + product.photo}
              to={getPath('admin.records.products.detail', { productId: product._id })}
            />
          ))}
        </div>
      </div>
      <FloatingContainer>
        <FloatButton
          icon={GoPencil}
          to={getPath('admin.records.categories.edit', { categoryId })}
        />
        <FloatButton
          icon={GoPlus}
          to={getPath('admin.records.products.create', { categoryId })}
        />
      </FloatingContainer>
    </>
  )
}
export default CategoryDetail
