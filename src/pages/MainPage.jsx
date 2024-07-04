import { styled } from '@mui/material';
import MainImage from '../assets/images/main-page.png';
import CategoryMenu from '../components/CategoryMenu';
import SearchInput from '../components/UI/SearchInput';
import ReusableSelect from '../components/UI/Select';
import { Button } from '../components/UI/Button';

const options = [{ label: '111', value: '111' }];

export const MainPage = () => {
   return (
      <>
         <MainImageWrapper>
            <img src={MainImage} alt="" />
         </MainImageWrapper>
         <MainContainer>
            <Container>
               <h2>Реклама и Услуги для Вашего Бизнеса</h2>
               <div>
                  <div>
                     <CategoryMenu selectedCategory="Все категории" />
                  </div>
                  <div>
                     <SearchInputStyle placeholder="Поиск по названию" />
                  </div>
                  {/* <ReusableSelect options={options} /> */}
                  {/* <Button>Поиск</Button> */}
               </div>
            </Container>
         </MainContainer>
      </>
   );
};
const MainImageWrapper = styled('div')(() => ({
   width: '100%',
   height: '660px',
   zIndex: '0',
   overflow: 'hidden',
   '& > img': {
      objectFit: 'contain',
      width: '100%',
   },
}));
const MainContainer = styled('div')(() => ({
   position: 'absolute',
   top: '84px',
   left: '25rem',
   h2: {
      fontSize: '72px',
      fontWeight: '700',
      width: '808px',
      textAlign: 'center',
      color: '#fff',
   },
}));

const Container = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '50px',
   div: {
      display: 'flex',
      gap: '10px',
   },
}));
const SearchInputStyle = styled(SearchInput)(() => ({
   width: '308px',
   height: '55px',
   '.MuiPaper-root': {
      borderTopRightRadius: 'Opx',
   },
}));
