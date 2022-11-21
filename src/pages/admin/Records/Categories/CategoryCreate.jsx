import { CategoryService } from '@/services'
import { CategoryCreateSchema } from '@/validations/CategorySchema'
import Button from '@components/Button'
import ErrorMessage from '@components/ErrorMessage'
import Input from '@components/Input'
import { useFormik } from 'formik'
import { useState } from 'react'

const CategoryCreate = () => {
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      title: '',
      logo: undefined,
    },
    validationSchema: CategoryCreateSchema,
    onSubmit: (values) => {
      CategoryService.create(values)
        .then((response) => {
          console.log('kaydettin tebrikler amk')
          console.log(response)
        })
        .catch(() => {})
        .finally(() => setLoading(false))
      console.log(values)
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
          className="float-right"
          type="submit"
        >
          Ekle
        </Button>
      </form>
    </div>
  )
}
export default CategoryCreate
