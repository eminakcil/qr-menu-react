import Yup from './validation'

export const CategoryCreateSchema = Yup.object().shape({
  title: Yup.string().required(),
  logo: Yup.mixed().required(),
})
