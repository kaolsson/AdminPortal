import { createSlice } from '@reduxjs/toolkit';
import { orderApi } from '../__fakeApi__/orderApi';
import objFromArray from '../utils/objFromArray';

const initialState = {
    isLoaded: false,
    selectedOrderId: null,
    orders: {
      byId: {},
      allIds: []
    }
};

const slice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    getOrders(state, action) {
        const { orders } = action.payload;
        console.log(orders);
        state.orders.byId = objFromArray(orders.order);
        state.orders.allIds = Object.keys(state.orders.byId);
        state.isLoaded = true;
      },
    updateOrder(state, action) {
      const order = action.payload;
      Object.assign(state.orders.byId[order.orderID], order);
    },
  }
});

export const { reducer } = slice;

export const getOrders = (userID) => async (dispatch) => {
  const data = await orderApi.getOrders(userID);

  dispatch(slice.actions.getOrders(data));
};

export const updateOrder = (orderID, update) => async (dispatch) => {
    const data = await orderApi.updateOrder({ orderID, update });

    dispatch(slice.actions.updateOrder(data));
  };

export default slice;
