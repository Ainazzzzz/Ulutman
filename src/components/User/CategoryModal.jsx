import { styled } from '@mui/material';
import Modal from '../UI/Modal';
import CloseIcon from '../../assets/icons/close-icon.svg?react';
import { categories } from '../../utils/constants/main';

export const CategoryModal = ({ open, onClose, onCategorClick }) => {
   return (
      <Modal open={open} handleClose={onClose}>
         <Container>
            <Header>
               <Title>Выбрать категорию</Title>
               <StyledCloseIcon onClick={onClose} />
            </Header>
            <NavContainer>
               <NavList>
                  {categories.map(({ Icon, title, background }) => (
                     <NavItem key={title} onClick={() => onCategorClick(title)}>
                        <a href="#">
                           <IconWrapper background={background}>
                              <Icon />
                           </IconWrapper>
                           <p>{title}</p>
                        </a>
                     </NavItem>
                  ))}
               </NavList>
            </NavContainer>
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
