import Item from './components/Item'
import categories from '../../categories.json'

export default function CategoryList() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <span className="text-4xl">Kategoriler</span>
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <Item
            category={category}
            key={category.id}
          />
        ))}
      </div>
    </div>
  )
}
