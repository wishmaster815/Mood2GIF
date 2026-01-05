import { createSlice } from "@reduxjs/toolkit";

const saved = JSON.parse(localStorage.getItem("collection")) || [];

const collectionSlice = createSlice({
  name: "collection",
  initialState: {
    items: saved,
  },
  reducers: {
    addToCollection(state, action) {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        localStorage.setItem("collection", JSON.stringify(state.items));
      }
    },

    removeFromCollection(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("collection", JSON.stringify(state.items));
    },
  },
});

export const { addToCollection, removeFromCollection } =
  collectionSlice.actions;

export default collectionSlice.reducer;
