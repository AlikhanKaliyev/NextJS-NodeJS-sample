import BlogHeader from "./header";
import Link from "next/dist/client/link";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import BASE_URL from "../config/base-url";
import { ApiError } from "next/dist/server/api-utils";
export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [full_name, setFull_name] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };
  const onChangeFullname = (e) => {
    setFull_name(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangePassword1 = (e) => {
    setPassword1(e.target.value);
  };
  const toRegister = () => {
    console.log(BASE_URL);
    if (password === password1) {
      axios
        .post("http://blogserver.alikhankaliyev.site/api/users", {
          email,
          nickname,
          full_name,
          password,
        })
        .then((res) => {
          console.log(res.data);
        });
      router.push("/login");
    } else {
      alert("Пароли не совпадают");
    }
  };
  return (
    <div>
      <BlogHeader></BlogHeader>
      <section class="container page">
        <div class="auth-form">
          <h1>Регистрация</h1>
          <form class="form" action="" method="POST">
            <fieldset class="fieldset">
              <input
                class="input"
                type="text"
                name="email"
                value={email}
                onChange={onChangeEmail}
                placeholder="Введите email"
              />
            </fieldset>
            <fieldset class="fieldset">
              <input
                class="input"
                type="text"
                name="full_name"
                value={full_name}
                onChange={onChangeFullname}
                placeholder="Полное имя"
              />
            </fieldset>
            <fieldset class="fieldset">
              <input
                class="input"
                type="text"
                name="nickname"
                value={nickname}
                onChange={onChangeNickname}
                placeholder="Nickname"
              />
            </fieldset>
            <fieldset class="fieldset">
              <input
                class="input"
                type="password"
                name="password"
                value={password}
                onChange={onChangePassword}
                placeholder="Введите пароль"
              />
            </fieldset>
            <fieldset class="fieldset">
              <input
                class="input"
                type="password"
                name="password2"
                value={password1}
                onChange={onChangePassword1}
                placeholder="Подтвердить пароль"
              />
            </fieldset>

            <fieldset class="fieldset">
              <div className="button" onClick={toRegister}>
                Зарегистрироваться
              </div>
            </fieldset>
          </form>
        </div>
      </section>
    </div>
  );
}
