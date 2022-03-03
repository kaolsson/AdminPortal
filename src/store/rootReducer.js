import { combineReducers } from '@reduxjs/toolkit';
import { reducer as calendarReducer } from '../slices/calendar';
import { reducer as chatReducer } from '../slices/chat';
import { reducer as kanbanReducer } from '../slices/kanban';
import { reducer as mailReducer } from '../slices/mail';
import { reducer as orderReducer } from '../slices/order';
import { reducer as cpaReducer } from '../slices/cpa';

const rootReducer = combineReducers({
  calendar: calendarReducer,
  chat: chatReducer,
  kanban: kanbanReducer,
  mail: mailReducer,
  order: orderReducer,
  cpa: cpaReducer
});

export default rootReducer;
