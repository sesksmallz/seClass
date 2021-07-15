import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './root';
import K from '../constants';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') middlewares.push(logger);

const persistConfig = {
	key: K.ROOT_PERSIST_KEY,
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);
export default store;
