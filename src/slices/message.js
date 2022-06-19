import { createSlice } from '@reduxjs/toolkit';
import { messageApi } from '../__fakeApi__/messageApi';
import objFromArrayMsg from '../utils/objFromArrayMsg';

const initialState = {
    isLoaded: false,
    selectedMessageId: null,
    messages: {
      byId: {},
      allIds: [],
      array: []
    }
};

const slice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    getMessages(state, action) {
        const messages = action.payload;
        console.log(messages);
        state.messages.byId = objFromArrayMsg(messages);
        state.messages.allIds = Object.keys(state.messages.byId);
        state.messages.array = action.payload;
        state.isLoaded = true;
      },
    updateMessage(state, action) {
        const messages = action.payload;
        console.log(messages);
        state.messages.byId = objFromArrayMsg(messages);
        state.messages.allIds = Object.keys(state.messages.byId);
        state.messages.array = action.payload;
        state.isLoaded = true;
//      const message = action.payload;
//      console.log(message);
//      Object.assign(state.messages.byId[message.messageID], action.payload);
    },
  }
});

export const { reducer } = slice;

export const getMessages = (accountID) => async (dispatch) => {
  const data = await messageApi.getMessages(accountID);
  dispatch(slice.actions.getMessages(data));
};

export const updateMessage = (messageID, update) => async (dispatch) => {
    const data = await messageApi.updateMessage(messageID, update);
    dispatch(slice.actions.updateMessage(data));
  };

export default slice;
