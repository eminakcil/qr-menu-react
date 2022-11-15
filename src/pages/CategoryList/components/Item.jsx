import CardItem from '../../../components/CardItem'
import { getPath } from '../../../utils'

export default function Item({ category }) {
  return (
    <CardItem
      to={getPath('categoryDetail', { id: category.id })}
      src={category.image}
      text={category.name}
    />
  )
}
