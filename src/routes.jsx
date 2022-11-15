import { lazy, Suspense } from 'react'
import Loading from './components/Loading'

const MainLayout = lazy(() => import('./layouts/MainLayout'))
const AdminLayout = lazy(() => import('./layouts/AdminLayout'))

// const HomePage = lazy(() => import('./pages/HomePage'))
const CategoryList = lazy(() => import('./pages/CategoryList'))
const CategoryDetail = lazy(() => import('./pages/CategoryDetail'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))

// admin pages
const Dashboard = lazy(() => import('./pages/admin/Dashboard'))
const Records = lazy(() => import('./pages/admin/Records'))
const Settings = lazy(() => import('./pages/admin/Settings'))
const Profile = lazy(() => import('./pages/admin/Profile'))

/** @type {import('react-router-dom').RouteObject[]} */

const routes = [
  {
    element: <MainLayout />,
    lazy: true,
    children: [
      {
        index: true,
        element: <CategoryList />,
        lazy: true,
      },
      {
        path: ':id',
        name: 'categoryDetail',
        element: <CategoryDetail />,
        lazy: true,
      },
      {
        path: 'products/:id',
        name: 'productDetail',
        element: <ProductDetail />,
        lazy: true,
      },
      // {
      //   path: 'room-informations',
      //   name: 'roomInformation',
      //   children: [
      //     {
      //       index: true,
      //       element: <RoomInformation />,
      //       lazy: true,
      //     },
      //   ],
      // },
    ],
  },
  {
    element: <AdminLayout />,
    lazy: true,
    path: 'admin',
    name: 'admin',
    children: [
      {
        index: true,
        element: <Dashboard />,
        lazy: true,
      },
      {
        path: 'records',
        name: 'records',
        element: <Records />,
        lazy: true,
      },
      {
        path: 'settings',
        name: 'settings',
        element: <Settings />,
        lazy: true,
      },
      {
        path: 'profile',
        name: 'profile',
        element: <Profile />,
        lazy: true,
      },
    ],
  },
]

const mapRoute = (list) => {
  return list.map((item) => {
    // if (item?.auth && 'element' in item) {
    //   item.element = <PrivateRoute>{item.element}</PrivateRoute>
    // }

    if (item?.lazy && 'element' in item) {
      item.element = <Suspense fallback={<Loading />}>{item.element}</Suspense>
    }

    // if (item?.wrap && 'element' in item) {
    //   item.element = <Wrapper>{item.element}</Wrapper>
    // }

    // if ('element' in item) {
    //   item.element = <RouteTransition key={index}>{item.element}</RouteTransition>
    // }

    if ('children' in item) {
      item.children = mapRoute(item.children)
    }

    return item
  })
}

const finalRoutes = mapRoute(routes)

export default finalRoutes
