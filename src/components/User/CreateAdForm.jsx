import { useReducer } from 'react';
import { Button } from '../UI/Button';
import Input from '../UI/Input';
import ReusableSelect from '../UI/Select';
import FileUpload from '../Admin/FileUpload';
import {
   Container,
   StyledWriting,
   WrapperInputSelect,
} from '../Admin/MailingFormStyles';
import { styled } from '@mui/material';
import { useFormik } from 'formik';
import { validationAdForm } from '../../utils/constants/validationMailing';

const options = [
   {
      id: 'e1',
      label: 'Москва',
      value: 'moscow',
   },
   {
      id: 'e2',
      label: 'Казань',
      value: 'kazan',
   },
   {
      id: 'e3',
      label: 'Грозный',
      value: 'groznyi',
   },
];

const reducer = (state, action) => {
   switch (action.type) {
      case 'SET_INPUT':
         return { ...state, [action.field]: action.value };
      default:
         return state;
   }
};

const initialState = {
   name: '',
   phone: '',
   category: '',
   photo: '',
   description: '',
   city: 'Выберите город',
   address: 'Выберите метро',
   metro: 'Улица Крылова дом 1',
};

export const CreateAdForm = () => {
   const [state, dispatch] = useReducer(reducer, initialState);

   const formik = useFormik({
      initialValues: {
         name: '',
         phone: '',
         category: '',
         photo: '',
         description: '',
         city: '',
         address: '',
         metro: '',
      },
      validationSchema: validationAdForm,
      onSubmit: values => {
         console.log(values);
      },
   });
   return (
      <Form onSubmit={formik.handleSubmit}>
         <StyledWrapperInputSelect>
            <Input
               name="name"
               value={formik.values.name}
               onChange={formik.handleChange}
               placeholder="Иван"
               label="Имя"
               required
               error={formik.touched.name && formik.errors.name}
            />
            <Input
               name="phone"
               value={formik.values.phone}
               onChange={formik.handleChange}
               placeholder="+7 xxx xxxxxxx"
               label="Телефон"
               required
               error={formik.touched.phone && formik.errors.phone}
            />
         </StyledWrapperInputSelect>
         <Category>Выбрать</Category>
         <FileUpload />
         <StyledContainer>
            <label htmlFor="writing">Описание рассылки</label>
            <StyledWriting
               name="description"
               id="writing"
               placeholder="Горячие акции: Скидка 20% на премиум-размещение: Разместите ваше объявление в топе и привлеките больше внимания! Предложение действует до [Дата]."
               value={formik.values.description}
               onChange={formik.handleChange}
               required
               error={formik.touched.description && formik.errors.description}
            />
         </StyledContainer>
         <StyledWrapperInputSelect>
            <ReusableSelect
               label="Город"
               options={options}
               value={formik.values.city}
               onChange={value => formik.setFieldValue('city', value)}
               required
               error={formik.touched.city && formik.errors.city}
            />
            <ReusableSelect
               label="Метро"
               options={options}
               value={formik.values.metro}
               onChange={value => formik.setFieldValue('metro', value)}
               required
               error={formik.touched.metro && formik.errors.metro}
            />
            <Input
               name="address"
               value={formik.values.address}
               onChange={formik.handleChange}
               placeholder="Улица Крылова дом 1"
               label="Адреc"
               required
               error={formik.touched.address && formik.errors.address}
            />
         </StyledWrapperInputSelect>
         <StyledButton type="submit">Создать</StyledButton>
      </Form>
   );
};

const StyledContainer = styled(Container)(() => ({
   display: 'flex',
   flexDirection: 'column',

   label: {
      fontSize: '18px',
      fontWeight: '600',
      '::after': {
         content: '"*"',
         color: '#ff0000',
      },
   },
}));

const Category = styled('div')(() => ({}));

const Form = styled('form')(() => ({
   display: 'flex',
   flexDirection: 'column',
   padding: '8px',
   gap: '24px',
}));

const StyledWrapperInputSelect = styled(WrapperInputSelect)(() => ({
   padding: '0',
}));

const StyledButton = styled(Button)(() => ({
   width: '123px',
}));
