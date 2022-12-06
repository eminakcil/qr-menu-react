import { get, patch, post } from './request'

const SERVICE_PATH = 'products'

export const getAll = () => get(SERVICE_PATH)
export const getById = (id) => get(SERVICE_PATH.concat('/', id))
export const create = (data) => post(SERVICE_PATH, data)
export const edit = (id, data) => patch([SERVICE_PATH, id, 'edit'].join('/'), data)
