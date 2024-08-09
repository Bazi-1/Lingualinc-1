import { createAsyncThunk } from '@reduxjs/toolkit';
import UserService from "../../services/UserService.tsx";
import { setProfilePic } from '../../Redux Management/userSlice.tsx';


/**
 * Asynchronous thunk action to fetch a user's profile picture.
 * @param {number} userId - The ID of the user whose profile picture is to be fetched.
 * @returns {function} A thunk function that dispatches actions based on the fetch result.
 */
export const fetchProfilePic = createAsyncThunk(
  'user/fetchProfilePic',
  async (userId: number, thunkAPI) => {
    try {
      const response = await UserService.getUserProfilePic(userId);
      thunkAPI.dispatch(setProfilePic(response.data.profilePic));
    } catch (error) {
      console.error("Error fetching profile picture:", error);
    }
  }
);
