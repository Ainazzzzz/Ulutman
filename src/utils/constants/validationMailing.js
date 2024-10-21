import * as Yup from 'yup';

export const validationSchema = Yup.object({
   title: Yup.string().required('Название рассылки обязательно'),
   mailingType: Yup.string().required('Тип рассылки обязателен'),
   message: Yup.string().required('Описание рассылки обязательно'),
   recipientsAllValue: Yup.string().required('Получатели обязательны'),
   files: Yup.mixed().required('Загрузите фото'),
});

export const validationAdForm = Yup.object({
   name: Yup.string().required('Имя обязательно'),
   phone: Yup.string().required('Телефон обязателен'),
   description: Yup.string().required('Описание обязательно'),
   city: Yup.string().required('Город обязателен'),
   address: Yup.string().required('Адрес обязателен'),
   category: Yup.string().required('Категория обязателен'),
   metro: Yup.string().required('Метро обязательно'),
   files: Yup.mixed().required('Загрузите фото'),
});
