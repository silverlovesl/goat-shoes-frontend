import { combineReducers } from '@reduxjs/toolkit';
import sneakerReducer from './features/sneakerSlice';
import sneakerDetailReducer from './features/sneakerDetailSlice';

const rootReducer = combineReducers({
  sneaker: sneakerReducer,
  sneakerDetail: sneakerDetailReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
