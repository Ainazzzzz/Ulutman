import { Rating as MuiRating } from '@mui/material'
import RatingIcon from '../../assets/icons/rating-icon.svg?react'
import RatingEmptyIcon from '../../assets/icons/empty-rating-icon.svg?react'

export const Rating = ({ ratings }) => {
   return (
      <MuiRating
         value={ratings}
         readOnly
         size="small"
         name="customized-icons"
         icon={<RatingIcon />}
         emptyIcon={<RatingEmptyIcon />}
      />
   )
}
