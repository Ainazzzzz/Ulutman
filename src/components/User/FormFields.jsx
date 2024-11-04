import { styled } from '@mui/material';
import Input from '../UI/Input';
import ReusableSelect from '../UI/Select';
import { Button } from '../UI/Button';
import {
   Container,
   ErrorMessage,
   StyledWriting,
} from '../../pages/Admin/mailing/MailingFormStyles.jsx';

export const InputField = ({
   name,
   value,
   onChange,
   placeholder,
   label,
   required,
   touched,
   error,
   ...props
}) => (
   <Container>
      <Input
         name={name}
         value={value}
         onChange={onChange}
         placeholder={placeholder}
         label={label}
         required={required}
         {...props}
      />
      {touched && error ? <ErrorMessage>{error}</ErrorMessage> : null}
   </Container>
);

export const CategoryField = ({
   selectCategory,
   touched,
   error,
   handleOpenCategoryModal,
}) => (
   <StyledContainer>
      <Label>Категория</Label>
      <WrapperCategory>
         <SelectInfo>
            {selectCategory.categoryTitle}{' '}
            {selectCategory.subCategoryText ? '/' : null}{' '}
            {selectCategory.subCategoryText}
         </SelectInfo>
         <Container>
            <CategoryButton
               variant="outlined"
               type="button"
               onClick={handleOpenCategoryModal}
            >
               Выбрать
            </CategoryButton>
            {touched && error ? <ErrorMessage>{error}</ErrorMessage> : null}
         </Container>
      </WrapperCategory>
   </StyledContainer>
);

export const DescriptionField = ({
   description,
   onChange,
   onBlur,
   touched,
   error,
}) => (
   <StyledContainer>
      <Label>Описание рассылки</Label>
      <Container>
         <StyledWriting
            name="description"
            value={description}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="Горячие акции: Скидка 20% на премиум-размещение: Разместите ваше объявление в топе и привлеките больше внимания! Предложение действует до [Дата]."
         />
         {touched && error ? <ErrorMessage>{error}</ErrorMessage> : null}
      </Container>
   </StyledContainer>
);

export const SelectField = ({
   name,
   label,
   value,
   options,
   setFieldValue,
   onBlur,
   required,
   touched,
   error,
}) => (
   <Container>
      <ReusableSelect
         name={name}
         label={label}
         value={value}
         options={options}
         onChange={e => setFieldValue(name, e.target.value)}
         onBlur={onBlur}
         required={required}
      />
      {touched && error ? <ErrorMessage>{error}</ErrorMessage> : null}
   </Container>
);

const StyledContainer = styled(Container)({
   display: 'flex',
   flexDirection: 'column',
   gap: '8px',
});

const Label = styled('p')({
   fontSize: '18px',
   fontWeight: '600',
   '::after': {
      content: '" *"',
      color: '#ff0000',
   },
});

const CategoryButton = styled(Button)({
   width: '159px',
   height: '39px',
   fontSize: '16px',
   fontWeight: '600',
});

const SelectInfo = styled('p')({
   textWrap: 'nowrap',
   fontSize: '18px',
   fontWeight: '600',
   color: '#7E52FF',
});

const WrapperCategory = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   gap: '8px',

   [theme.breakpoints.down('md')]: {
      flexWrap: 'wrap',
   },
}));
