import {all , put , takeLatest} from 'redux-saga/effects';
import * as types from '../actions/types';
import axios from 'axios'
import {BASE_URL} from '../../config/base-url'


function *getCategories(){
    try {
    const categories = yield axios.get(`${BASE_URL}/api/categories`).then(res => res.data);
    yield put({type:types.SUCCESS_GET_CATEGORIES,payload:categories});
    } catch(e) {
        yield put({type:types.FAILED_GET_CATEGORIES,errors:e});
    }
}

function *getBlogsByCategory({id}){
    try {
        const blogs = yield axios.get(`${BASE_URL}/api/categories/${id}`).then(res=>res.data);
        yield put({type:types.SUCCESS_GET_BLOGS_BY_CATEGORY,payload:blogs});
    } catch(e) {
        yield put({type:types.FAILED_GET_BLOGS_BY_CATEGORY,errors:e});
    }
}
export function* categoriesSagas() {
    yield all([
        yield takeLatest(types.GET_CATEGORIES,getCategories),
        yield takeLatest(types.GET_BLOGS_BY_CATEGORY,getBlogsByCategory)
    ])
}