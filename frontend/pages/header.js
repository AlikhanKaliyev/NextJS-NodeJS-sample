import img1 from '../images/search.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect ,useReducer, useState} from 'react';
import Router from 'next/router';
import { currentUsero } from '../config/currentUser';
function parseJwt(token) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}
export default function BlogHeader({children}){
    const [token,setToken] = useState(null);
    useEffect(()=>{
        if(typeof window !== "undefined"){
            if(localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            localStorage.setItem('currentUserId',parseJwt(localStorage.getItem('token')).id)
            }
        }
        console.log(token)
    },[])
    const logOut = () => {
        localStorage.clear();
        Router.reload()
    }
    if(token){
    return (
    <div><header class="header container">
    <div class="header-logo">
        <Link href = '/'><a >Decode Blog</a></Link>	
    </div>
    <div class="header-search">
        <input type="text" class="input-search" placeholder="Поиск по блогам"/>
        <button class="button button-search">
            <Image src = {img1}></Image>
            Найти
        </button>
    </div>
    <div>
        <div class="button-group">
            <Link href = '/profile'><a class="button">Профиль</a></Link>
        </div>
    </div>
</header>
        <main>
            {children}
        </main>
</div>)
    } else {
        return (
            <div><header class="header container">
    <div class="header-logo">
        <Link href = '/'><a href="">Decode Blog</a></Link>	
    </div>
    <div class="header-search">
        <input type="text" class="input-search" placeholder="Поиск по блогам"/>
        <button class="button button-search">
            <Image src = {img1}></Image>
            Найти
        </button>
    </div>
    <div>
        <div class="button-group">
            <Link href = '/register'><a class="button">Регистрация</a></Link>
            <Link href = '/login'><a class="button">Вход</a></Link>
        </div> 
    </div>
</header>
        <main>
            {children}
        </main>
</div>
        )
    }
}