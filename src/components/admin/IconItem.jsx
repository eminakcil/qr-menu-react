import { Link } from 'react-router-dom'

const IconItem = ({ to, imgSrc, title, imgAlt = title }) => {
  return (
    <Link
      to={to}
      className="w-36 flex flex-col gap-3 rounded-3xl p-3 select-none cursor-pointer hover:bg-gray-300 hover:text-gray-700 active:bg-gray-100 active:text-gray-800"
    >
      <img
        src={imgSrc}
        alt={imgAlt}
        className="w-full aspect-square object-cover rounded-3xl z-0"
      />
      <div className="text-center">{title}</div>
    </Link>
  )
}
export default IconItem
