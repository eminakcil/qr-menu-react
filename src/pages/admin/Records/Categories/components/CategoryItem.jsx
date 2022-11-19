import { getPath } from '@/utils'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

const CategoryItem = ({ selected = false, onClick = () => {}, category }) => {
  return (
    <Link
      to={getPath('admin.records.categories.detail', { categoryId: category._id })}
      className={classNames(
        'w-36 flex flex-col gap-3 rounded-3xl p-3 select-none cursor-pointer hover:bg-gray-300 hover:text-gray-700 active:bg-gray-100 active:text-gray-800',
        {
          'bg-gray-300 text-gray-700': selected,
        }
      )}
      onClick={onClick}
    >
      <img
        src={category.photo}
        alt={category.title}
        className="w-full aspect-square object-cover rounded-3xl z-0"
      />
      <div className="text-center">{category.title}</div>
    </Link>
  )
}
export default CategoryItem
