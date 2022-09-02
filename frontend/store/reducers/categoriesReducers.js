import * as types from '../actions/types';

const initialState = {
    isLoading:false,
    categories:[],
    blogs:[]
}

export default function categoriesReducers(state=initialState,action){
    switch(action.type){
        case types.SUCCESS_GET_CATEGORIES:
            return {...state,categories:action.payload};
        case types.SUCCESS_GET_BLOGS_BY_CATEGORY:
            return {...state,blogs:action.payload};
        default:
            return state;
    }
}