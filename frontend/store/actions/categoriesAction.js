import * as types from './types';
export function getCategories(data){
    return {data,type:types.GET_CATEGORIES};
}

export function getBlogsByCategory(id){
    return {id,type:types.GET_BLOGS_BY_CATEGORY};
}