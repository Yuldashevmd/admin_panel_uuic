import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

export const userSlicer = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateUsers(state, { payload }) {
      state.users = payload;
    },
  },
});

export const { updateUsers } = userSlicer.actions;
export default userSlicer.reducer;
