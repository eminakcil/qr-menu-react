import { IMAGE_PREFIX } from '@/contants'
import { CategoryService } from '@/services'
import { getPath } from '@/utils'
import FloatButton from '@components/admin/Buttons/FloatButton'
import FloatingContainer from '@components/admin/FloatingContainer'
import IconItem from '@components/admin/IconItem'
import Button from '@components/Button'
import SpinnerLoader from '@components/SpinnerLoader'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { GoPlus } from 'react-icons/go'

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
                  imgSrc={IMAGE_PREFIX + category.photo}
                  to={getPath('admin.records.categories.detail', { categoryId: category._id })}
                />
              ))}
          </div>
        )}
      </div>
      <FloatingContainer>
        <FloatButton
          icon={GoPlus}
          to={getPath('admin.records.categories.create')}
        />
      </FloatingContainer>
    </>
  )
}
export default Categories
