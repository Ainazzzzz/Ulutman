import * as Yup from 'yup'

export const profileValidation = Yup.object({
   username: Yup.string().required('Имя обязательно'),
   emailAddress: Yup.string()
      .email('Неправильный формат email')
      .required('Email обязателен'),
})
