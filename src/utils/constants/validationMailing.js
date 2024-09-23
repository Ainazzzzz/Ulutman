import * as Yup from 'yup';

export const validationSchema = Yup.object({
   mailings: Yup.string().required('Название рассылки обязательно'),
   typeMailing: Yup.string().required('Тип рассылки обязателен'),
   writing: Yup.string().required('Описание рассылки обязательно'),
   recipientsAllValue: Yup.string().required('Получатели обязательны'),
   files: Yup.mixed().required('Загрузите фото'),
});

export const validationAdForm = Yup.object({
   // name: Yup.string().required('Имя обязательно'),
   phoneNumber: Yup.string().required('Телефон обязателен'),
   description: Yup.string().required('Описание обязательно'),
   // city: Yup.string().required('Город обязателен'),
   address: Yup.string().required('Адрес обязателен'),
   category: Yup.string().required('Категория обязателен'),
   metro: Yup.string().required('Метро обязательно'),
   image: Yup.mixed().required('Загрузите фото'),
});
