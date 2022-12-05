import { IMAGE_PREFIX } from '@/contants'
import { CategoryService } from '@/services'
import { errorInfo, getPath } from '@/utils'
import { CategoryEditSchema } from '@/validations/CategorySchema'
import ImageInput from '@components/admin/ImageInput'
import Button from '@components/Button'
import Input from '@components/Input'
import Loading from '@components/Loading'
import SpinnerLoader from '@components/SpinnerLoader'
import { useFormik } from 'formik'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams, useNavigate } from 'react-router-dom'

const CategoryEdit = () => {
  const { categoryId } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [category, setCategory] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = useCallback(() => {
    CategoryService.getById(categoryId)
      .then((response) => {
        setCategory(response)
      })
      .catch(() => {
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    formik.setFieldValue('logo', file || '')
  }

  const formik = useFormik({
    initialValues: {
      title: '',
      logo: undefined,
    },
    validationSchema: CategoryEditSchema,
    onSubmit: (values) => {
      const body = {}

      // for title
      if (values.title && category.title !== values.title) {
        body.title = values.title
      }

      // for logo
      if (values.logo) {
        body.logo = values.logo
      }

      if (Object.keys(body).length === 0) return

      setLoading(true)
      CategoryService.edit(categoryId, body)
        .then((response) => {
          toast.success('Kategori Güncellendi')
          navigate(getPath('admin.records.categories.detail', { categoryId: response._id }), {
            // replace: true,
          })
        })
        .catch(() => {
          toast.error('Kategori Güncellenmedi')
        })
        .finally(() => setLoading(false))
    },
  })

  useEffect(() => {
    if (category) {
      formik.setFieldValue('title', category.title)
    }
  }, [category])

  if (loading) return <SpinnerLoader />

  if (error)
    return (
      <>
        Hata! <Button onClick={fetchData}>Tekrar Dene</Button>
      </>
    )

  return (
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
        <ImageInput
          initalPhoto={IMAGE_PREFIX + category.photo}
          onChange={handleFileChange}
        />
        {errorInfo(formik, 'logo')}
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
        Güncelle
      </Button>
    </form>
  )
}
export default CategoryEdit
