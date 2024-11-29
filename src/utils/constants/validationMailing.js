import dayjs from 'dayjs'
import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
   title: Yup.string().required('Название рассылки обязательно'),
   mailingType: Yup.string().required('Тип рассылки обязателен'),
   message: Yup.string().required('Описание рассылки обязательно'),
   recipientsAllValue: Yup.string().required('Получатели обязательны'),
   image: Yup.mixed().required('Загрузите фото'),
   promotionStartDate: Yup.string().required('Дата рассылки обязательно'),
   promotionEndDate: Yup.string()
      .required('Дата рассылки обязательно')
      .test(
         'dates-test',
         'Дата окончания должна быть после даты начала',
         (value, context) => {
            const startDate = dayjs(context.parent.promotionStartDate)
            const endDate = dayjs(value)

            return endDate > startDate
         },
      ),
})

export const validationAdForm = Yup.object({
   title: Yup.string().required('Название обязательно'),
   phoneNumber: Yup.string()
      .required('Телефон обязателен')
      .matches(/^\+7\d{10}$/, 'Некорректный формат телефона'),
   description: Yup.string().required('Описание обязательно'),
   address: Yup.string().required('Адрес обязателен'),
   category: Yup.string().required('Категория обязательна'),
   metro: Yup.string().required('Метро обязательно'),
   images: Yup.mixed().required('Загрузите фото'),
   price: Yup.number()
      .required('Цена обязательна')
      .typeError('Цена должна быть числом'),
})
