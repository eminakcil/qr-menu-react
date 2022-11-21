import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import authSlice from './authSlice'

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
})

export default store

/**
 * @typedef {ReturnType<typeof store.getState>} RootState
 */

/**  @type {import('react-redux').TypedUseSelectorHook<RootState>} */
export const useAppSelector = useSelector

export const useAppDispatch = useDispatch
