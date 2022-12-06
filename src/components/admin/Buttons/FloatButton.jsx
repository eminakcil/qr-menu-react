import Button from '@components/Button'
import { Link } from 'react-router-dom'

const FloatButton = ({ icon, size = 24, link = true, ...props }) => {
  const Icon = icon

  return (
    <div className="grid place-items-center">
      <Button
        variant="dark"
        circle={true}
        {...(link && { as: Link })}
        {...props}
      >
        <Icon size={size} />
      </Button>
    </div>
  )
}
export default FloatButton
