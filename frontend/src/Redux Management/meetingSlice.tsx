import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import meetingServices from '../services/meetingService.tsx';

interface Meeting {
  sessionId: number;
  sessionName: string;
  sessionDescription: string;
  sessionStatus: string;
}

interface MeetingState {
  meetings: Meeting[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MeetingState = {
  meetings: [],
  status: 'idle',
  error: null
};
/**
 * Asynchronous thunk for fetching meetings.
 */
export const fetchMeetings = createAsyncThunk('meeting/fetchMeetings', async () => {
  const response = await meetingServices.getMeetings();
  // Assuming response.data.sessions contains the meetings
  return response.data.sessions;
});

// meetingSlice reducer definitions
const meetingSlice = createSlice({
  name: 'meeting',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMeetings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMeetings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.meetings = action.payload;
      })
      .addCase(fetchMeetings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Could not fetch meetings';
      });
  },
});

export default meetingSlice.reducer;
