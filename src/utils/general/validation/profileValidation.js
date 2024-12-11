import * as Yup from 'yup'

export const profileValidation = Yup.object({
   username: Yup.string().required('Имя обязательно'),
   phoneNumber: Yup.string().required('Телефон обязателен'),
   emailAddress: Yup.string()
      .email('Неправильный формат email')
      .required('Email обязателен'),
})
