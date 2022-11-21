import { postJSON } from './request'

const SERVICE_PATH = 'users'

export const login = (data) => postJSON(SERVICE_PATH + '/login', data)
