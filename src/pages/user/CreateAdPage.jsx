import { styled } from '@mui/material'
import Breadcrumbs from '../../components/UI/Breadcrumbs'
import { CreateAdForm } from '../../components/User/create-ad/CreateAdForm'

export const CreateAdPage = () => {
   const path = [
      { title: 'Главная', url: '/user' },
      { title: 'Новое объявление', url: '/create-ad' },
   ]

   return (
      <Wrapper>
         <Breadcrumbs path={path} />
         <PageTitle>Новое объявление</PageTitle>
         <Container>
            <Title>
               Публикации, которые запрещено размещать на сайте ULUTMAN.ru:
            </Title>
            <List>
               <li>Контент, противоречащий закону.</li>
               <li>Ложная информация о товарах или услугах.</li>
               <li>Нарушения авторских прав.</li>
            </List>
            <Paragraph>
               Нарушение правил может привести к удалению объявления и
               блокировке аккаунта.
            </Paragraph>

            <Subtitle>Стоимость размещения баннера за месяц:</Subtitle>
            <UnorderedList>
               <li>Для категории &ldquo;Аренда&ldquo;: 1000 рублей</li>
               <li>Для категории &ldquo;Гостиница&ldquo;: 2000 рублей</li>
            </UnorderedList>

            <Paragraph>Видимость рекламного баннера: от 50%.</Paragraph>
            <Paragraph>
               Возможность поднять баннер на первую позицию: каждые 24 часа.
            </Paragraph>
         </Container>
         <CreateAdForm />
      </Wrapper>
   )
}

const Wrapper = styled('div')(() => ({
   padding: '24px 52px 52px',
}))

const PageTitle = styled('h1')(() => ({
   padding: '8px',
   fontSize: '24px',
   fontWeight: '700',
   color: '#333',
}))

const Container = styled('div')(({ theme }) => ({
   padding: theme.spacing(3),
   [theme.breakpoints.down('md')]: {
      padding: '20px 0',
   },
}))

const sharedTextStyles = ({ theme }) => ({
   fontSize: '14px',
   fontWeight: '600',
   color: '#000000A3',
   marginBottom: theme.spacing(2),

   [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(1.5),
   },
})

const Title = styled('h2')(sharedTextStyles)

const Subtitle = styled('h3')(({ theme }) => ({
   ...sharedTextStyles({ theme }),
   marginTop: theme.spacing(3),
   [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(1.5),
   },
}))

const List = styled('ol')(({ theme }) => ({
   listStyleType: 'decimal',
   paddingLeft: theme.spacing(2),

   fontSize: '14px',
   '& li': {
      listStyle: 'decimal',

      marginBottom: theme.spacing(1),
      color: '#000000A3',
   },
}))

const UnorderedList = styled('ul')(({ theme }) => ({
   marginBottom: theme.spacing(2),
   paddingLeft: theme.spacing(2),
   fontSize: '14px',
   listStyle: 'disc',

   '& li': {
      listStyle: 'disc',

      marginBottom: theme.spacing(1),
      color: '#000000A3',
   },
}))

const Paragraph = styled('p')(({ theme }) => ({
   marginBottom: theme.spacing(2),
   fontSize: '14px',
   color: '#000000A3',
   [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(1),
   },
}))
