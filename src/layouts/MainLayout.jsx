import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  )
}
export default MainLayout
