import * as types from './types';
export function login(data,router){
    return {data,router,type:types.LOGIN};
}