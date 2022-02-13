import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Sneaker } from '../../models/sneaker';
import { sneakerAPI } from '../../services/api/sneaker.service';
import { AppThunk } from '../configuration';

type SneakerDetailState = {
  sneaker: Sneaker | null;
  loading: boolean;
  errors: string | null;
};

const initialState: SneakerDetailState = {
  sneaker: null,
  loading: false,
  errors: null,
};

const sneakerDetail = createSlice({
  name: '@@SNEAKER_DETAIL',
  initialState,
  reducers: {
    initState: (state: SneakerDetailState) => {
      state.loading = false;
      state.errors = null;
      state.sneaker = null;
    },
    startFetching: (state: SneakerDetailState) => {
      state.loading = true;
      state.errors = null;
    },
    setSneaker: (state: SneakerDetailState, action: PayloadAction<Sneaker>) => {
      state.sneaker = action.payload;
    },
    setErrors: (state: SneakerDetailState, action: PayloadAction<string>) => {
      state.errors = action.payload;
    },
    finishFetching: (state: SneakerDetailState) => {
      state.loading = false;
    },
  },
});

export const { initState, startFetching, setSneaker, finishFetching, setErrors } = sneakerDetail.actions;

/**
 * Fetch sneaker by id
 * @param sneak_id sneaker id
 * @returns
 */
export const fetchSneakerByID =
  (sneak_id: number): AppThunk =>
  async (dispach) => {
    try {
      dispach(startFetching());
      const sneaker = await sneakerAPI.fetchSneakerByID(sneak_id);
      dispach(setSneaker(sneaker));
    } catch (err: any) {
      console.log('On Error', err);
      dispach(setErrors(err?.statusText));
    } finally {
      dispach(finishFetching());
    }
  };

export default sneakerDetail.reducer;
