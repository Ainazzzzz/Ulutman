import BagIcon from '../../assets/icons/bag-icon.svg?react';
import OccupancyIcon from '../../assets/icons/occupancy-icon.svg?react';
import HotelIcon from '../../assets/icons/hotel-icon.svg?react';
import ServicesIcon from '../../assets/icons/services-icon.svg?react';
import ImmovablesIcon from '../../assets/icons/immovables-icon.svg?react';
import AutoIcon from '../../assets/icons/auto-icon.svg?react';
import SellingIcon from '../../assets/icons/selling-icon.svg?react';

export const categories = [
   { title: 'Работа', Icon: BagIcon, background: '#B64D6B' },
   { title: 'Аренда', Icon: OccupancyIcon, background: '#B1AC38' },
   { title: 'Гостиница', Icon: HotelIcon, background: '#4465B8' },
   { title: 'Услуги', Icon: ServicesIcon, background: '#44A55F' },
   { title: 'Недвижимость', Icon: ImmovablesIcon, background: '#3A84A4' },
   { title: 'Авто', Icon: AutoIcon, background: '#953838' },
   { title: 'Продам', Icon: SellingIcon, background: '#8D3694' },
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
