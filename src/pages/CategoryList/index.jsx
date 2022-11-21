import Item from './components/Item'
import { useCallback, useEffect, useState } from 'react'
import SpinnerLoader from '@components/SpinnerLoader'
import { CategoryService } from '@/services'

export default function CategoryList() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(() => {
    CategoryService.getAll()
      .then((response) => setCategories(response))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    fetchData()
  }, [])
  if (loading) return <SpinnerLoader />

  return (
    <div className="flex flex-col gap-4 p-4">
      <span className="text-4xl">Kategoriler</span>
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <Item
            category={category}
            key={category._id}
          />
        ))}
      </div>
    </div>
  )
}
