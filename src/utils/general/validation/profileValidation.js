import * as Yup from 'yup';

export const profileValidation = Yup.object({
   firstName: Yup.string().required('Имя обязательно'),
   lastName: Yup.string().required('Фамилия обязательна'),
   phone: Yup.string().required('Телефон обязателен'),
   email: Yup.string()
      .email('Неправильный формат email')
      .required('Email обязателен'),
});
