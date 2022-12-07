import Item from './components/Item'
import { Link, useParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import { getPath } from '../../utils'
import { CategoryService } from '@/services'
import SpinnerLoader from '@components/SpinnerLoader'
import { IoArrowBack } from 'react-icons/io5'

export default function CategoryDetail() {
  const { id } = useParams()
  const [category, setCategory] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(() => {
    CategoryService.getById(id)
      .then((response) => setCategory(response))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    fetchData()
  }, [])
  if (loading) return <SpinnerLoader />

  return (
    <div className="flex flex-col gap-4 p-4">
      <Link
        to={getPath('category-list')}
        className="flex gap-2 items-center"
      >
        <IoArrowBack size={24} />
        <span className="text-4xl">{category.title}</span>
      </Link>
      <div className="grid grid-cols-2 gap-4">
        {category.products.map((product) => (
          <Item
            product={product}
            key={product._id}
          />
        ))}
      </div>
    </div>
  )
}
