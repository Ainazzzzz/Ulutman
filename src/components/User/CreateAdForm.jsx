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
import { useDispatch, useSelector } from 'react-redux';
import { fetchPublishesUser } from '../../redux/publishes/publishesThunk.js';

const options = [
   { id: 2, value: 'БульварРокоссовкого', label: 'БульварРокоссовкого' },
   { id: 3, value: 'Кожуховская', label: 'Кожуховская' },
];

export const CreateAdForm = () => {
   const { userData } = useSelector(state => state.auth);
   const [isOpen, setIsOpen] = useState(false);
   const [selectCategory, setSelectCategory] = useState({});
   const dispatch = useDispatch();
   const handleOpenCategoryModal = () => setIsOpen(!isOpen);

   const formik = useFormik({
      initialValues: {
         title: '',
         description: '',
         metro: 'metro',
         address: '',
         phoneNumber: '',
         image: '',
         category: '',
         subcategory: '',
         price: '',
         bank: 'SBERBANK',
      },
      validationSchema: validationAdForm,
      onSubmit: values => {
         dispatch(
            fetchPublishesUser({
               ...values,
               publishStatus: 'ОДОБРЕН',
               categoryStatus: 'АКТИВНО',
               userId: userData.userId,
               phoneNumber: Number(values.phoneNumber),
            }),
         );
         formik.resetForm();
      },
   });

   const handleCategorySubmit = categories => {
      formik.setFieldValue('category', categories.category);
      setSelectCategory({ categoryTitle: categories.title });
   };

   const handleSubCategorySubmit = subCategory => {
      formik.setFieldValue('subcategory', subCategory.value);
      setSelectCategory({
         ...selectCategory,
         subCategoryText: subCategory.text,
      });
   };

   return (
      <Form onSubmit={formik.handleSubmit}>
         <WrapperInputSelect>
            <InputField
               name="title"
               value={formik.values.title}
               onChange={formik.handleChange}
               placeholder="Иван"
               label="Имя"
               required
               touched={formik.touched.title}
               error={formik.errors.title}
            />
            <InputField
               name="phoneNumber"
               value={formik.values.phoneNumber}
               onChange={formik.handleChange}
               placeholder="+7 xxx xxxxxxx"
               label="Телефон"
               required
               touched={formik.touched.phoneNumber}
               error={formik.errors.phoneNumber}
            />
         </WrapperInputSelect>

         <CategoryField
            selectCategory={selectCategory}
            touched={formik.touched.category}
            error={formik.errors.category}
            handleOpenCategoryModal={handleOpenCategoryModal}
         />

         <ContainerFile>
            <Label>Загрузите фото</Label>
            <FileUpload
               setFieldValue={formik.setFieldValue}
               touched={formik.touched.image}
               errors={formik.errors.image}
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
            onCategoryClick={handleCategorySubmit}
            onSubCategoryClick={handleSubCategorySubmit}
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
