import classNames from 'classnames'

const CategoryItem = ({ selected = false, onClick = () => {}, category }) => {
  return (
    <div
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
    </div>
  )
}
export default CategoryItem
