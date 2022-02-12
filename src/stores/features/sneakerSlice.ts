import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SneakSearchSortBy, Sneaker } from '../../models';
import { sneakerAPI } from '../../services/api/sneaker.service';
import { AppThunk } from '../configuration';

interface SneakerSearchCondition {
  pageNo: number;
  limit: number;
  sortBy?: SneakSearchSortBy;
  nameLike?: string;
  shoeCondtion?: string;
}

type SneakerState = {
  sneakers: Sneaker[];
  loading: boolean;
  err: string | null;
} & SneakerSearchCondition;

const initialState: SneakerState = {
  sneakers: [],
  pageNo: 1,
  limit: 20,
  sortBy: 'release-date-O',
  nameLike: '',
  shoeCondtion: '',
  loading: false,
  err: null,
};

const sneaker = createSlice({
  name: '@@SNEAKER',
  initialState,
  reducers: {
    initState: (state: SneakerState) => {
      state.sneakers = [];
      state.pageNo = 1;
      state.limit = 20;
      state.loading = false;
      state.err = null;
      state.nameLike = '';
      state.sortBy = null;
    },
    initPagination: (state: SneakerState) => {
      state.sneakers = [];
      state.pageNo = 1;
      state.limit = 20;
      state.loading = false;
      state.err = null;
    },
    nextPage: (state: SneakerState) => {
      state.pageNo += 1;
      console.log(state.pageNo);
    },
    startFetching: (state: SneakerState) => {
      state.loading = true;
    },
    setSortBy: (state: SneakerState, action: PayloadAction<SneakSearchSortBy>) => {
      state.sortBy = action.payload;
    },
    setSortName: (state: SneakerState, action: PayloadAction<SneakSearchSortBy>) => {
      state.sortBy = action.payload;
    },
    setNameLike: (state: SneakerState, action: PayloadAction<string>) => {
      state.nameLike = action.payload;
    },
    setShoeCondtion: (state: SneakerState, action: PayloadAction<string>) => {
      state.shoeCondtion = action.payload;
    },
    setSneakers: (state: SneakerState, action: PayloadAction<Sneaker[]>) => {
      state.sneakers = state.sneakers.concat(action.payload);
    },
    setError: (state: SneakerState, action: PayloadAction<string>) => {
      state.err = action.payload;
    },
    finishFetching: (state: SneakerState) => {
      state.loading = false;
    },
  },
});

export const {
  initState,
  initPagination,
  nextPage,
  startFetching,
  setSneakers,
  finishFetching,
  setSortBy,
  setNameLike,
  setShoeCondtion,
  // Force break line
} = sneaker.actions;

/**
 * Fetch sneaker data
 * @returns
 */
export const fetchSneakers =
  (condition: SneakerSearchCondition): AppThunk =>
  async (dispach) => {
    try {
      dispach(startFetching);
      const sneakerData = await sneakerAPI.fetchSneakers(condition.pageNo, condition.limit, condition.sortBy, condition.nameLike, condition.shoeCondtion);
      dispach(setSneakers(sneakerData));
    } catch (err) {
    } finally {
      dispach(finishFetching());
    }
  };

export default sneaker.reducer;
