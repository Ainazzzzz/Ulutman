import { toast } from 'react-toastify'

export const showToast = (type, message, options) => {
   toast[type](message, { ...options })
}
