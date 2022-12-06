import { IMAGE_PREFIX } from '@/contants'
import { ProductService } from '@/services'
import { errorInfo, getPath } from '@/utils'
import { ProductEditSchema } from '@/validations/ProductSchema'
import FloatButton from '@components/admin/Buttons/FloatButton'
import FloatingContainer from '@components/admin/FloatingContainer'
import ImageInput from '@components/admin/ImageInput'
import Button from '@components/Button'
import Input from '@components/Input'
import SpinnerLoader from '@components/SpinnerLoader'
import { useFormik } from 'formik'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { GoCheck, GoX } from 'react-icons/go'
import { Link, useNavigate, useParams } from 'react-router-dom'

const ProductDetail = () => {
  const { productId } = useParams()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [product, setProduct] = useState(false)

  const fetchData = useCallback(() => {
    setLoading(true)
    ProductService.getById(productId)
      .then((response) => {
        setError(false)
        setProduct(response)
      })
      .catch(() => {
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      title: '',
      logo: undefined,
      price: -1,
      description: '',
    },
    validationSchema: ProductEditSchema,
    onSubmit: (values) => {
      const body = {}

      // for title
      if (values.title && product.title !== values.title) {
        body.title = values.title
      }

      // for logo
      if (values.logo) {
        body.logo = values.logo
      }

      // for price
      if (values.price > -1 && product.price != values.price) {
        body.price = values.price
      }

      // for description
      if (values.description && product.description !== values.description) {
        body.description = values.description
      }

      if (Object.keys(body).length === 0) return

      setLoading(true)
      ProductService.edit(productId, body)
        .then((response) => {
          toast.success('Ürün Güncellendi')
          navigate(getPath('admin.records.products.detail', { productId: response._id }), {
            // replace: true,
          })
        })
        .catch(() => {
          toast.error('Ürün Güncellenmedi')
        })
        .finally(() => setLoading(false))
    },
  })

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (product) {
      formik.setFieldValue('title', product.title)
      formik.setFieldValue('price', product.price)
      formik.setFieldValue('description', product.description)
    }
  }, [product])

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    formik.setFieldValue('logo', file || '')
  }

  if (loading) return <SpinnerLoader />

  if (error)
    return (
      <>
        Hata! <Button onClick={fetchData}>Tekrar Dene</Button>
      </>
    )

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-3">
        <Link
          to={getPath('admin.records.categories.detail', { categoryId: product.category._id })}
          className="font-medium text-xl"
        >
          {product.category.title}
        </Link>
        <div className="max-w-xs">
          <Input
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {errorInfo(formik, 'title')}
        </div>
        <div className="flex gap-3">
          <div className="rounded-2xl w-56">
            <ImageInput
              initalPhoto={IMAGE_PREFIX + product.photo}
              onChange={handleFileChange}
            />
          </div>
          {errorInfo(formik, 'logo')}

          <div className="mt-auto">
            <Input
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {errorInfo(formik, 'price')}
          </div>
        </div>
        <div className="max-w-[417px]">
          <Input
            type="textarea"
            rows="6"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {errorInfo(formik, 'description')}
        </div>
      </div>
      <FloatingContainer>
        <FloatButton
          icon={GoX}
          size={16}
          to={getPath('admin.records.products.detail', { productId })}
          type="button"
        />
        <FloatButton
          icon={GoCheck}
          link={false}
          type="submit"
        />
      </FloatingContainer>
    </form>
  )
}
export default ProductDetail
