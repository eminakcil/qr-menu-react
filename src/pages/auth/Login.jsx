import { AuthService } from '@/services'
import { useAppDispatch, useAppSelector } from '@/store'
import { setUser } from '@/store/authSlice'
import { errorInfo, getPath } from '@/utils'
import { LoginSchema } from '@/validations/AuthSchema'
import Input from '@components/Input'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { Navigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      AuthService.login(values)
        .then((response) => {
          dispatch(setUser(response))
        })
        .catch(({ error }) => {
          switch (error?.message) {
            case 'wrong email':
              toast.error('Hatalı E-posta Adresi')

              break
            case 'wrong password':
              toast.error('Hatalı Şifre')
              break

            default:
              break
          }
          console.warn(error)
        })
    },
  })

  if (user) return <Navigate to={location?.state?.returnUrl || getPath('admin')} />

  return (
    <div className="min-h-screen bg-gray-800 text-gray-300 grid place-items-center">
      <div className="p-4 bg-gray-700 rounded-2xl border-2 border-solid border-gray-900 max-w-lg w-full">
        <div className="flex flex-col gap-3">
          <span className="font-medium text-xl">Giriş Yap</span>
          <form onSubmit={formik.handleSubmit}>
            <div className="space-y-3">
              <div>
                <Input
                  label="E-posta Adresi"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {errorInfo(formik, 'email')}
              </div>
              <div>
                <Input
                  label="Şifre"
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {errorInfo(formik, 'password')}
              </div>
              <div className="text-end">
                <button
                  type="submit"
                  className="rounded-xl bg-gray-800 hover:bg-gray-700 border-2 border-solid border-gray-800 px-5 py-2"
                >
                  Giriş
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Login
