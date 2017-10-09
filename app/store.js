import { applyMiddleware, createStore,combineReducers} from 'redux';
import thunk from 'redux-thunk';

import stockReducer from './stockReducer';

const middleware = applyMiddleware(thunk);

export default createStore(
    combineReducers({
        stockReducer
    }),
    middleware
);