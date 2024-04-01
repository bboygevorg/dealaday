import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setSelectedUser } = userSlice.actions;

export default userSlice.reducer;
