import { NavLink } from 'react-router-dom'
import { GoFileDirectory } from 'react-icons/go'
import { getPath } from '@/utils'
import classNames from 'classnames'
const Sidebar = () => {
  const routes = [
    // {
    //   routeName: 'admin',
    //   icon: GoDashboard,
    //   text: 'Gösterge Paneli',
    // },
    {
      routeName: 'admin.records',
      icon: GoFileDirectory,
      text: 'Kayıtlar',
    },
    // {
    //   routeName: 'admin.settings',
    //   icon: GoSettings,
    //   text: 'Ayarlar',
    // },
    // {
    //   routeName: 'admin.profile',
    //   icon: GoPerson,
    //   text: 'Profilim',
    // },
  ]

  return (
    <div className="w-72 shrink-0">
      <div className="flex flex-col divide-y divide-gray-500">
        {routes.map((route, index) => (
          <NavLink
            end
            key={index}
            to={getPath(route.routeName)}
            className={({ isActive }) =>
              classNames('p-3 flex items-center gap-3', {
                'hover:bg-gray-700': !isActive,
                'bg-gray-700 hover:bg-gray-600': isActive,
              })
            }
          >
            <route.icon size={21} />
            <span>{route.text}</span>
          </NavLink>
        ))}
      </div>
    </div>
  )
}
export default Sidebar
