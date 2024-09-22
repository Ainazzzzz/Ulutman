import { useState } from 'react';
import { styled } from '@mui/material';
import { useFormik } from 'formik';
import FileUpload from '../../pages/Admin/mailing/FileUpload.jsx';
import { Button } from '../UI/Button';
import { validationAdForm } from '../../utils/constants/validationMailing';
import {
   InputField,
   CategoryField,
   DescriptionField,
   SelectField,
} from './FormFields';
import { WrapperInputSelect } from '../../pages/Admin/mailing/MailingFormStyles.jsx';
import { PublishesCategoryModal } from './PublishesCategoryModal.jsx';
import { useDispatch } from 'react-redux';
import { fetchPublishesUser } from '../../redux/publishes/publishesThunk.js';

const options = [
   { id: 2, value: 'option1', label: 'Option 1' },
   { id: 3, value: 'option2', label: 'Option 2' },
];

export const CreateAdForm = () => {
   const [isOpen, setIsOpen] = useState(false);
   const dispatch = useDispatch();
   const handleOpenCategoryModal = () => setIsOpen(!isOpen);

   const formik = useFormik({
      initialValues: {
         name: '',
         phoneNumber: '',
         category: '',
         subCategory: '',
         description: '',
         image: '',
         city: 'city',
         address: '',
         metro: 'metro',
         price: '',
      },
      validationSchema: validationAdForm,
      onSubmit: values => {
         // console.log(values);
         dispatch(fetchPublishesUser(values));
      },
   });

   const handleCategorySubmit = (category, subcategory) => {
      formik.setFieldValue('category', category);
      formik.setFieldValue('subCategory', subcategory);
      handleOpenCategoryModal();
   };

   return (
      <Form onSubmit={formik.handleSubmit}>
         <WrapperInputSelect>
            <InputField
               name="name"
               value={formik.values.name}
               onChange={formik.handleChange}
               placeholder="Иван"
               label="Имя"
               required
               touched={formik.touched.name}
               error={formik.errors.name}
            />
            <InputField
               name="phone"
               value={formik.values.phone}
               onChange={formik.handleChange}
               placeholder="+7 xxx xxxxxxx"
               label="Телефон"
               type="number"
               required
               touched={formik.touched.phone}
               error={formik.errors.phone}
            />
         </WrapperInputSelect>

         <CategoryField
            category={formik.values.category}
            touched={formik.touched.category}
            error={formik.errors.category}
            handleOpenCategoryModal={handleOpenCategoryModal}
         />

         <ContainerFile>
            <Label>Загрузите фото</Label>
            <FileUpload
               setFieldValue={formik.setFieldValue}
               touched={formik.touched.files}
               errors={formik.errors.files}
            />
         </ContainerFile>

         <DescriptionField
            description={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched.description}
            error={formik.errors.description}
         />

         <WrapperInputSelect>
            <InputField
               name="price"
               value={formik.values.price}
               onChange={formik.handleChange}
               placeholder="Договорная"
               type="number"
               label="Цена"
               required
               touched={formik.touched.price}
               error={formik.errors.price}
            />
            <SelectField
               name="city"
               label="Город"
               value={formik.values.city}
               options={[
                  {
                     id: 1,
                     value: 'city',
                     label: 'Выберите город',
                     disabled: true,
                  },
                  ...options,
               ]}
               setFieldValue={formik.setFieldValue}
               onBlur={formik.handleBlur}
               touched={formik.touched.city}
               error={formik.errors.city}
            />
            <SelectField
               name="metro"
               label="Метро"
               value={formik.values.metro}
               options={[
                  {
                     id: 1,
                     value: 'metro',
                     label: 'Выберите метро',
                     disabled: true,
                  },
                  ...options,
               ]}
               setFieldValue={formik.setFieldValue}
               onBlur={formik.handleBlur}
               touched={formik.touched.metro}
               error={formik.errors.metro}
            />
            <InputField
               name="address"
               value={formik.values.address}
               onChange={formik.handleChange}
               placeholder="Улица Крылова дом 1"
               label="Адреc"
               required
               touched={formik.touched.address}
               error={formik.errors.address}
            />
         </WrapperInputSelect>

         <StyledButton type="submit">Создать</StyledButton>

         <PublishesCategoryModal
            open={isOpen}
            onClose={handleOpenCategoryModal}
            onCategorClick={handleCategorySubmit}
            setFieldValue={formik.setFieldValue}
         />
      </Form>
   );
};
const Form = styled('form')({
   display: 'flex',
   flexDirection: 'column',
   padding: '8px',
   gap: '24px',
});

const Label = styled('p')({
   fontSize: '18px',
   fontWeight: '600',
   '::after': {
      content: '" *"',
      color: '#ff0000',
   },
});

const ContainerFile = styled('div')({
   display: 'flex',
   flexDirection: 'column',
   gap: '8px',
});

const StyledButton = styled(Button)({
   width: '123px',
});
