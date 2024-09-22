import { styled } from '@mui/material';
import Modal from '../UI/Modal';
import CloseIcon from '../../assets/icons/close-icon.svg?react';
import ArrowsIcon from '../../assets/icons/arrowpurpul.svg?react';
import { categories } from '../../utils/constants/main';
import { useState } from 'react';

export const PublishesCategoryModal = ({ open, onClose, setFieldValue }) => {
   const [selectedCategory, setSelectedCategory] = useState(null);

   const handleCategoryClick = (category, subCategory) => {
      setFieldValue('category', category);
      setSelectedCategory(subCategory);
   };

   const handleSubCategoryClick = subCategory => {
      setFieldValue('subCategory', subCategory.text);
      onClose();
   };

   const handleBackClick = () => {
      setSelectedCategory(null);
   };

   return (
      <Modal open={open} handleClose={onClose}>
         <Container>
            <Header>
               <BackIcon onClick={handleBackClick}>
                  <ArrowsIcon />
                  назад
               </BackIcon>
               <Title>
                  {selectedCategory
                     ? 'Выбрать подкатегорию'
                     : 'Выбрать категорию'}
               </Title>
               <StyledCloseIcon onClick={onClose} />
            </Header>

            {selectedCategory ? (
               <NavContainer>
                  {selectedCategory.map(sub => (
                     <SubCategoryItem
                        key={sub.id}
                        onClick={() => handleSubCategoryClick(sub)}
                     >
                        {sub.text}
                     </SubCategoryItem>
                  ))}
               </NavContainer>
            ) : (
               <NavContainer>
                  <NavList>
                     {categories.map(
                        ({
                           Icon,
                           title,
                           background,
                           category,
                           subCategory,
                        }) => (
                           <NavItem
                              key={title}
                              onClick={() =>
                                 handleCategoryClick(category, subCategory)
                              }
                           >
                              <a href="#">
                                 <IconWrapper background={background}>
                                    <Icon />
                                 </IconWrapper>
                                 <p>{title}</p>
                              </a>
                           </NavItem>
                        ),
                     )}
                  </NavList>
               </NavContainer>
            )}
         </Container>
      </Modal>
   );
};

const Container = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '35px',
}));

const Header = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   position: 'relative',
}));

const Title = styled('p')(() => ({
   fontSize: '17px',
   fontWeight: '500',
   color: '#202020',
   flex: 1,
   textAlign: 'center',
}));

const BackIcon = styled('span')(() => ({
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
}));

const StyledCloseIcon = styled(CloseIcon)(() => ({
   cursor: 'pointer',
   position: 'absolute',
   right: 0,
}));

const NavContainer = styled('nav')(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   flexDirection: 'column',
   marginTop: '24px',

   [theme.breakpoints.down('md')]: {
      justifyContent: 'start',
   },
}));

const NavList = styled('ul')(() => ({
   display: 'flex',
   justifyContent: 'center',
   flexWrap: 'wrap',
   gap: '25px',
}));

const NavItem = styled('li')(({ theme }) => ({
   a: {
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
}));

const IconWrapper = styled('div')(({ background, theme }) => ({
   width: '50px',
   height: '50px',
   background: background,
   borderRadius: '50%',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',

   [theme.breakpoints.down('md')]: {
      width: '54px',
      height: '54px',
   },
}));

const SubCategoryItem = styled('li')(() => ({
   fontSize: '14px',
   padding: '10px',
   backgroundColor: '#f0f0f0',
   borderRadius: '8px',
   textAlign: 'center',
}));

const BackButton = styled('button')(() => ({
   alignSelf: 'flex-start',
   padding: '8px 16px',
   backgroundColor: '#B64D6B',
   color: '#fff',
   border: 'none',
   borderRadius: '4px',
   cursor: 'pointer',
}));
