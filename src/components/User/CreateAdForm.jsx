import { useEffect, useState } from 'react';
import { styled } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../UI/Button';
import AdsFileUpload from './AdsFileUpload.jsx';
import UploadReceipt from './UploadReceipt.jsx';

import {
   InputField,
   CategoryField,
   DescriptionField,
   SelectField,
} from './FormFields';
import { PublishesCategoryModal } from './PublishesCategoryModal.jsx';
import { fetchPublishesUser } from '../../redux/publishes/publishesThunk.js';
import { getAllMetros } from '../../redux/main/mainThunk.js';
import { validationAdForm } from '../../utils/constants/validationMailing';
import { WrapperInputSelect } from '../../pages/Admin/mailing/MailingFormStyles.jsx';

export const CreateAdForm = () => {
   const dispatch = useDispatch();
   const { userData } = useSelector(state => state.auth);
   const { metros } = useSelector(state => state.main);
   const { images } = useSelector(state => state.s3);

   const [imageFiles, setImageFiles] = useState([]);
   const [isOpen, setIsOpen] = useState(false);
   const [selectCategory, setSelectCategory] = useState({});
   const [fileName, setFileName] = useState('нет');

   useEffect(() => {
      if (!metros.length) dispatch(getAllMetros());
   }, [dispatch, metros]);

   const handleCategorySubmit = categories => {
      setSelectCategory({ categoryTitle: categories.title });
      formik.setFieldValue('category', categories.category);
   };

   const handleSubCategorySubmit = subCategory => {
      setSelectCategory(prev => ({
         ...prev,
         subCategoryText: subCategory.text,
      }));
      formik.setFieldValue('subcategory', subCategory.value);
   };

   const handlePaymentReceipt = pdfFile => {
      setFileName(pdfFile);
   };

   const formik = useFormik({
      initialValues: {
         title: '',
         description: '',
         phoneNumber: '',
         metro: '',
         address: '',
         category: '',
         images: [],
         price: '',
         bank: '',
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
         const imageParams = images
            .map((image, index) => {
               const encodedImage = encodeURIComponent(image);
               return index === 0
                  ? `${encodedImage}`
                  : `images=${encodedImage}`;
            })
            .join('&');

         if (userData) {
            dispatch(
               fetchPublishesUser({
                  publishe: {
                     ...values,
                     userId: userData.userId,
                     images: imageParams,
                  },
                  paymentReceiptFile: fileName,
               }),
            );
            setImageFiles([]);
            setSelectCategory({});
            setFileName('Нет');
            formik.resetForm();
         }
      },
   });

   const renderField = (
      name,
      label,
      placeholder,
      type = 'text',
      required = false,
   ) => (
      <InputField
         name={name}
         label={label}
         placeholder={placeholder}
         type={type}
         value={formik.values[name]}
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         touched={formik.touched[name]}
         error={formik.errors[name]}
         required={required}
      />
   );

   const realEstateFields = selectCategory.categoryTitle === 'Недвижимость' && (
      <>
         <StyledWrapperInputSelect>
            {renderField('rooms', 'Количество комнат', '6 комнат')}
            {renderField('area', 'Площадь (м²)', '10')}
            {renderField('floor', 'Этаж', '3')}
            {renderField('yearBuilt', 'Год постройки', '2020')}
            {renderField('documents', 'Документы', 'Красная книга')}
         </StyledWrapperInputSelect>
         <StyledWrapperInputSelect>
            {renderField('district', 'Район', 'Ленинский район')}
            {renderField('kitchenArea', 'Площадь кухни (м²)', '4')}
            {renderField('renovation', 'Ремонт', 'Евроремонт')}
            {renderField('heating', 'Отопление', 'Газовое отопление')}
            {renderField(
               'constructionCompany',
               'Строительная компания',
               'AIT GROUP',
            )}
         </StyledWrapperInputSelect>
      </>
   );

   return (
      <Form onSubmit={formik.handleSubmit}>
         <StyledWrapperInputSelect>
            {renderField(
               'title',
               'Название',
               'Название публикации',
               'text',
               true,
            )}
            {renderField(
               'phoneNumber',
               'Телефон',
               '+7 xxx xxxxxxx',
               'tel',
               true,
            )}
         </StyledWrapperInputSelect>

         <CategoryField
            selectCategory={selectCategory}
            handleOpenCategoryModal={() => setIsOpen(true)}
            touched={formik.touched.category}
            error={formik.errors.category}
         />

         <ContainerFile>
            <Label>Загрузите фото (до 6 фото)</Label>
            <AdsFileUpload
               setFieldValue={formik.setFieldValue}
               touched={formik.touched.images}
               errors={formik.errors.images}
               setImageFiles={setImageFiles}
               imageFiles={imageFiles}
            />
         </ContainerFile>

         <DescriptionField
            description={formik.values.description}
            onChange={formik.handleChange}
            touched={formik.touched.description}
            error={formik.errors.description}
         />

         <StyledWrapperInputSelect>
            {renderField('price', 'Цена', 'Договорная', 'number', true)}
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
            {renderField(
               'address',
               'Адрес',
               'Улица Крылова дом 1',
               'text',
               true,
            )}
         </StyledWrapperInputSelect>

         <StyledWrapperInputSelect>
            {renderField('bank', 'Банк', 'Укажите банк', 'text', true)}

            <UploadReceipt
               setFileName={handlePaymentReceipt}
               fileName={fileName}
            />
         </StyledWrapperInputSelect>

         {realEstateFields}

         <StyledButton type="submit">Создать</StyledButton>

         <PublishesCategoryModal
            open={isOpen}
            onClose={() => setIsOpen(false)}
            onCategoryClick={handleCategorySubmit}
            onSubCategoryClick={handleSubCategorySubmit}
         />
      </Form>
   );
};

const Form = styled('form')({
   display: 'flex',
   flexDirection: 'column',
   gap: '24px',
});

const StyledWrapperInputSelect = styled(WrapperInputSelect)({
   padding: '0',
});

const ContainerFile = styled('div')({
   display: 'flex',
   flexDirection: 'column',
   gap: '8px',
});

const Label = styled('p')({
   fontWeight: '600',
});

const StyledButton = styled(Button)({
   width: '123px',
});

const Error = styled('div')({
   color: 'red',
});
