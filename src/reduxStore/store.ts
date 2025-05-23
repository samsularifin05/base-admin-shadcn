import { Action, configureStore } from '@reduxjs/toolkit';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { rootReducer } from './reducers';
import { useDispatch, useSelector } from 'react-redux';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
  blacklist: ['form', 'utility'],
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, Action>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppSelector = useSelector.withTypes<RootState>();

export { store };
