import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modalName: null,
    isOpen: false,
  },
  reducers: {
    open: (state, action) => {
      state.modalName = action.payload;
      state.isOpen = true;
    },
    close: (state, action) => {
      state.modalName = action.payload;
      state.isOpen = false;
    },
  },
});

export const { open, close } = modalSlice.actions;

export default modalSlice.reducer;
