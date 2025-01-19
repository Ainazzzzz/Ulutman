import { styled } from '@mui/material'
import { useState, useCallback, useMemo } from 'react'
import CloseIcon from '../../../assets/icons/close-icon.svg?react'
import ArrowsIcon from '../../../assets/icons/arrowpurpul.svg?react'
import { categoryTab } from '../../../utils/constants/main'
import Modal from '../../UI/Modal'
import { useTranslation } from 'react-i18next'

export const PublishesCategoryModal = ({
   open,
   onClose,
   onCategoryClick,
   onSubCategoryClick,
   setFieldValue,
}) => {
   const [selectedCategory, setSelectedCategory] = useState(null)
   const { t } = useTranslation()
   console.log(t('categoryModal.subCategory.partTime'))
   console.log(selectedCategory)
   const categoryHandler = useCallback(
      category => {
         onCategoryClick(category)
         setSelectedCategory(category.subCategory)
         setFieldValue('category', category.category)
      },
      [onCategoryClick],
   )

   const subCategoryHandler = useCallback(
      subCategory => {
         onSubCategoryClick(subCategory)
         onClose()
         setFieldValue('subCategory', subCategory.value)
      },
      [onSubCategoryClick, onClose],
   )

   const handleBackClick = () => {
      setSelectedCategory(null)
   }

   const categoryList = useMemo(
      () =>
         categoryTab.map(
            ({ Icon, title, background, category, subCategory }) => (
               <NavItem
                  key={title}
                  onClick={() =>
                     categoryHandler({
                        category,
                        title: t(title),
                        subCategory,
                     })
                  }
               >
                  <span href="#">
                     <IconWrapper background={background}>
                        <Icon />
                     </IconWrapper>
                     <p>{t(title)}</p>
                  </span>
               </NavItem>
            ),
         ),
      [categoryHandler],
   )

   const subCategoryList = useMemo(
      () =>
         selectedCategory?.map(sub => (
            <SubCategoryItem
               key={sub.id}
               onClick={() => subCategoryHandler(sub)}
            >
               {t(sub.text)}
            </SubCategoryItem>
         )),
      [selectedCategory, subCategoryHandler],
   )

   return (
      <Modal open={open} handleClose={onClose}>
         <Container>
            <Header>
               {selectedCategory && (
                  <BackIcon onClick={handleBackClick}>
                     <ArrowsIcon />
                     {t('user.categoryModal.back')}
                  </BackIcon>
               )}
               <Title>
                  {selectedCategory
                     ? t('user.categoryModal.subcategory')
                     : t('user.categoryModal.category')}
               </Title>

               <StyledCloseIcon onClick={onClose} />
            </Header>

            {selectedCategory ? (
               <ContainerSub>{subCategoryList}</ContainerSub>
            ) : (
               <NavContainer>
                  <NavList>{categoryList}</NavList>
               </NavContainer>
            )}
         </Container>
      </Modal>
   )
}

const Container = styled('div')({
   display: 'flex',
   flexDirection: 'column',
   gap: '35px',
})

const Header = styled('div')({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   position: 'relative',
})

const Title = styled('p')({
   fontSize: '17px',
   fontWeight: '500',
   color: '#202020',
   flex: 1,
   textAlign: 'center',
})

const BackIcon = styled('span')({
   display: 'flex',
   alignItems: 'center',
   cursor: 'pointer',
   color: '#202020',
   svg: {
      width: '25px',
      height: '25px',
      path: {
         stroke: '#202020',
      },
   },
})

const StyledCloseIcon = styled(CloseIcon)({
   cursor: 'pointer',
   position: 'absolute',
   right: 0,
})

const NavContainer = styled('nav')(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   flexDirection: 'column',
   marginTop: '24px',

   [theme.breakpoints.down('md')]: {
      justifyContent: 'start',
   },
}))

const NavList = styled('ul')({
   display: 'flex',
   justifyContent: 'center',
   flexWrap: 'wrap',
   gap: '25px',
})

const NavItem = styled('li')(({ theme }) => ({
   span: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px',
      textDecoration: 'none',
      color: '#909090',

      p: {
         fontSize: '14px',
         fontWeight: '400',
         [theme.breakpoints.down('md')]: {
            fontSize: '13px',
         },
      },
   },
}))

const IconWrapper = styled('div')(({ background, theme }) => ({
   width: '50px',
   height: '50px',
   background,
   borderRadius: '50%',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',

   [theme.breakpoints.down('md')]: {
      width: '54px',
      height: '54px',
   },
}))

const ContainerSub = styled('ul')({
   display: 'flex',
   flexWrap: 'wrap',
   gap: '20px',
   maxWidth: '470px',
})

const SubCategoryItem = styled('li')({
   fontSize: '14px',
   padding: '10px',
   backgroundColor: '#f0f0f0',
   borderRadius: '8px',
   textAlign: 'center',
   cursor: 'pointer',

   '&:hover': {
      color: '#fff',
      background: '#9774FF',
   },
})
