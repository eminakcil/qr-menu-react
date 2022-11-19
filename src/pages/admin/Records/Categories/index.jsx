import { CategoryService } from '@/services'
import Button from '@components/Button'
import SpinnerLoader from '@components/SpinnerLoader'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import CategoryItem from './components/CategoryItem'

const Categories = () => {
  const [categoryList, setCategoryList] = useState(false)
  const [categoryListLoading, setCategoryListLoading] = useState(true)
  const [categoryListError, setCategoryListError] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    setCategoryListLoading(true)

    CategoryService.getAll()
      .then(setCategoryList)
      .catch(() => setCategoryListError(true))
      .finally(() => setCategoryListLoading(false))
  }

  if (categoryListError)
    return (
      <>
        <Button onClick={fetchData}>Tekrar Dene</Button>
      </>
    )

  if (categoryListLoading) return <SpinnerLoader />

  return (
    <div className="w-full">
      <span className="font-medium text-xl">Kategoriler</span>
      {categoryList && (
        <div className={classNames('flex gap-1 flex-wrap')}>
          {categoryList &&
            categoryList.map((category) => (
              <CategoryItem
                key={category._id}
                onClick={() => null}
                category={category}
              />
            ))}
        </div>
      )}
    </div>
  )
}
export default Categories
