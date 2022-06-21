import { createSlice } from '@reduxjs/toolkit';
import { signupApi } from '../__fakeApi__/signupApi';
import objFromArrayMsg from '../utils/objFromArrayMsg';

const initialState = {
    isLoaded: false,
    selectedmessageID: null,
    signups: {
      byId: {},
      allIds: [],
      array: []
    }
};

const slice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    getSignups(state, action) {
        const signups = action.payload;
        console.log(signups);
        state.signups.byId = objFromArrayMsg(signups);
        state.signups.allIds = Object.keys(state.signups.byId);
        state.signups.array = action.payload;
        state.isLoaded = true;
      },
    updateSignup(state, action) {
        const signups = action.payload;
        console.log(signups);
        state.signups.byId = objFromArrayMsg(signups);
        state.signups.allIds = Object.keys(state.signups.byId);
        state.signups.array = action.payload;
        state.isLoaded = true;
    },
  }
});

export const { reducer } = slice;

export const getSignups = (accountID) => async (dispatch) => {
  const data = await signupApi.getSignups(accountID);
  dispatch(slice.actions.getSignups(data));
};

export const updateSignup = (messageID, update) => async (dispatch) => {
    const data = await signupApi.updateSignup(messageID, update);
    dispatch(slice.actions.updateSignup(data));
  };

export default slice;
