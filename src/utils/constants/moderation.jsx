import { translateRole } from '../general/translate';

export const MODERATION_DATA = [
   {
      id: 1,
      name: 'Jaka',
      comment: 'Жалоб',
      message: 'привет, как дела?',
      date: '19.01.2023',
      status: 'Одобрен',
   },
   {
      id: 2,
      name: 'Jaka',
      comment: 'Жалоб',
      message: 'привет, как дела?',
      date: '19.01.2023',
      status: 'Отклонен',
   },
   {
      id: 3,
      name: 'Jaka',
      comment: 'Жалоб',
      message: 'привет, как дела?',
      date: '19.01.2023',
      status: 'Ожидает',
   },
];

export const MODERATION_COLUMNS = [
   {
      Header: 'ПОЛЬЗОВАТЕЛЬ',
      accessor: 'username',
   },
   {
      Header: 'КОММЕНТАРИЙ',
      accessor: 'comments[0].commentContent',
   },
   {
      Header: 'СООБЩЕНИЕ',
      accessor: 'messages[0].content',
   },
   {
      Header: 'ДАТА СОЗДАНИЕ',
      accessor: 'messages[0].createDate',
   },
   {
      Header: 'СТАТУС',
      accessor: 'messages[0].moderatorStatus',
   },
];

export const ADS_DATA = [
   {
      id: 1,
      name: 'Jaka',
      email: 'jaka-imanaliev@mail.ru',
      category: 'Услуги',
      date: '19.01.2023',
      status: 'Одобрен',
   },
   {
      id: 2,
      name: 'Jaka',
      email: 'jaka-imanaliev@mail.ru',
      category: 'Админ',
      date: '19.01.2023',
      status: 'ОТКЛОНЕН',
   },
   {
      id: 3,
      name: 'Jaka',
      email: 'jaka-imanaliev@mail.ru',
      category: 'Админ',
      date: '19.01.2023',
      status: 'Ожидает',
   },
];

export const ADS_COLUMNS = [
   {
      Header: 'ИМЯ',
      accessor: 'name',
   },
   {
      Header: 'ЭЛЕКТРОННЫЙ АДРЕС',
      accessor: 'email',
   },
   {
      Header: 'КАТЕГОРИЯ',
      accessor: 'category',
   },
   {
      Header: 'ДАТА СОЗДАНИЯ',
      accessor: 'date',
   },
   {
      Header: 'СТАТУС',
      accessor: 'status',
   },
];

export const CATEGORY_DATA = [
   {
      id: 1,
      name: 'Jaka',
      title: 'квартира',
      description: 'Премиум класса 2х ком квартира',
      amount: '1111',
      status: 'Активно',
   },
   {
      id: 2,
      name: 'Jaka',
      title: 'квартира',
      description: 'Премиум класса 2х ком квартира',
      amount: '11',
      status: 'Неактивно',
   },
   {
      id: 3,
      name: 'Jaka',
      title: 'квартира',
      description: 'Премиум класса 2х ком квартира',
      amount: '1',
      status: 'Неактивно',
   },
];

export const CATEGORY_COLUMNS = [
   {
      Header: 'ИМЯ',
      accessor: 'name',
   },
   {
      Header: 'Название',
      accessor: 'title',
   },
   {
      Header: 'Описание',
      accessor: 'description',
   },
   {
      Header: 'Количество объявлений',
      accessor: 'amount',
   },
   {
      Header: 'СТАТУС',
      accessor: 'status',
   },
];

export const USERS_COLUMNS = [
   {
      Header: 'ИМЯ',
      accessor: 'name',
   },
   {
      Header: 'ЭЛЕКТРОННЫЙ АДРЕС',
      accessor: 'email',
   },
   {
      Header: 'РОЛЬ',
      accessor: 'role',
      Cell: ({ row }) => <p>{translateRole[row.original.role]}</p>,
   },
   {
      Header: 'ДАТА РЕГИСТРАЦИИ',
      accessor: 'createDate',
   },
   {
      Header: 'СТАТУС',
      accessor: 'status',
   },
];

export const USERS_DATA = [
   {
      id: 1,
      name: 'Jaka',
      email: 'jaka-imanaliev@mail.ru',
      category: 'Услуги',
      date: '19.01.2023',
      status: 'Заблокирован',
      role: 'Админ',
   },
   {
      id: 2,
      name: 'Jaka',
      email: 'jaka-imanaliev@mail.ru',
      category: 'Админ',
      date: '19.01.2023',
      status: 'Заблокирован',
      role: 'Админ',
   },
   {
      id: 3,
      name: 'Jaka',
      email: 'jaka-imanaliev@mail.ru',
      category: 'Админ',
      date: '19.01.2023',
      status: 'Активный',
      role: 'Админ',
   },
];

export const MODERATION_COMPLAINTS = [
   {
      Header: 'ПОЛЬЗОВАТЕЛЬ',
      accessor: 'name',
   },
   {
      Header: 'тип жалобы',
      accessor: 'complaints',
   },
   {
      Header: 'ДАТА СОЗДАНИЕ',
      accessor: 'date',
   },
   {
      Header: 'СТАТУС',
      accessor: 'status',
   },
];

export const MODERATION_COMPLAINTS_DATA = [
   {
      id: 1,
      name: 'Jaka',
      complaints: 'Жалоб',
      date: '19.01.2023',
      status: 'Решено',
   },
   {
      id: 2,
      name: 'Jaka',
      complaints: 'Жалоб',
      date: '19.01.2023',
      status: 'Отклонен',
   },
   {
      id: 3,
      name: 'Jaka',
      complaints: 'Жалоб',
      date: '19.01.2023',
      status: 'Отклонен',
   },
];

export const MODERATION_MEDIA = [
   {
      Header: 'ПОЛЬЗОВАТЕЛЬ',
      accessor: 'name',
   },
   {
      Header: 'Файл',
      accessor: 'file',
   },
   {
      Header: 'ДАТА загрузки',
      accessor: 'date',
   },
   {
      Header: 'СТАТУС',
      accessor: 'status',
   },
];

export const MODERATION_MEDIA_DATA = [
   {
      id: 1,
      name: 'Jaka',
      file: 'File',
      date: '19.01.2023',
      status: 'Одобрен',
   },
   {
      id: 2,
      name: 'Jaka',
      file: 'img',
      date: '19.01.2023',
      status: 'Отклонен',
   },
   {
      id: 3,
      name: 'Jaka',
      file: 'File',
      date: '19.01.2023',
      status: 'Ожидает',
   },
];
