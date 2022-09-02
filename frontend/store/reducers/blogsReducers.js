import * as types from '../actions/types';

const initialState = {
    isLoading:false,
    blogs:[],
    neededBlogs:[],
    blog:{},
    comments:[]
}

export default function blogsReducers(state=initialState,action){
    switch(action.type){
        case types.SUCCESS_GET_BLOGS:
            return {...state,blogs:action.payload};
        case types.SUCCESS_GET_BLOGS_BY_USER:
            return {...state,neededBlogs:action.payload};
        case types.SUCCESS_DELETE_BLOGS:
            return {...state,neededBlogs:removeById(state.neededBlogs,action.payload.id)};
        case types.SUCCESS_GET_BLOG:
            return {...state,blog:action.payload}
        case types.SUCCESS_GET_COMMENTS:
            return {...state,comments:action.payload}
        case types.SUCCESS_ADD_COMMENT:
            // console.log(comments)
            // console.log({...state,comments:add(state.comments,action.payload)})
            return {...state,comments:[...state.comments,action.payload]}


        default:
            return state;
    }
}

function removeById(arr,id){
    return arr.filter(item => item.id !==id)
}
function add(arr,elem) {
    arr.push(elem)
    return arr
}