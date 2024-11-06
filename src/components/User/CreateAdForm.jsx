import { useEffect, useState } from 'react';
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
import { getAllMetros } from '../../redux/main/mainThunk.js';
import AdsFileUpload from './AdsFileUpload.jsx';

export const CreateAdForm = () => {
   const { userData } = useSelector(state => state.auth);
   const { metros } = useSelector(state => state.main);

   const [isOpen, setIsOpen] = useState(false);
   const [selectCategory, setSelectCategory] = useState({});
   const dispatch = useDispatch();
   const handleOpenCategoryModal = () => setIsOpen(!isOpen);

   const formik = useFormik({
      initialValues: {
         title: '',
         phoneNumber: '',
         description: '',
         address: '',
         category: '',
         metro: '',
         image: '',
         price: '',
         bank: 'SBERBANK',
         publishStatus: 'ОЖИДАНИЕ',
         rooms: '',
         area: '',
         floor: '',
         yearBuilt: '',
         documents: '',
         district: '',
         kitchenArea: '',
         renovation: '',
         heating: '',
         constructionCompany: '',
      },
      validationSchema: validationAdForm,
      onSubmit: values => {
         dispatch(
            fetchPublishesUser({
               ...values,
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

   useEffect(() => {
      dispatch(getAllMetros());
   }, []);

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
            <div style={{ display: 'flex', gap: '5px' }}>
               <Label>Загрузите фото</Label>
               <span>(до 6 фото)</span>
            </div>
            <AdsFileUpload
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
               options={metros}
               placeholder="Выберите метро"
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
         {selectCategory.subCategoryText === 'Квартира' && (
            <WrapperRealEstate>
               <WrapperInputSelect>
                  <InputField
                     name="rooms"
                     value={formik.values.rooms}
                     onChange={formik.handleChange}
                     placeholder="6 комнат"
                     label="Количество комнат"
                  />
                  <InputField
                     name="area"
                     value={formik.values.area}
                     onChange={formik.handleChange}
                     placeholder="10"
                     label="Площадь (м2)"
                  />
                  <InputField
                     name="floor"
                     value={formik.values.floor}
                     onChange={formik.handleChange}
                     placeholder="3"
                     label="Этаж"
                  />
                  <InputField
                     name="yearBuilt"
                     value={formik.values.yearBuilt}
                     onChange={formik.handleChange}
                     placeholder="2020"
                     label="Год постройки"
                  />
                  <InputField
                     name="documents"
                     value={formik.values.documents}
                     onChange={formik.handleChange}
                     placeholder="Красная книга"
                     label="Правоустанавливающие документы"
                  />
               </WrapperInputSelect>

               <WrapperInputSelect>
                  <InputField
                     name="district"
                     value={formik.values.district}
                     onChange={formik.handleChange}
                     placeholder="Ленинский район"
                     label="Район"
                  />
                  <InputField
                     name="kitchenArea"
                     value={formik.values.kitchenArea}
                     onChange={formik.handleChange}
                     placeholder="4"
                     label="Площадь кухни (м2)"
                  />
                  <InputField
                     name="renovation"
                     value={formik.values.renovation}
                     onChange={formik.handleChange}
                     placeholder="Евроремонт"
                     label="Ремонт"
                  />
                  <InputField
                     name="heating"
                     value={formik.values.heating}
                     onChange={formik.handleChange}
                     placeholder="Газовое отопление"
                     label="Отопление"
                  />
                  <InputField
                     name="constructionCompany"
                     value={formik.values.constructionCompany}
                     onChange={formik.handleChange}
                     placeholder="AIT GROUP"
                     label="Строительная компания"
                  />
               </WrapperInputSelect>
            </WrapperRealEstate>
         )}

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

const WrapperRealEstate = styled('div')(({ theme }) => ({
   display: 'flex',
   gap: '20px',

   '& > div': {
      paddingTop: '0',
   },
   [theme.breakpoints.down('md')]: {
      flexWrap: 'wrap',
   },
}));
