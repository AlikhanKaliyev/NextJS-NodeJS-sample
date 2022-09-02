import {all , put , takeLatest} from 'redux-saga/effects';
import * as types from '../actions/types';
import axios from 'axios'
import {BASE_URL} from '../../config/base-url'


function *getBlogs(){
    try {
    const blogs = yield axios.get(`${BASE_URL}/api/blogs`).then(res => res.data);
    yield put({type:types.SUCCESS_GET_BLOGS,payload:blogs});
    } catch(e) {
        yield put({type:types.FAILED_GET_BLOGS,errors:e});
    }
}

function *getBlogsByUser({id}){
    try {
        const blogs = yield axios.get(`${BASE_URL}/api/blogs/${id}`).then(res => res.data);
        yield put({type:types.SUCCESS_GET_BLOGS_BY_USER,payload:blogs});
    } catch(e) {
        yield put({type:types.FAILED_GET_BLOGS_BY_USER,errors:e});
    }
}
function* deleteBlog({id}){
    try {
        yield axios.delete(`${BASE_URL}/api/blogs/${id}`).then(res => res.data);
        yield put({type:types.SUCCESS_DELETE_BLOGS,payload:{id}})
    } catch(e) {
        yield put({type:types.FAILED_DELETE_BLOGS, errors:e})
    }
}
function* getBlog({id}){
    try {
        const blog = yield axios.get(`${BASE_URL}/api/blog/${id}`).then(res=> res.data);
        yield put({type:types.SUCCESS_GET_BLOG,payload:{blog}})
    } catch(e) {
        yield put({type:types.FAILED_GET_BLOG,errors:e})
    }
}
function* getComments({id}){
    try {
        const comments = yield axios.get(`${BASE_URL}/api/comments/${id}`).then(res=>res.data);
        yield put({type:types.SUCCESS_GET_COMMENTS,payload:comments})
    } catch(e) {
        yield put({type:types.FAILED_GET_COMMENTS,errors:e})
    }
}
function* addComment({data}){
    try {
        const comment = yield axios.post(`${BASE_URL}/api/comments`,data).then(res=>res.data);
        yield put({type:types.SUCCESS_ADD_COMMENT,payload:comment})
    } catch(e) {
        yield put({type:types.FAILED_ADD_COMMENT,errors:e})
    }
}
export function* blogsSagas() {
    yield all([
        yield takeLatest(types.GET_BLOGS,getBlogs),
        yield takeLatest(types.GET_BLOGS_BY_USER,getBlogsByUser),
        yield takeLatest(types.DELETE_BLOGS,deleteBlog),
        yield takeLatest(types.GET_BLOG,getBlog),
        yield takeLatest(types.GET_COMMENTS,getComments),
        yield takeLatest(types.ADD_COMMENT,addComment)
    ])
}