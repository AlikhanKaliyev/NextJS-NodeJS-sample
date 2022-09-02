import * as types from './types';
export function getBlogs(data){
    return {data,type:types.GET_BLOGS};
}
export function getBlogsByUser(id){
    return {id,type:types.GET_BLOGS_BY_USER};
}
export function deleteBlog(id){
    return {id,type:types.DELETE_BLOGS};
}

export function getBlog(id){
    return {id,type:types.GET_BLOG};
}
export function getComments(id) {
    return {id,type:types.GET_COMMENTS};
}
export function addComment(data){
    return {data,type:types.ADD_COMMENT}
}
