import { styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Breadcrumbs from '../../components/UI/Breadcrumbs'
import { CategoryCard } from '../../components/UI/CategoryCard'
import { useMainCategoryParams } from '../../hooks/useSearchParams'
import { searchCategoryAndMetroRequest } from '../../redux/main/mainThunk'
import { serializeToQueryParams } from '../../utils/general/serialize'
import SearchInput from '../../components/UI/SearchInput'

const CATEGORY_MAIN = {
   Работа: 'WORK',
   Аренда: 'RENT',
   Гостиница: 'HOTEL',
   Услуги: 'SERVICES',
   Недвижимость: 'REAL_ESTATE',
   Авто: 'AUTO',
   Продам: 'SELL',
}

export const SearchMainPage = () => {
   const { searchPublishes } = useSelector(state => state.main)
   const [searchValue, setSearchValue] = useState('')
   const [searchParams, setSearchParams] = useSearchParams()
   const { category, search, metro } = useMainCategoryParams()
   const dispatch = useDispatch()

   const breadcrumbs = [
      { url: '/', title: 'Главная' },
      { url: `/user/main.php`, title: category },
   ]

   useEffect(() => {
      const queryParams = serializeToQueryParams({
         titles: search,
         categories: CATEGORY_MAIN[category],
         metros: metro,
      })
      dispatch(searchCategoryAndMetroRequest(queryParams))
   }, [search, dispatch])

   const searchChangeHandler = e => {
      setSearchValue(e.target.value)
   }

   const handleSearchSubmit = () => {
      if (!searchValue) {
         searchParams.delete('search')
         setSearchParams(searchParams)
      } else {
         searchParams.set('search', searchValue)
         setSearchParams(searchParams)
      }
   }

   return (
      <Wrapper>
         <Container>
            <Block>
               <FirstBlock>
                  <Breadcrumbs path={breadcrumbs} />
               </FirstBlock>
            </Block>
            <SearchInput
               placeholder="Поиск по названию"
               onChange={searchChangeHandler}
               value={searchValue}
               onClick={handleSearchSubmit}
            />
            <CategoryCard categories={searchPublishes} />
         </Container>
      </Wrapper>
   )
}

const FirstBlock = styled('div')({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   span: {
      fontSize: '14px',
      color: '#7252ff',
      fontWeight: '400',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
   },
})

const Container = styled('div')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '40px',

   '.MuiPaper-root': {
      height: '64px',

      [theme.breakpoints.down('md')]: {
         height: '54px',
         '& > .button': {
            height: '54px',
            minWidth: '100px',
            display: 'flex',
            alignItems: 'center',
         },
      },
   },
}))

const Block = styled('div')({
   display: 'flex',
   flexDirection: 'column',
   gap: '24px',
})

const Wrapper = styled('div')(({ theme }) => ({
   padding: '40px 60px 60px 60px',
   [theme.breakpoints.down('md')]: {
      padding: '24px 16px 24px 16px',
   },
}))
