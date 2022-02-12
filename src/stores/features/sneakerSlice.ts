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
  totalCount?: number;
  sneakers: Sneaker[];
  loading: boolean;
  errors: string | null;
} & SneakerSearchCondition;

const initialState: SneakerState = {
  totalCount: null,
  sneakers: [],
  pageNo: 1,
  limit: 20,
  sortBy: 'release-date-O',
  nameLike: '',
  shoeCondtion: '',
  loading: false,
  errors: null,
};

const sneaker = createSlice({
  name: '@@SNEAKER',
  initialState,
  reducers: {
    initState: (state: SneakerState) => {
      state.totalCount = null;
      state.sneakers = [];
      state.pageNo = 1;
      state.limit = 20;
      state.loading = false;
      state.errors = null;
      state.nameLike = '';
      state.sortBy = 'release-date-O';
    },
    initPagination: (state: SneakerState) => {
      state.totalCount = null;
      state.sneakers = [];
      state.pageNo = 1;
      state.limit = 20;
      state.loading = false;
      state.errors = null;
    },
    nextPage: (state: SneakerState) => {
      state.pageNo += 1;
    },
    startFetching: (state: SneakerState) => {
      state.loading = true;
      state.errors = null;
    },
    setTotalCount: (state: SneakerState, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
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
      state.sneakers = action.payload;
    },
    appendSneakers: (state: SneakerState, action: PayloadAction<Sneaker[]>) => {
      state.sneakers = state.sneakers.concat(action.payload);
    },

    setErrors: (state: SneakerState, action: PayloadAction<string>) => {
      state.errors = action.payload;
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
  appendSneakers,
  finishFetching,
  setSortBy,
  setNameLike,
  setTotalCount,
  setErrors,
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
      const response = await sneakerAPI.fetchSneakers(condition.pageNo, condition.limit, condition.sortBy, condition.nameLike, condition.shoeCondtion);
      dispach(setTotalCount(response.totalCount));
      if (response.data?.length > 0) {
        dispach(appendSneakers(response.data));
      }
    } catch (err) {
      dispach(setErrors(String(err)));
    } finally {
      dispach(finishFetching());
    }
  };

export default sneaker.reducer;
