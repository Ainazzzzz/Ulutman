import dayjs from 'dayjs'
import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
   title: Yup.string().trim().required('Название рассылки обязательно'),

   mailingType: Yup.string().required('Тип рассылки обязателен'),

   message: Yup.string().trim().required('Описание рассылки обязательно'),

   // recipientsAllValue: Yup.string()
   //    .required('Получатели обязательны'),

   promotionStartDate: Yup.mixed().required('Дата начала рассылки обязательна'),

   promotionEndDate: Yup.mixed()
      .required('Дата окончания рассылки обязательна')
      .test(
         'dates-test',
         'Дата окончания должна быть после даты начала',
         function (value) {
            const { promotionStartDate } = this.parent

            if (!promotionStartDate || !value) return true

            const start = dayjs(promotionStartDate)
            const end = dayjs(value)

            return end.isAfter(start, 'day')
         },
      ),
})
