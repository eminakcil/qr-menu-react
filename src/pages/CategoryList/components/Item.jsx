import CardItem from '../../../components/CardItem'
import { getPath } from '../../../utils'

export default function Item({ category }) {
  return (
    <CardItem
      to={getPath('categoryDetail', { id: category._id })}
      src={category.photo}
      text={category.title}
    />
  )
}
