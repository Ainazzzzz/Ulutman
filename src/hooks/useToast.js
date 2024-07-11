import { toast } from 'react-toastify';

export const useToast = () => {
   const showToast = (type, message, options) => {
      toast[type](message, { ...options });
   };

   return { showToast };
};
