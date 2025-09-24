// This file contains the Redux slice for managing repository-related state.

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  repositories: [],
  loading: false,
  error: null,
};

const repoSlice = createSlice({
  name: 'repo',
  initialState,
  reducers: {
    fetchReposStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchReposSuccess(state, action) {
      state.loading = false;
      state.repositories = action.payload;
    },
    fetchReposFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchReposStart, fetchReposSuccess, fetchReposFailure } = repoSlice.actions;
export default repoSlice.reducer;