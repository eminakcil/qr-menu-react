import { lazy, Suspense } from 'react'
import PrivateRoute from '@components/PrivateRoute'
import Loading from './components/Loading'

const MainLayout = lazy(() => import('./layouts/MainLayout'))
const AdminLayout = lazy(() => import('./layouts/AdminLayout'))

// const HomePage = lazy(() => import('./pages/HomePage'))
const CategoryList = lazy(() => import('./pages/CategoryList'))
const CategoryDetail = lazy(() => import('./pages/CategoryDetail'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))

// auth pages
const Login = lazy(() => import('./pages/auth/Login'))

// admin pages
const Dashboard = lazy(() => import('./pages/admin/Dashboard'))
const Records = lazy(() => import('./pages/admin/Records'))
const Settings = lazy(() => import('./pages/admin/Settings'))
const Profile = lazy(() => import('./pages/admin/Profile'))

const AdminCategoryDetail = lazy(() => import('@pages/admin/Records/Categories/CategoryDetail'))
const AdminCategoryCreate = lazy(() => import('@pages/admin/Records/Categories/CategoryCreate'))

const AdminProductDetail = lazy(() => import('@pages/admin/Records/Products/ProductDetail'))
const AdminProductCreate = lazy(() => import('@pages/admin/Records/Products/ProductCreate'))

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
    auth: true,
    path: 'admin',
    name: 'admin',
    children: [
      {
        index: true,
        element: <Dashboard />,
        lazy: true,
      },
      {
        name: 'records',
        path: 'records',
        children: [
          {
            index: true,
            element: <Records />,
            lazy: true,
          },
          {
            path: 'categories',
            name: 'categories',
            children: [
              {
                path: ':categoryId',
                name: 'detail',
                element: <AdminCategoryDetail />,
                lazy: true,
              },
              {
                path: 'create',
                name: 'create',
                element: <AdminCategoryCreate />,
                lazy: true,
              },
            ],
          },
          {
            path: 'products',
            name: 'products',
            children: [
              {
                path: ':productId',
                name: 'detail',
                element: <AdminProductDetail />,
                lazy: true,
              },
              {
                path: 'create/:categoryId',
                name: 'create',
                element: <AdminProductCreate />,
                lazy: true,
              },
            ],
          },
        ],
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
  {
    path: 'auth',
    name: 'auth',
    lazy: true,
    children: [
      {
        name: 'login',
        path: 'login',
        lazy: true,
        element: <Login />,
      },
    ],
  },
]

const mapRoute = (list) => {
  return list.map((item) => {
    if (item?.auth && 'element' in item) {
      item.element = <PrivateRoute>{item.element}</PrivateRoute>
    }

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
