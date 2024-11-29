import * as Yup from 'yup'

export const signUpSchema = Yup.object().shape({
   name: Yup.string()
      .min(2, 'Имя должно быть не короче 2 символов')
      .required('Имя обязательно'),
   email: Yup.string()
      .email('Некорректный email')
      .matches(
         /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
         'Email должен быть адресом @gmail.com',
      )
      .required('Почта обязательна'),
   password: Yup.string()
      .min(6, 'Пароль должен быть не короче 6 символов')
      .required('Пароль обязателен'),
   confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
      .required('Подтверждение пароля обязательно'),
})
