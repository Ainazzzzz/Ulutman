import * as Yup from 'yup';

export const validationSchema = Yup.object({
   title: Yup.string().required('Название рассылки обязательно'),
   mailingType: Yup.string().required('Тип рассылки обязателен'),
   message: Yup.string().required('Описание рассылки обязательно'),
   recipientsAllValue: Yup.string().required('Получатели обязательны'),
   files: Yup.mixed().required('Загрузите фото'),
});

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
});
