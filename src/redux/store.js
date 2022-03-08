//Connect redux-think with redux project
import {createStore, applyMiddleware} from 'redux'; 
//(1)import middleware
import logger from 'redux-logger';
import {persistStore} from 'redux-persist';
//(2) We remove thunk cause we don't use anymore
import rootReducer from './root-reducer';
import createSagaMiddleware from '@redux-saga/core';
import { fetchCollectionsStart } from './shop/shop.sagas';


const sagaMiddleware = createSagaMiddleware();
//global variable
const middlewares = [sagaMiddleware]; 
if (process.env.NODE_ENV === 'development'){
    middlewares.push(logger);
}
export const store = createStore(rootReducer, applyMiddleware(...middlewares))
//(3)use applyMiddleware in create store function
//(4)pass thunk in applyMiddleware function

sagaMiddleware.run(fetchCollectionsStart);
export const persistor = persistStore(store);
export default { store, persistStore }; 