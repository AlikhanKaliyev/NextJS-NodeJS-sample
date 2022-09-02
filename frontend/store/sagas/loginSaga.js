import {all , put , takeLatest} from 'redux-saga/effects';
import * as types from '../actions/types';
import axios from 'axios'
import {BASE_URL} from '../../config/base-url'

function* login({data,router}){
    try{
        const Token = yield axios.post(`${BASE_URL}/api/login`,data).then(res=>res.data);
        if(Token!=='' && Token){
            console.log(Token);
            axios.defaults.headers.common['authorization'] = `Bearer ${Token}`;
            localStorage.setItem('token',Token)
            console.log(localStorage.getItem('token'))
            router.push('/');
        } else {
            yield put({type:types.FAILED_LOGIN,errors:{}})
            return
        }
        yield put({type:types.SUCCESS_LOGIN,payload:Token})
    } catch(e){
        yield put({type:types.FAILED_LOGIN,errors:e})
    }
}

export function* loginSaga(){
    yield all([
        yield takeLatest(types.LOGIN,login)
    ])
}