import { combineReducers } from '@reduxjs/toolkit';
import { reducer as calendarReducer } from '../slices/calendar';
import { reducer as chatReducer } from '../slices/chat';
import { reducer as kanbanReducer } from '../slices/kanban';
import { reducer as mailReducer } from '../slices/mail';
import { reducer as orderReducer } from '../slices/order';
import { reducer as cpaReducer } from '../slices/cpa';
import { reducer as messageReducer } from '../slices/message';

const rootReducer = combineReducers({
  calendar: calendarReducer,
  chat: chatReducer,
  kanban: kanbanReducer,
  mail: mailReducer,
  order: orderReducer,
  cpa: cpaReducer,
  message: messageReducer
});

export default rootReducer;
