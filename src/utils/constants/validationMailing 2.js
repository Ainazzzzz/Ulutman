import * as Yup from 'yup';

export const validationSchema = Yup.object({
   mailings: Yup.string().required('Название рассылки обязательно'),
   typeMailing: Yup.string().required('Тип рассылки обязателен'),
   writing: Yup.string().required('Описание рассылки обязательно'),
   recipientsAllValue: Yup.string().required('Получатели обязательны'),
   files: Yup.mixed().required('Загрузите фото'),
});
