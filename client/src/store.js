import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const middleware = [thunk];

const persistConfig={
    key:'root',
    storage
}

const persistedReducer =persistReducer(persistConfig,rootReducer);

const store =createStore(persistedReducer,compose(applyMiddleware(...middleware),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
const persistor = persistStore(store);


// if (window.navigator.userAgent.includes("Chrome")) {
//     store =  createStore(
//         rootReducer,
//         compose(applyMiddleware(...middleware),
//         window.__REDUX_DEVTOOLS_EXTENSION__ && 
//         window.__REDUX_DEVTOOLS_EXTENSION__()));
// } else {
//     store =  createStore(
//         rootReducer,
//         compose(applyMiddleware(...middleware)));
// }

export { store , persistor };