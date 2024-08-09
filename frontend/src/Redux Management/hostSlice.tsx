import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import meetingService from '../services/meetingService.tsx';

interface Session {
  sessionId: number;
  sessionName: string;
  sessionDescription: string;
}

interface HostState {
  hostSessions: Session[];
  activeSessionId: number | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: HostState = {
  hostSessions: [],
  activeSessionId: null,
  status: 'idle',
  error: null,
};

/**
 * Asynchronous thunk for fetching host sessions.
 */
export const fetchHostSessions = createAsyncThunk(
  'host/fetchHostSessions',
  async (userId: number) => {
    const response = await meetingService.getHostSessions(userId);
    return response.data.sessions;
  }
);

// hostSlice reducer definitions
const hostSlice = createSlice({
  name: 'host',
  initialState,
  reducers: {
    setActiveSessionId: (state, action: PayloadAction<number | null>) => {
      state.activeSessionId = action.payload;
    },
    // Additional reducer for handling other actions (if any)
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHostSessions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHostSessions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.hostSessions = action.payload;
      })
      .addCase(fetchHostSessions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch host sessions';
      });
  },
});

export const { setActiveSessionId } = hostSlice.actions;
export default hostSlice.reducer;
