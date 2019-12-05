import {combineReducers,compose,createStore,applyMiddleware} from "redux";
import ReduxThunk from "redux-thunk";

//reducers
import authReducer from "./containers/Login/Reducer";

const composeenhance = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default () =>{
    const store = createStore(combineReducers({
            user:authReducer,
    }),
        composeenhance(applyMiddleware(ReduxThunk))
    );
    return store;
}