import Button from '@components/Button'
import { Link } from 'react-router-dom'

const FloatButton = ({ to, icon }) => {
  const Icon = icon
  return (
    <Button
      variant="dark"
      circle={true}
      as={Link}
      to={to}
    >
      <Icon className="w-6 h-6" />
    </Button>
  )
}
export default FloatButton
