import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux"
import taskReducer from './taskSlice';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";


const rootReducer = combineReducers({taskReducer});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
})
const Persistor = persistStore(store);
// Persistor.purge();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export {store, Persistor};