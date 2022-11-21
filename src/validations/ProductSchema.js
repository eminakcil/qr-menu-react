import Yup from './validation'

export const ProductCreateSchema = Yup.object().shape({
  title: Yup.string().required(),
  logo: Yup.mixed().required(),
  price: Yup.number().required(),
  description: Yup.string().required(),
})
