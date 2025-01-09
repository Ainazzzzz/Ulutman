import BagIcon from '../../assets/icons/bag-icon.svg?react'
import OccupancyIcon from '../../assets/icons/occupancy-icon.svg?react'
import HotelIcon from '../../assets/icons/hotel-icon.svg?react'
import ServicesIcon from '../../assets/icons/services-icon.svg?react'
import ImmovablesIcon from '../../assets/icons/immovables-icon.svg?react'
import AutoIcon from '../../assets/icons/auto-icon.svg?react'
import SellingIcon from '../../assets/icons/selling-icon.svg?react'

export const categoryTab = [
   {
      category: 'WORK',
      title: 'user.categoryModal.work',
      Icon: BagIcon,
      background: '#B64D6B',
      subCategory: [
         {
            id: 'e2',
            value: 'PartTime',
            text: 'user.categoryModal.subCategory.partTime',
         },
         {
            id: 'e3',
            value: 'FullTime',
            text: 'user.categoryModal.subCategory.fullTime',
         },
      ],
   },
   {
      category: 'RENT',
      title: 'user.categoryModal.rent',
      Icon: OccupancyIcon,
      background: '#B1AC38',
      subCategory: [
         {
            id: 'e2',
            value: 'I_RentRoom',
            text: 'user.categoryModal.subCategory.IrentRoom',
         },
         {
            id: 'e3',
            value: 'I_RentBed',
            text: 'user.categoryModal.subCategory.IrentBed',
         },
         {
            id: 'e4',
            value: 'I_RenApartment',
            text: 'user.categoryModal.subCategory.IrentApartment',
         },
         {
            id: 'e5',
            value: 'RentRoom',
            text: 'user.categoryModal.subCategory.rentRoom',
         },
         // {
         //    id: 'e6',
         //    value: 'RentBed',
         //    text: 'Снимаю комнату',
         // },
         // {
         //    id: 'e7',
         //    value: 'RentApartment',
         //    text: 'Снимаю комнату',
         // },
         {
            id: 'e8',
            value: 'RentOffice',
            text: 'user.categoryModal.subCategory.rentOffice',
         },
      ],
   },
   {
      category: 'HOTEL',
      title: 'user.categoryModal.hotel',
      Icon: HotelIcon,
      background: '#4465B8',
      subCategory: [
         {
            id: 'e2',
            value: 'DailyRent',
            text: 'user.categoryModal.subCategory.dailyRent',
         },
         {
            id: 'e3',
            value: 'LongTermRent',
            text: 'user.categoryModal.subCategory.longTermRent',
         },
      ],
   },
   {
      category: 'SERVICES',
      title: 'user.categoryModal.services',
      Icon: ServicesIcon,
      background: '#44A55F',
      subCategory: [
         {
            id: 'e2',
            value: 'MEDICAL',
            text: 'user.categoryModal.subCategory.medical',
         },
         {
            id: 'e3',
            value: 'LEGAL',
            text: 'user.categoryModal.subCategory.legal',
         },
         {
            id: 'e4',
            value: 'BEAUTY',
            text: 'user.categoryModal.subCategory.beauty',
         },
         {
            id: 'e5',
            value: 'AIRTICKET',
            text: 'user.categoryModal.subCategory.airticket',
         },
         {
            id: 'e6',
            value: 'TAXIANDTRACK',
            text: 'user.categoryModal.subCategory.taxiAndTrack',
         },
         {
            id: 'e7',
            value: 'REPAIR',
            text: 'user.categoryModal.subCategory.repair',
         },
         {
            id: 'e8',
            value: 'DIFFERENT',
            text: 'user.categoryModal.subCategory.different',
         },
      ],
   },
   {
      category: 'REAL_ESTATE',
      title: 'user.categoryModal.real_estate',
      Icon: ImmovablesIcon,
      background: '#3A84A4',
      subCategory: [
         {
            id: 'e2',
            value: 'Apartment',
            text: 'user.categoryModal.subCategory.apartment',
         },
         {
            id: 'e3',
            value: 'House',
            text: 'user.categoryModal.subCategory.house',
         },
         {
            id: 'e4',
            value: 'PartOfLand',
            text: 'user.categoryModal.subCategory.partOfLand',
         },
         {
            id: 'e5',
            value: 'Space',
            text: 'user.categoryModal.subCategory.space',
         },
      ],
   },
   {
      category: 'AUTO',
      title: 'user.categoryModal.auto',
      Icon: AutoIcon,
      background: '#953838',
      subCategory: [
         {
            id: 'e2',
            value: 'SaleOfCar',
            text: 'user.categoryModal.subCategory.saleOfCar',
         },
         {
            id: 'e3',
            value: 'RentOfCar',
            text: 'user.categoryModal.subCategory.rentOfCar',
         },
      ],
   },
   {
      category: 'SELL',
      title: 'user.categoryModal.sell',
      Icon: SellingIcon,
      background: '#8D3694',
      subCategory: [
         {
            id: 'e2',
            value: 'Clothes',
            text: 'user.categoryModal.subCategory.clothes',
         },
         {
            id: 'e3',
            value: 'HouseAppliances',
            text: 'user.categoryModal.subCategory.houseAppliances',
         },
         {
            id: 'e4',
            value: 'Electronics',
            text: 'user.categoryModal.subCategory.electronics',
         },
      ],
   },
]

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
]
