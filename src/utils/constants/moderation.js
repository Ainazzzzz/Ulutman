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
      accessor: 'name',
   },
   {
      Header: 'КОММЕНТАРИЙ',
      accessor: 'comment',
   },
   {
      Header: 'СООБЩЕНИЕ',
      accessor: 'message',
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
