import { CategoryService } from '@/services'
import { getPath } from '@/utils'
import FloatButton from '@components/admin/FloatButton'
import IconItem from '@components/admin/IconItem'
import Button from '@components/Button'
import SpinnerLoader from '@components/SpinnerLoader'
import classNames from 'classnames'
import { useEffect, useState } from 'react'

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
    <>
      <div className="w-full flex flex-col gap-3">
        <span className="font-medium text-xl">Kategoriler</span>
        {categoryList && (
          <div className={classNames('flex gap-1 flex-wrap')}>
            {categoryList &&
              categoryList.map((category) => (
                <IconItem
                  key={category._id}
                  title={category.title}
                  imgSrc={category.photo}
                  to={getPath('admin.records.categories.detail', { categoryId: category._id })}
                />
              ))}
          </div>
        )}
      </div>
      <FloatButton to={getPath('admin.records.categories.create')} />
    </>
  )
}
export default Categories
