import { CategoryService } from '@/services'
import { getPath } from '@/utils'
import IconItem from '@components/admin/IconItem'
import Button from '@components/Button'
import SpinnerLoader from '@components/SpinnerLoader'
import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

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
    <div className="w-full">
      <span className="font-medium text-xl">{category.title}</span>
      <div className="flex gap-1 flex-wrap">
        {category.products.map((product) => (
          <IconItem
            key={product._id}
            title={product.title}
            imgSrc={product.photo}
            to={getPath('admin.records.categories.detail', { categoryId: product._id })}
          />
        ))}
      </div>
    </div>
  )
}
export default CategoryDetail
