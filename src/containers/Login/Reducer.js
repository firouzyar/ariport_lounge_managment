import {SET_CURRENT_USER} from "../../Types/Types"
import {LOG_OUT} from "../../Types/Types"

const initialState = {
    isAuthenticated:false,
    user:{}
};

const authReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: action.user
            }
       case LOG_OUT:
           return{
              ...state,
              isAuthenticated: false,
              user: {}
           }
       default:
          return {
             ...state
          }
    }
}

export default authReducer;