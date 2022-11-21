import { ProductService } from '@/services'
import { errorInfo, getPath } from '@/utils'
import { ProductCreateSchema } from '@/validations/ProductSchema'
import Button from '@components/Button'
import Input from '@components/Input'
import Loading from '@components/Loading'
import { useFormik } from 'formik'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useParams } from 'react-router-dom'

const ProductCreate = () => {
  const { categoryId } = useParams()

  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null)

  const formik = useFormik({
    initialValues: {
      title: '',
      logo: undefined,
      price: 0,
      description: '',
    },
    validationSchema: ProductCreateSchema,
    onSubmit: (values, { resetForm }) => {
      setLoading(true)
      ProductService.create({ ...values, category: categoryId })
        .then((response) => {
          resetForm()
          toast.success(
            (t) => (
              <div className="flex items-center gap-3">
                <span>Ürün Eklendi</span>
                <Link
                  className="text-sm rounded-full w-10 h-10 grid place-items-center bg-gray-800 hover:bg-gray-700"
                  to={getPath('admin.records.products.detail', { productId: response._id })}
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
      <span className="font-medium text-xl">Ürün Ekle</span>
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
          {errorInfo(formik, 'title')}
        </div>
        <div>
          <Input
            label="Fiyat"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {errorInfo(formik, 'price')}
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
          {errorInfo(formik, 'logo')}
        </div>
        <div>
          <Input
            label="Açıklama"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {errorInfo(formik, 'description')}
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
export default ProductCreate
