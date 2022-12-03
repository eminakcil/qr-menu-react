import { IMAGE_PREFIX } from '@/contants'
import { CategoryService } from '@/services'
import { errorInfo, getPath } from '@/utils'
import { CategoryEditSchema } from '@/validations/CategorySchema'
import Button from '@components/Button'
import Input from '@components/Input'
import Loading from '@components/Loading'
import SpinnerLoader from '@components/SpinnerLoader'
import { useFormik } from 'formik'
import { useCallback, useEffect, useRef, useState } from 'react'
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

  const fileInputRef = useRef(null)
  const [fileDataUrl, setfileDataUrl] = useState(false)

  const handleFileChange = (_e) => {
    const file = _e.target.files?.[0]
    formik.setFieldValue('logo', file)

    if (file) {
      const fileReader = new FileReader()
      fileReader.onload = (e) => {
        const { result } = e.target
        if (result) {
          setfileDataUrl(result)
        }
      }
      fileReader.readAsDataURL(file)
    } else {
      setfileDataUrl(false)
    }
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
          toast.success('Kategori Güncellenmedi')
        })
        .finally(() => setLoading(false))
    },
    onReset: () => {
      fileInputRef.current.value = ''
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
        <img
          src={fileDataUrl || IMAGE_PREFIX + category.photo}
          alt=""
          className="w-full aspect-square object-cover rounded-xl cursor-pointer "
          onClick={() => fileInputRef.current.click()}
        />
        {errorInfo(formik, 'logo')}

        <input
          ref={fileInputRef}
          hidden
          type="file"
          name="logo"
          onChange={handleFileChange}
        />
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
