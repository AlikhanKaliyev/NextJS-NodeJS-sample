import BlogHeader from "./header";
import Link from "next/dist/client/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCategories } from "../store/actions/categoriesAction";
import Router from "next/router";
import { useRouter } from "next/router";
function parseJwt(token) {
  if (!token) {
    return;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}
function AddBlog(props) {
  // const [currentUser,setCurrentUser] = useState(null);
  // setCurrentUser(localStorage.getItem('token').id)
  const router = useRouter();
  const [data, setData] = useState(null);
  const [category, setCategory] = useState(3);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const fileSelectedHandler = (e) => {
    setFile(e.target.files[0]);
  };
  const onChangeText = (e) => {
    setText(e.target.value);
  };
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeCategory = (e) => {
    setCategory(e.target.value);
    console.log(category);
  };
  useEffect(() => {
    props.getCategoriesAction();
  }, []);
  const createBlog = () => {
    let formData = new FormData();
    formData.append("image", file);
    formData.append("user_id", parseJwt(localStorage.getItem("token")).id);
    formData.append("category_id", category);
    formData.append("text", text);
    formData.append("title", title);
    axios({
      url: "http://blogserver.alikhankaliyev.site/api/blogs",
      method: "POST",
      data: formData,
    }).then((res) => {
      console.log(res.data);
    });
    router.push("/profile");
  };
  let rows = [];
  if (props.categories) {
    for (let i of props.categories) {
      rows.push(<option value={i.id}> {i.name}</option>);
    }
    return (
      <div>
        <BlogHeader></BlogHeader>
        <section class="container page">
          <div class="page-block">
            <div class="page-header">
              <h2>Новый блог</h2>
            </div>

            <form class="form">
              <fieldset class="fieldset">
                <input
                  class="input"
                  type="text"
                  name="title"
                  placeholder="Заголовок"
                  value={title}
                  onChange={onChangeTitle}
                />
              </fieldset>

              <fieldset class="fieldset">
                <select
                  name="category_id"
                  id=""
                  class="input"
                  value={category}
                  onChange={onChangeCategory}
                >
                  {rows}
                </select>
              </fieldset>

              <fieldset class="fieldset">
                <button class="button button-yellow input-file">
                  <input
                    type="file"
                    name="image"
                    onChange={fileSelectedHandler}
                  />
                  Выберите картинку
                </button>
              </fieldset>

              <fieldset class="fieldset">
                <textarea
                  class="input input-textarea"
                  name="description"
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="Описание"
                  onChange={onChangeText}
                  value={text}
                ></textarea>
              </fieldset>
              <fieldset class="fieldset">
                <div className="button" onClick={createBlog}>
                  Сохранить
                </div>
              </fieldset>
            </form>
          </div>
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCategoriesAction: bindActionCreators(getCategories, dispatch),
});
const mapStateToProps = (state) => ({
  categories: state.categoriesReducers.categories,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBlog);
