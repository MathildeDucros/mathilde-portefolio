import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [{ name: null, commentaire: null, company: null, designation: null }],
};

export const testimonialsSlice = createSlice({
  name: "testimonials",
  initialState,
  reducers: {
    addTestimonials: (state, action) => {
      state.value.commentaire = action.payload.commentaire;
      state.value.name = action.payload.name;
      state.value.designation = action.payload.designation;
      state.value.company = action.payload.company;
    },
    removeTestimonials: (state, action) => {
      state.value = state.value.filter(
        (bookmark) => bookmark.title !== action.payload.title
      );
    },
    removeAllTestimonials: (state) => {
      state.value = [];
    },
  },
});

export const { addTestimonials, removeTestimonials, removeAllTestimonials } =
  testimonialsSlice.actions;
export default testimonialsSlice.reducer;
