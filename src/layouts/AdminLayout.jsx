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
    <div className="min-h-screen flex flex-col bg-gray-800 text-gray-300">
      <Header />
      <div className="flex-1 flex w-full">
        <Sidebar />
        <div className="px-3 flex-1">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default AdminLayout
