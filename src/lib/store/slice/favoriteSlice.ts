import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesLikeState {
  category: string; // ID de la categoría seleccionada
  offset: number;
  isLoading: boolean;
}

const initialState: FavoritesLikeState = {
  category: '',
  offset: 0,
  isLoading: false,
};

const favoritesLikeSlice = createSlice({
  name: 'favoritesLike',
  initialState,
  reducers: {
    updateCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    updateOffset(state, action: PayloadAction<number>) {
      state.offset = action.payload;
    },
  },
});

export const { updateCategory, updateOffset } = favoritesLikeSlice.actions;
export default favoritesLikeSlice.reducer;
