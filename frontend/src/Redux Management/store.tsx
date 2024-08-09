import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice.tsx';
import feedbackReducer from './feedbackSlice.tsx';
import meetingReducer from './meetingSlice.tsx'; // Import the meeting reducer
import hostReducer from './hostSlice.tsx';


export const store = configureStore({
  reducer: {
    user: userReducer,
    feedback: feedbackReducer,
    meeting: meetingReducer,
    host: hostReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
