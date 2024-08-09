import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    password: '',
    name: '',
    hasAgreed: false,
    fileName: '',
    authenticatedUser: null,
    profilePic: '',
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setHasAgreed: (state, action) => {
      state.hasAgreed = action.payload;
    },
    setFileName: (state, action) => {
      state.fileName = action.payload;
    },
    setAuthenticatedUser: (state, action) => {
      state.authenticatedUser = action.payload;
    },
    resetForm: (state) => {
      state.email = '';
      state.password = '';
      state.name = '';
      state.hasAgreed = false;
      state.fileName = '';
    },
    resetCredentials: (state) => {
      state.email = '';
      state.password = '';
    },
    setProfilePic: (state, action) => {
      state.profilePic = action.payload;
    },
  },
});

export const {
  setEmail, setPassword, setName, setHasAgreed, setFileName, setAuthenticatedUser, resetForm, resetCredentials,setProfilePic
} = userSlice.actions;

// userSlice reducer definitions
export default userSlice.reducer;
