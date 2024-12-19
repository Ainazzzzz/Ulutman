import { styled } from '@mui/material'
import Input from '../../UI/Input'
import ReusableSelect from '../../UI/Select'
import {
   Container,
   ErrorMessage,
   StyledWriting,
} from '../../../pages/Admin/mailing/MailingFormStyles'

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
)

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
            placeholder="Продаю iPhone 12 с объемом памяти 128GB в черном цвете. Телефон в отличном состоянии, использовался бережно и всегда носился в чехле с защитным стеклом на экране."
            multiline
            rows={4}
         />
         {touched && error ? <ErrorMessage>{error}</ErrorMessage> : null}
      </Container>
   </StyledContainer>
)

export const SelectField = ({
   name,
   label,
   value,
   options,
   placeholder,
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
         placeholder={placeholder}
         options={options}
         onChange={e => setFieldValue(name, e.target.value)}
         onBlur={onBlur}
         required={required}
      />
      {touched && error ? <ErrorMessage>{error}</ErrorMessage> : null}
   </Container>
)

const StyledContainer = styled(Container)({
   display: 'flex',
   flexDirection: 'column',
   gap: '8px',
})

const Label = styled('p')({
   fontSize: '18px',
   fontWeight: '600',
   '::after': {
      content: '" *"',
      color: '#ff0000',
   },
})
