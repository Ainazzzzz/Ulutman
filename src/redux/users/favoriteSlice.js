import { createSlice } from '@reduxjs/toolkit';
import { deleteFavorites, getFavorites } from './favoriteThunk';

export const favoriteSlice = createSlice({
   name: 'favoriteProducts',
   initialState: {
      favoriteProducts: [],
   },
   extraReducers: builder => {
      builder
         .addCase(getFavorites.fulfilled, (state, action) => {
            state.favoriteProducts = action.payload;
         })
         .addCase(deleteFavorites.fulfilled, (state, action) => {
            // Убедитесь, что action.payload содержит id удаляемого продукта
            const productIdToDelete = action.payload; // Предполагается, что payload - это id продукта
            state.favoriteProducts = state.favoriteProducts.filter(
               product => product.id !== productIdToDelete,
            );
            console.log(
               'Текущие избранные продукты после удаления:',
               state.favoriteProducts,
            );
         });
   },
});
