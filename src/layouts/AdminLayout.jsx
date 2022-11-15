import { Outlet } from 'react-router-dom'
import Header from '@components/admin/Header'
import Sidebar from '@components/admin/Sidebar'
import Footer from '@components/admin/Footer'

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-800 text-gray-300">
      <Header />
      <div className="flex-1 flex">
        <Sidebar />
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
export default AdminLayout
