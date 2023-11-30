import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

export const sampleSlicer = createSlice({
  name: "sample",
  initialState,
  reducers: {
    changeLoading(state, { payload }) {
      state.loading = payload;
    },
  },
});

export const { changeLoading } = sampleSlicer.actions;
export default sampleSlicer.reducer;
