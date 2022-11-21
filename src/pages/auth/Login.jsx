import Input from '@components/Input'

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-800 text-gray-300 grid place-items-center">
      <div className="p-4 bg-gray-700 rounded-2xl border-2 border-solid border-gray-900 max-w-lg w-full">
        <div className="flex flex-col gap-3">
          <span className="font-medium text-xl">Giriş Yap</span>
          <form>
            <div className="space-y-3">
              <div>
                <Input label="E-posta Adresi" />
              </div>
              <div>
                <Input label="Şifre" />
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
