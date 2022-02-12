import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Sneaker } from '../../models/sneaker';
import { sneakerAPI } from '../../services/api/sneaker.service';
import { AppThunk } from '../configuration';

type SneakerDetailState = {
  sneaker: Sneaker | null;
  loading: boolean;
  err: string | null;
};

const initialState: SneakerDetailState = {
  sneaker: null,
  loading: false,
  err: null,
};

const sneakerDetail = createSlice({
  name: '@@SNEAKER_DETAIL',
  initialState,
  reducers: {
    startFetching: (state: SneakerDetailState) => {
      state.loading = true;
    },
    setSneaker: (state: SneakerDetailState, action: PayloadAction<Sneaker>) => {
      state.sneaker = action.payload;
    },
    finishFetching: (state: SneakerDetailState) => {
      state.loading = false;
    },
  },
});

export const { startFetching, setSneaker, finishFetching } = sneakerDetail.actions;

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
    } catch (err) {
    } finally {
      dispach(finishFetching());
    }
  };

export default sneakerDetail.reducer;
