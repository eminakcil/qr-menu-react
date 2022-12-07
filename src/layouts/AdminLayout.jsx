import { Outlet } from 'react-router-dom'
import Header from '@components/admin/Header'
import Sidebar from '@components/admin/Sidebar'
import Footer from '@components/admin/Footer'
import { useEffect } from 'react'
import { GeneralService } from '@/services'

const AdminLayout = () => {
  useEffect(() => {
    GeneralService.ping()
  }, [])

  return (
    <div className="flex bg-gray-800 text-gray-300">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <Header />
        <div className="px-3 flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  )
}
export default AdminLayout
