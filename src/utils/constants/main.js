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


