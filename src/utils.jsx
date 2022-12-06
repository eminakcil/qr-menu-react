import routes from './routes'
import { generatePath } from 'react-router-dom'
import dayjs from 'dayjs'
import ErrorMessage from '@components/ErrorMessage'

/**
 *
 * @param {Array} routeList
 * @param {String | false} prefix
 */
export const prepRoutes = (routeList = routes, prefix) => {
  return routeList
    .filter((route) => !route?.index)
    .map((route) => {
      if ('children' in route) {
        if (!('name' in route)) {
          return prepRoutes(route.children, route?.path)
        }
        return { ...route, children: prepRoutes(route.children) }
      }
      const path = [prefix, route.path].filter((item) => item).join('/')
      return { ...route, path }
    })
    .flat()
}

/**
 *  @typedef {'categoryDetail'|'productDetail'|'admin'|'admin.records'|'admin.records.categories'|'admin.records.categories.create'|'admin.records.categories.detail'|'admin.records.categories.edit'|'admin.records.products.detail'|'admin.records.products.edit'|'admin.records.products.create'|'auth.login'} routeNames
 */

/**
 *
 * @param {routeNames} path
 * @param {object} data
 */
export const getPath = (path, data = {}) => {
  let finalRoute = path
    .split('.')
    .reduce((acc, value) => {
      if (acc.length === 0) {
        acc.push(prepRoutes().find((x) => x.name === value))
      } else {
        acc.push(acc[acc.length - 1].children.find((x) => x.name === value))
      }

      return acc
    }, [])
    .map((x) => x?.path)
    .join('/')

  finalRoute = '/'.concat(finalRoute)

  // if (finalRoute.length === 1) {
  //   finalRoute = '/'
  // }

  return generatePath(finalRoute, data)
}

export const dateFormat = (date) => dayjs(date).format('DD.MM.YYYY HH:mm')
export const getDate = () => dayjs().format('DD.MM.YYYY')

export const hourFormat = (hour) => (hour < 10 ? '0' : '') + hour

export const getHour = (date) => dayjs(date).format('HH')

export const getPeriodTitleByStrategicPlan = (strategicPlan, seperator = ' - ') => {
  return ''.concat(
    strategicPlan.period?.at(0)?.title,
    seperator,
    strategicPlan.period?.at(-1)?.title
  )
}

export const errorInfo = (formik, key) => {
  if (formik.errors?.[key] && formik.touched?.[key]) {
    return <ErrorMessage>{formik.errors[key]}</ErrorMessage>
  }

  return null
}
