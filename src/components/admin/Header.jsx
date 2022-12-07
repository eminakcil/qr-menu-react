import { useAppSelector } from '@/store'
import { logout } from '@/utils'
import Button from '@components/Button'

const Header = () => {
  const { user } = useAppSelector((state) => state.auth)
  return (
    <div className="h-24 px-4 flex gap-4 items-center justify-end">
      <span className="flex flex-col items-center">
        <span>{user.name}</span>
        <span className="text-xs">({user.email})</span>
      </span>
      <Button
        type="button"
        onClick={() => logout()}
        circle
        className="bg-transparent hover:bg-gray-600 border-2 border-solid text-gray-400 hover:text-white"
      >
        Çıkış yap
      </Button>
    </div>
  )
}
export default Header
