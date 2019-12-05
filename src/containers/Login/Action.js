import {SET_CURRENT_USER} from "../../Types/Types"
import {LOG_OUT} from "../../Types/Types"


export function setCurrentUser(user) {
    return{
        type: SET_CURRENT_USER,
        user
    }
}

export function logOut() {
   return{
      type: LOG_OUT,
   }
}