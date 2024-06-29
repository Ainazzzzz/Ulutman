import Ulutman from '../assets/icons/ulutman-icon.svg?react';
import HeartLike from '../assets/icons/white-heart.svg?react';
import UserLogo from '../assets/icons/user.svg?react';
import RussianFlag from '../assets/icons/russian-flag.svg?react';
import Plus from '../assets/icons/plus.svg?react';
import Menu from '../assets/icons/menu-icon.svg?react';
import PlusButton from '../assets/icons/plus-button-icon.svg?react';
import UlutmanLogo from '../assets/icons/ulutman-logo-icon.svg?react';
import { styled, useMediaQuery } from '@mui/material';
import { IconButton } from '../components/IconButton';
import { Button } from '../components/UI/Button';
export const Header = () => {
   const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

   return (
      <Wrapper>
         <LogoStyle>{isMobile ? <Ulutman /> : <UlutmanLogo />}</LogoStyle>
         {isMobile ? (
            <div>
               <IconButton>
                  <HeartLike />
               </IconButton>
               <IconButton>
                  <PlusButton />
               </IconButton>
               <IconButton>
                  <Menu />
               </IconButton>
            </div>
         ) : (
            <>
               <ContainerBlock>
                  <Block>
                     <IconButton>
                        <HeartLike />
                     </IconButton>
                     <a>Избранное</a>
                  </Block>
                  <Block>
                     <IconButton>
                        <UserLogo />
                     </IconButton>
                     <a>Профиль</a>
                  </Block>
                  <Block>
                     <IconButton>
                        <RussianFlag
                           style={{ paddingTop: '8px', marginRight: '-10px' }}
                        />
                     </IconButton>
                     <a>Русский</a>
                  </Block>
                  <ButtonStyle>
                     <Plus />
                     Опубликовать
                  </ButtonStyle>
               </ContainerBlock>
            </>
         )}
      </Wrapper>
   );
};

const Wrapper = styled('header')(({ theme }) => ({
   height: '84px',
   background: 'gray',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   padding: '14px 60px',
   svg: {
      cursor: 'pointer',
   },

   [theme.breakpoints.down('md')]: {
      padding: '16px',
      height: '59px',
   },
}));

const Block = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   a: {
      fontWeight: '400',
      cursor: 'pointer',
   },
}));

const ContainerBlock = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '32px',
}));
const LogoStyle = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '10px',
}));

const ButtonStyle = styled(Button)(() => ({
   display: 'flex',
   justifyContent: 'center',
   gap: '4px',
   fontWeight: '500',
   textTransform: 'inherit',
   height: '36px',
}));
// const ButtonMobileStyle = styled(Button)(() => ({
//    borderRadius: '50px',
//    width: '27px',
//    height: '27px',
// }));
// export const Header = () => {
//    return (
//       <Wrapper>
//          <Ulutman />
//          <ContainerBlock>
//             <Block>
//                <IconButton>
//                   <HeartLike />
//                </IconButton>
//                <a to="/">Избранное</a>
//             </Block>
//             <Block>
//                <IconButton>
//                   <UserLogo />
//                </IconButton>
//                <a to="/">Профиль</a>
//             </Block>
//             <Block>
//                <IconButton>
//                   <RussianFlag
//                      style={{ paddingTop: '6px', paddingLeft: '10px' }}
//                   />
//                </IconButton>
//                <a to="/">Русский</a>
//             </Block>
//             <ButtonStyle>
//                {' '}
//                <Plus />
//                Опубликовать
//             </ButtonStyle>
//          </ContainerBlock>
//       </Wrapper>
//    );
// };
// const Wrapper = styled('div')(() => ({
//    heigh: '84px',
//    background: '#FFF',
//    display: 'flex',
//    alignItems: 'center',
//    justifyContent: 'space-between',
//    padding: '14px 60px ',
//    svg: {
//       cursor: 'pointer',
//    },
// }));
// const Block = styled('div')(() => ({
//    a: {
//       fontWeight: '400',
//       cursor: 'pointer',
//    },
//    display: 'flex',
//    alignItems: 'center',
// }));
// const ContainerBlock = styled('div')(() => ({
//    display: 'flex',
//    alignItems: 'center',
//    gap: '32px',
// }));
// const ButtonStyle = styled(Button)(() => ({
//    display: 'flex',
//    gap: '4px',
//    fontWeight: '500',
//    textTransform: 'inherit',
//    height: '36px',
// }));
