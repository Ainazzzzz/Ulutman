import BagIcon from '../../assets/icons/bag-icon.svg?react';
import OccupancyIcon from '../../assets/icons/occupancy-icon.svg?react';
import HotelIcon from '../../assets/icons/hotel-icon.svg?react';
import ServicesIcon from '../../assets/icons/services-icon.svg?react';
import ImmovablesIcon from '../../assets/icons/immovables-icon.svg?react';
import AutoIcon from '../../assets/icons/auto-icon.svg?react';
import SellingIcon from '../../assets/icons/selling-icon.svg?react';

export const categories = [
   {
      category: 'WORK',
      title: 'Работа',
      Icon: BagIcon,
      background: '#B64D6B',
      subCategory: [
         {
            id: 'e1',
            value: 'PartTime',
            text: 'Неполный рабочий день',
         },
         {
            id: 'e2',
            value: 'FullTime',
            text: 'Полный рабочий день',
         },
      ],
   },
   {
      category: 'RENT',
      title: 'Аренда',
      Icon: OccupancyIcon,
      background: '#B1AC38',
      subCategory: [
         {
            id: 'e1',
            value: 'I_RentRoom',
            text: 'Я сдаю комнату',
         },
         {
            id: 'e2',
            value: 'I_RentBed',
            text: 'Я снимаю койку',
         },
         {
            id: 'e3',
            value: 'I_RenApartment',
            text: 'Я снимаю квартиру',
         },
         {
            id: 'e4',
            value: 'RentRoom',
            text: 'Снимаю комнату',
         },
         {
            id: 'e5',
            value: 'RentBed',
            text: 'Снимаю комнату',
         },
         {
            id: 'e6',
            value: 'RentApartment',
            text: 'Снимаю комнату',
         },
         {
            id: 'e7',
            value: 'RentOffice',
            text: 'Снимаю оффис',
         },
      ],
   },
   {
      category: 'HOTEL',
      title: 'Гостиница',
      Icon: HotelIcon,
      background: '#4465B8',
      subCategory: [
         {
            id: 'e1',
            value: 'DailyRent',
            text: 'Посуточная аренда',
         },
         {
            id: 'e2',
            value: 'LongTermRent',
            text: 'Долгосрочная аренда',
         },
      ],
   },
   {
      category: 'SERVICES',
      title: 'Услуги',
      Icon: ServicesIcon,
      background: '#44A55F',
      subCategory: [
         {
            id: 'e1',
            value: 'MEDICAL',
            text: 'Медицинский услуги',
         },
         {
            id: 'e2',
            value: 'LEGAL',
            text: 'Юридический услуги',
         },
         {
            id: 'e3',
            value: 'BEAUTY',
            text: 'Красота',
         },
         {
            id: 'e4',
            value: 'AIRTICKET',
            text: 'Авиабилет',
         },
         {
            id: 'e5',
            value: 'TAXIANDTRACK',
            text: 'Такси и Грузовые',
         },
         {
            id: 'e6',
            value: 'REPAIR',
            text: 'Ремонт',
         },
         {
            id: 'e7',
            value: 'DIFFERENT',
            text: 'Другое',
         },
      ],
   },
   {
      category: 'REAL_ESTATE',
      title: 'Недвижимость',
      Icon: ImmovablesIcon,
      background: '#3A84A4',
      subCategory: [
         {
            id: 'e1',
            value: 'House',
            text: 'Дом',
         },
         {
            id: 'e2',
            value: 'Apartment',
            text: 'Квартира',
         },
         {
            id: 'e3',
            value: 'PartOfLand',
            text: 'Участок',
         },
         {
            id: 'e4',
            value: 'Space',
            text: 'Помещение',
         },
      ],
   },
   {
      category: 'AUTO',
      title: 'Авто',
      Icon: AutoIcon,
      background: '#953838',
      subCategory: [
         {
            id: 'e1',
            value: 'SaleOfCar',
            text: 'Продажа машины',
         },
         {
            id: 'e2',
            value: 'RentOfCar',
            text: 'Аренда машин',
         },
      ],
   },
   {
      category: 'SELL',
      title: 'Продам',
      Icon: SellingIcon,
      background: '#8D3694',
      subCategory: [
         {
            id: 'e1',
            value: 'Clothes',
            text: 'Одежда',
         },
         {
            id: 'e2',
            value: 'HouseAppliances',
            text: 'бытовая техника',
         },
         {
            id: 'e3',
            value: 'Electronics',
            text: 'Электроника',
         },
      ],
   },
];

export const metroOptions = [
   { id: '0', value: 'select-metro', label: 'Выбрать метро' },
   { id: '1', value: 'БульварРокоссовкого', label: 'Бульвар Рокоссовкого' },
   { id: '2', value: 'Черкизовская', label: 'Черкизовская' },
   { id: '3', value: 'ПреображенскаяПлощадь', label: 'Преображенская Площадь' },
   { id: '4', value: 'Сокольники', label: 'Сокольники' },
   { id: '5', value: 'Красносельская', label: 'Красносельская' },
   { id: '6', value: 'Комсомольская', label: 'Комсомольская' },
   { id: '7', value: 'КрасныеВорота', label: 'Красные Ворота' },
   { id: '8', value: 'ЧистыеПруды', label: 'Чистые Пруды' },
   { id: '9', value: 'Лублянка', label: 'Лублянка' },
   { id: '10', value: 'ОхотныйРяд', label: 'Охотный Ряд' },
   {
      id: '11',
      value: 'БиблиотекаИмениЛенина',
      label: 'Библиотека Имени Ленина',
   },
   { id: '12', value: 'Кропотинская', label: 'Кропотинская' },
   { id: '13', value: 'ПаркКультуры', label: 'Парк Культуры' },
   { id: '14', value: 'Фрузенская', label: 'Фрузенская' },
   { id: '15', value: 'Спортивная', label: 'Спортивная' },
   { id: '16', value: 'ВоробьевыГоры', label: 'Воробьевы Горы' },
   { id: '17', value: 'Университет', label: 'Университет' },
   { id: '18', value: 'ПроспектВернадского', label: 'Проспект Вернадского' },
   { id: '19', value: 'ЮгоЗападная', label: 'Юго Западная' },
   { id: '20', value: 'Тропарево', label: 'Тропарево' },
   { id: '21', value: 'Румянцево', label: 'Румянцево' },
   { id: '22', value: 'Саларьева', label: 'Саларьева' },
   { id: '23', value: 'ФилатовЛуг', label: 'ФилатовЛуг' },
   { id: '24', value: 'Прокшино', label: 'Прокшино' },
   { id: '25', value: 'Ольховая', label: 'Ольховая' },
   { id: '26', value: 'Коммунарко', label: 'Коммунарко' },
   { id: '27', value: 'Ховрино', label: 'Ховрино' },
   { id: '28', value: 'Беломорская', label: 'Беломорская' },
   { id: '29', value: 'РечнойВокзал', label: 'Речной Вокзал' },
   { id: '30', value: 'ВодныйСтадион', label: 'Водный Стадион' },
   { id: '31', value: 'Войковская', label: 'Войковская' },
   { id: '32', value: 'Сокол', label: 'Сокол' },
   { id: '33', value: 'Аэропорт', label: 'Аэропорт' },
   { id: '34', value: 'Динамо', label: 'Динамо' },
   { id: '35', value: 'Белорусская', label: 'Белорусская' },
   { id: '36', value: 'Маяковская', label: 'Маяковская' },
   { id: '37', value: 'Тверская', label: 'Тверская' },
   { id: '38', value: 'Театральная', label: 'Театральная' },
   { id: '39', value: 'Новокузнецкая', label: 'Новокузнецкая' },
   { id: '40', value: 'Павелецкая', label: 'Павелецкая' },
   { id: '41', value: 'Автозаводская', label: 'Автозаводская' },
   { id: '42', value: 'Технопарк', label: 'Технопарк' },
   { id: '43', value: 'Коломенская', label: 'Коломенская' },
   { id: '44', value: 'Каширская', label: 'Каширская' },
   { id: '45', value: 'Кантемировская', label: 'Кантемировская' },
   { id: '46', value: 'Царицыно', label: 'Царицыно' },
   { id: '47', value: 'Орехово', label: 'Орехово' },
   { id: '48', value: 'Домодедовская', label: 'Домодедовская' },
   { id: '49', value: 'Красногвардейская', label: 'Красногвардейская' },
];
