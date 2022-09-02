import {all} from 'redux-saga/effects';
import { loginSaga } from './loginSaga';
import { categoriesSagas } from './categoriesSagas';
import { blogsSagas } from './blogsSagas';
export default function* rootSaga(){
    yield all([
        loginSaga(),
        categoriesSagas(),
        blogsSagas()
    ])
}