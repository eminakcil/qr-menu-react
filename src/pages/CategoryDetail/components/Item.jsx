import CardItem from '../../../components/CardItem'
import { getPath } from '../../../utils'

export default function Item({ product }) {
  return (
    <CardItem
      to={getPath('productDetail', { id: product._id })}
      src={product.photo}
      text={product.title}
    />
  )
}
