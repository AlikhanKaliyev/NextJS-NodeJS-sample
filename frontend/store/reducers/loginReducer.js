import * as types from '../actions/types';

const initialState = {
    token:{}
}

export default function loginReducer(state=initialState, action) {
    switch(action.type) {
        case types.LOGIN: 
            return {...state};
        case types.FAILed_LOGIN:
            alert("Неправильный email или пароль");
            return state;
        case types.SUCCESS_LOGIN:
            return {...state,token:action.payload}
        default:
            return state;
    }
}