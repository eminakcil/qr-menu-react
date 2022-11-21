import { CategoryService } from '@/services'
import { getPath } from '@/utils'
import { CategoryCreateSchema } from '@/validations/CategorySchema'
import Button from '@components/Button'
import ErrorMessage from '@components/ErrorMessage'
import Input from '@components/Input'
import Loading from '@components/Loading'
import { useFormik } from 'formik'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const CategoryCreate = () => {
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null)

  const formik = useFormik({
    initialValues: {
      title: '',
      logo: undefined,
    },
    validationSchema: CategoryCreateSchema,
    onSubmit: (values, { resetForm }) => {
      setLoading(true)
      CategoryService.create(values)
        .then((response) => {
          resetForm()
          toast.success(
            (t) => (
              <div className="flex items-center gap-3">
                <span>Kategori Eklendi</span>
                <Link
                  className="text-sm rounded-full w-10 h-10 grid place-items-center bg-gray-800 hover:bg-gray-700"
                  to={getPath('admin.records.categories.detail', { categoryId: response._id })}
                  onClick={() => toast.dismiss(t.id)}
                >
                  git
                </Link>
              </div>
            ),
            { duration: 10000 }
          )
        })
        .catch(() => {})
        .finally(() => setLoading(false))
    },
    onReset: () => {
      fileInputRef.current.value = ''
    },
  })

  return (
    <div>
      <span className="font-medium text-xl">Kategori Ekle</span>
      <form
        className="max-w-sm space-y-3"
        onSubmit={formik.handleSubmit}
      >
        <div>
          <Input
            label="Başlık"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.title && formik.touched.title && (
            <ErrorMessage>{formik.errors.title}</ErrorMessage>
          )}
        </div>
        <div>
          <Input
            ref={fileInputRef}
            type="file"
            label="Resim"
            name="logo"
            onChange={(e) => formik.setFieldValue('logo', e.target.files[0])}
            onBlur={formik.handleBlur}
          />
          {formik.errors.logo && formik.touched.logo && (
            <ErrorMessage>{formik.errors.logo}</ErrorMessage>
          )}
        </div>
        <Button
          className="float-right flex items-center"
          type="submit"
          disabled={loading}
        >
          {loading && (
            <span className="mr-2">
              <Loading size={18} />
            </span>
          )}
          Ekle
        </Button>
      </form>
    </div>
  )
}
export default CategoryCreate
