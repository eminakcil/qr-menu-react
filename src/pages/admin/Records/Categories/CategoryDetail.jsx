import { CategoryService } from '@/services'
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
    </div>
  )
}
export default CategoryDetail
