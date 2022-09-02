import BlogHeader from "./header";
import { useState } from "react";
import Link from "next/dist/client/link";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {login} from '../store/actions/loginAction';
import {useRouter} from 'next/router'
function Login({loginAction}){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const router = useRouter();
    const onChangeEmail = e => {
        setEmail(e.target.value);
        console.log(email)
    }
    const onChangePassword = e => {
        setPassword(e.target.value);
        console.log(password)
    }
    const onFinish = ()=>{
        loginAction({email,password},router)
    }
    return (
        <div>
        <BlogHeader></BlogHeader>
        <section class="container page">
		<div class="auth-form">
            <h1>Вход</h1>
			<form class="form">
                <fieldset class="fieldset">
                    <input class="input" type="text" onChange={onChangeEmail} name="email" value={email} placeholder="Введите email"/>
                </fieldset>
                <fieldset class="fieldset">
                    <input class="input" type="password" onChange={onChangePassword} value = {password} name="password" placeholder="Введите пароль"/>
                </fieldset>

                <fieldset class="fieldset">
                    {/* <Link href = '/'><button class="button" type="submit">Войти</button></Link> */}
                    {/* <button class="button"  onClick={printValues}>Войти</button> */}
                    <div class = "button" onClick = {onFinish}> Войти</div>
                </fieldset>
			</form>
		</div>
	</section>
        </div>
        )
}

const mapDispatchToProps = dispatch =>({
    loginAction:bindActionCreators(login,dispatch),
})
const mapStateToProps = state => ({
    token:state.loginReducer.token
})
export default connect(mapStateToProps,mapDispatchToProps)(Login);