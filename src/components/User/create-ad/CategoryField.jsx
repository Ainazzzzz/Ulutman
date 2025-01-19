import { styled } from '@mui/material'
import { Button } from '../../UI/Button'
import {
   Container,
   ErrorMessage,
} from '../../../pages/Admin/mailing/MailingFormStyles'
import { useTranslation } from 'react-i18next'

const CategoryField = ({
   selectCategory,
   touched,
   error,
   handleOpenCategoryModal,
   subCategory,
}) => {
   const { t } = useTranslation()
   return (
      <StyledContainer>
         <Label>{t('user.createAds.newCreateAdForm.category')}</Label>
         <WrapperCategory>
            <SelectInfo>
               {selectCategory.title} {selectCategory.subCategory ? '/' : null}{' '}
               {subCategory.text}
            </SelectInfo>
            <Container>
               <CategoryButton
                  variant="outlined"
                  type="button"
                  onClick={handleOpenCategoryModal}
               >
                  {t('user.createAds.newCreateAdForm.categoryButton')}
               </CategoryButton>
               {touched && error ? <ErrorMessage>{error}</ErrorMessage> : null}
            </Container>
         </WrapperCategory>
      </StyledContainer>
   )
}
export default CategoryField

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

const CategoryButton = styled(Button)({
   width: '159px',
   height: '39px',
   fontSize: '16px',
   fontWeight: '600',
})

const SelectInfo = styled('p')({
   textWrap: 'nowrap',
   fontSize: '18px',
   fontWeight: '600',
   color: '#7E52FF',
})

const WrapperCategory = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   gap: '8px',

   [theme.breakpoints.down('md')]: {
      flexWrap: 'wrap',
   },
}))
