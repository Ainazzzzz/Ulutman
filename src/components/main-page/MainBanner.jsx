import CategoryMenu from '../CategoryMenu';
import { CardMedia, styled, useMediaQuery } from '@mui/material';

import banner from '../../assets/images/main.png';

import BagIcon from '../../assets/icons/bag-icon.svg?react';
import OccupancyIcon from '../../assets/icons/occupancy-icon.svg?react';
import HotelIcon from '../../assets/icons/hotel-icon.svg?react';
import Services from '../../assets/icons/services-icon.svg?react';
import ImmovablesIcon from '../../assets/icons/immovables-icon.svg?react';
import AutoIcon from '../../assets/icons/auto-icon.svg?react';
import SellingIcon from '../../assets/icons/selling-icon.svg?react';
import { SearchInputSelect } from '../UI/SearchInputSelect';
import { useState } from 'react';
import ReusableSelect from '../UI/Select';

const array = [
   {
      title: 'Работа',
      Icon: BagIcon,
      background: '#B64D6B',
   },
   {
      title: 'Аренда',
      Icon: OccupancyIcon,
      background: '#B1AC38',
   },
   {
      title: 'Гостиница',
      Icon: HotelIcon,
      background: '#4465B8',
   },
   {
      title: 'Услуги',
      Icon: Services,
      background: '#44A55F',
   },
   {
      title: 'Недвижимость',
      Icon: ImmovablesIcon,
      background: '#3A84A4',
   },
   {
      title: 'Авто',
      Icon: AutoIcon,
      background: '#953838',
   },
   {
      title: 'Продам',
      Icon: SellingIcon,
      background: '#8D3694',
   },
];

const options = [
   { id: '0', value: 'select-metro', label: 'выбрать метро' },
   { id: '1', value: 'Aviamotornaya', label: 'Авиамоторная' },
   { id: '2', value: 'Kursk', label: 'Курская' },
   { id: '3', value: 'Kutuzovskaya', label: 'Кутузовская' },
   { id: '4', value: 'Lubyanka', label: 'Лубянка' },
   { id: '5', value: 'Arbatsko-Pokrovskaya', label: 'Арбатско-Покровская' },
   { id: '6', value: 'Филёвская', label: 'Филёвская' },
   { id: '7', value: 'Kaluga-Rizhskaya', label: 'Калужско-Рижская' },
   { id: '8', value: 'Sokolnicheskaya', label: 'Сокольническая' },
   { id: '9', value: 'Academic', label: 'Академическая' },
   { id: '10', value: 'Alexander Garden', label: 'Александровский сад' },
];

export const MainBanner = () => {
   const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));
   const [selectValue, setSelectValue] = useState('select-metro');
   console.log(isMobile);
   return (
      <MainContainer banner={banner}>
         <MiniBox>
            <Title>Реклама и Услуги для Вашего Бизнеса</Title>

            <WrapperInput>
               <div className="container-select">
                  <CategoryMenu />
                  {isMobile && (
                     <StyledSelect
                        options={options}
                        value={selectValue}
                        onChange={event => setSelectValue(event.target.value)}
                     />
                  )}
               </div>
               <SearchInputSelect
                  selectValue={selectValue}
                  options={options}
                  handleChangeSearch={event =>
                     setSelectValue(event.target.value)
                  }
               />
            </WrapperInput>
         </MiniBox>

         <nav>
            <NavigationContainer>
               <NavigationList>
                  {array.map(({ Icon, title, background }) => (
                     <NavigationListItem key={title} background={background}>
                        <a href="#">
                           <div>
                              <Icon />
                           </div>

                           <p>{title}</p>
                        </a>
                     </NavigationListItem>
                  ))}
               </NavigationList>
            </NavigationContainer>
         </nav>
      </MainContainer>
   );
};

const MainContainer = styled('div')(({ banner }) => ({
   backgroundImage: `url(${banner})`,
   width: '100%',
   height: '80vh',
   backgroundPosition: 'center',
   backgroundSize: 'cover',
}));

const MiniBox = styled('article')(({ theme }) => ({
   width: '810px',
   height: '416px',
   margin: '0 auto',
   paddingTop: '84px',
   display: 'flex',
   flexDirection: 'column',
   gap: '54.5px',

   [theme.breakpoints.down('md')]: {
      width: '100%',
      height: '338px',

      padding: '84px 24px 0 24px',
   },
}));

const StyledSelect = styled(ReusableSelect)(() => ({
   '.MuiSelect-select': {
      padding: '0',
      width: '154px',
      paddingLeft: '10px',
   },
}));

const Title = styled('h1')(({ theme }) => ({
   fontSize: '72px',
   fontWeight: '700',
   color: 'rgb(255, 255, 255)',
   lineHeight: '105%',
   textAlign: 'center',

   [theme.breakpoints.down('md')]: {
      fontSize: '30px',
      fontWeight: '700',
   },
}));

const WrapperInput = styled('section')(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   gap: '10px',

   '& .container-select': {
      display: 'flex',
      alignItems: 'end',
      gap: '15px',
      button: {
         [theme.breakpoints.down('md')]: {
            minWidth: '160px',
            maxHeight: '40px',
            minHeight: '40px',
            fontSize: '14px',
            padding: '0 0 0 6px',
            fontWeight: '400',
            display: 'flex',
            flexDirection: 'row-reverse',
            justifyContent: 'flex-end',
            textWrap: 'nowrap',
         },
      },
   },

   '.MuiInputBase-root': {
      [theme.breakpoints.down('md')]: {
         height: '40px',
         background: '#fff',
         borderRadius: '10px',
      },
   },

   [theme.breakpoints.down('md')]: {
      flexDirection: 'column-reverse',
   },
}));

const NavigationContainer = styled('div')(() => ({
   display: 'flex',
   overflowX: 'auto',
}));

const NavigationListItem = styled('li')(({ background, theme }) => ({
   minWidth: '100px',
   div: {
      width: '66px',
      height: '66px',
      background: background,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      [theme.breakpoints.down('md')]: {
         width: '54px',
         height: '54px',
      },
   },

   a: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px',
      textDecoration: 'none',
   },

   p: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#fff',

      [theme.breakpoints.down('md')]: {
         fontSize: '14px',
      },
   },
}));

const NavigationList = styled('ul')(({ theme }) => ({
   display: 'flex',
   gap: '10px',

   [theme.breakpoints.down('md')]: {
      gap: '0',
   },
}));
