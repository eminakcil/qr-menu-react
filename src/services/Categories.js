import { get, post } from './request'

const SERVICE_PATH = 'categories'

export const getAll = () => get(SERVICE_PATH)
export const getById = (id) => get(SERVICE_PATH.concat('/', id))
export const create = (data) => post(SERVICE_PATH, data)
