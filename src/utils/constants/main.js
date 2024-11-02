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
            text: 'Квартира',
         },
         {
            id: 'e2',
            value: 'Apartment',
            text: 'Дом',
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
