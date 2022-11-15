import Item from './components/Item'
import categories from '../../categories.json'
import { Link, useParams } from 'react-router-dom'
import { useMemo } from 'react'
import { getPath } from '../../utils'

export default function CategoryDetail() {
  const { id } = useParams()

  const category = useMemo(() => categories.find((x) => x.id === id), [categories])

  return (
    <div className="flex flex-col gap-4 p-4">
      <Link to={getPath('category-list')}>
        <span className="flex gap-2">{category.name}</span>
      </Link>
      <span>{category.name}</span>
      <div className="grid grid-cols-2 gap-4">
        {category.products.map((product) => (
          <Item
            product={product}
            key={product.id}
          />
        ))}
      </div>
    </div>
  )
}
