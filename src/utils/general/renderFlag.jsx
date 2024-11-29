/* eslint-disable import/no-unresolved */
import KgFlag from '../../assets/icons/kg.svg?react'
import RussianFlag from '../../assets/icons/russian-flag.svg?react'
import TjFlag from '../../assets/icons/tj.svg?react'
import UzFlag from '../../assets/icons/uz.svg?react'
import UsaFlag from '../../assets/icons/usa.svg?react'
import TurkeyFlag from '../../assets/icons/turkey.svg?react'

export const renderFlag = language => {
   switch (language) {
      case 'kg':
         return <KgFlag />
      case 'ru':
         return <RussianFlag />
      case 'tj':
         return <TjFlag />
      case 'uz':
         return <UzFlag />
      case 'en':
         return <UsaFlag />
      case 'tr':
         return <TurkeyFlag />
      default:
         return <RussianFlag />
   }
}
