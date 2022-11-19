import { CategoryService } from '@/services'
import Button from '@components/Button'
import Loading from '@components/Loading'
import classNames from 'classnames'
import { useEffect, useMemo, useRef, useState } from 'react'
import CategoryItem from './components/CategoryItem'

const Categories = () => {
  const [categoryList, setCategoryList] = useState(false)
  const [categoryListLoading, setCategoryListLoading] = useState(true)
  const [categoryListError, setCategoryListError] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState(false)
  const [coord, setCoord] = useState({ x: 0, y: 0 })
  const [animateIt, setAnimateIt] = useState(false)

  const selectedCategory = useMemo(
    () => categoryList && categoryList?.find(({ _id }) => _id === selectedCategoryId),
    [selectedCategoryId, categoryList]
  )

  const categoryListRef = useRef(null)

  useEffect(() => {
    fetchData()
  }, [])

  const selectCategory = (categoryId, event) => {
    setSelectedCategoryId((selected) => (selected === categoryId ? false : categoryId))

    if (event) {
      setCoord({ y: event.target.offsetTop - 12, x: event.target.offsetLeft - 12 })
    }
  }

  useEffect(() => {
    if (coord.x !== 0 || coord.y !== 0) {
      setAnimateIt(true)
      setCoord({ y: 0, x: 0 })

      setTimeout(() => {
        setAnimateIt(false)
      }, 500)
    }
  }, [coord])

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

  if (categoryListLoading) return <Loading />

  return (
    <div className="w-full">
      <span className="font-medium text-xl">Kategoriler</span>
      <div
        ref={categoryListRef}
        className="relative"
      >
        <div
          className={classNames('absolute', {
            'duration-500': animateIt,
          })}
          style={{ left: coord.x, top: coord.y }}
        >
          {selectedCategory && (
            <CategoryItem
              category={selectedCategory}
              selected={true}
              onClick={() => selectCategory(selectedCategoryId)}
            />
          )}
        </div>
        <div className={classNames({ hidden: selectedCategoryId })}>
          {categoryList && (
            <div className={classNames('flex gap-1 flex-wrap')}>
              {categoryList &&
                categoryList.map((category) => (
                  <CategoryItem
                    key={category._id}
                    selected={selectedCategoryId === category._id}
                    onClick={(e) => selectCategory(category._id, e)}
                    category={category}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default Categories
