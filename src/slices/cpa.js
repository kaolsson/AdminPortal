import { createSlice } from '@reduxjs/toolkit';
import { cpaApi } from '../__fakeApi__/cpaApi';
import objFromArray from '../utils/objFromArray';

const initialState = {
    isLoaded: false,
    selectedCpaId: null,
    cpas: {
      byId: {},
      allIds: []
    }
};

const slice = createSlice({
  name: 'cpa',
  initialState,
  reducers: {
    getCpas(state, action) {
        const { cpas } = action.payload;
        console.log(cpas);
        state.cpas.byId = objFromArray(cpas.cpa);
        state.cpas.allIds = Object.keys(state.cpas.byId);
        state.isLoaded = true;
      },
    updatecpa(state, action) {
      const cpa = action.payload;
      Object.assign(state.cpas.byId[cpa.id], cpa);
    },
  }
});

export const { reducer } = slice;

export const getCpas = (accountID) => async (dispatch) => {
  const data = await cpaApi.getCpas(accountID);

  dispatch(slice.actions.getCpas(data));
};

export const updateCpa = (cpaID, update) => async (dispatch) => {
    const data = await cpaApi.updatecpa({ cpaID, update });

    dispatch(slice.actions.updatecpa(data));
  };

export default slice;
