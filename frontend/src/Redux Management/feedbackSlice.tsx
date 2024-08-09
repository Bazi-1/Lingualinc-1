import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import feedServices from '../services/feedbackService.tsx';

interface FeedbackItem {
  userId: number;
  content: string;
  userName: string;
  feedback_date: string;
}

interface FeedbackState {
  feedbacks: FeedbackItem[];
  showFeedbackForm: boolean;
  feedbackContent: string;
  sessionExpired: boolean;
}

const initialState: FeedbackState = {
  feedbacks: [],
  showFeedbackForm: false,
  feedbackContent: '',
  sessionExpired: false,
};

/**
 * Asynchronous thunk for fetching feedbacks.
 */
export const fetchFeedbacks = createAsyncThunk('feedback/fetchFeedbacks', async () => {
  const response = await feedServices.displayfeedback();
  return response.data.map(fb => ({
    userId: fb.user.userId,
    userName: fb.user.userName,
    content: fb.content,
    feedback_date: fb.feedback_date,
  }));
});

/**
 * Asynchronous thunk for posting feedback.
 */
export const postFeedback = createAsyncThunk(
  'feedback/postFeedback',
  async (feedbackData: { userId: number; content: string }, thunkAPI) => {
    try {
      await feedServices.postfeedback(feedbackData.userId, feedbackData.content);
      thunkAPI.dispatch(fetchFeedbacks()); // Refetch feedbacks after posting
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to post feedback');
    }
  }
);

// feedbackSlice reducer definitions
export const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    setFeedbackContent: (state, action) => {
      state.feedbackContent = action.payload;
    },
    toggleFeedbackForm: (state) => {
      state.showFeedbackForm = !state.showFeedbackForm;
    },
    setSessionExpired: (state, action) => {
      state.sessionExpired = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFeedbacks.fulfilled, (state, action) => {
      state.feedbacks = action.payload;
    });
  },
});

export const { setFeedbackContent, toggleFeedbackForm, setSessionExpired } = feedbackSlice.actions;

export default feedbackSlice.reducer;
