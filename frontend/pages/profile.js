import BlogHeader from "./header";
import Link from "next/dist/client/link";
import Image from "next/dist/client/image";
import img1 from "../images/1.png";
import img2 from "../images/date.svg";
import img3 from "../images/visibility.svg";
import img4 from "../images/message.svg";
import img5 from "../images/forums.svg";
import img6 from "../images/person.svg";
import img7 from "../images/dots.svg";
import img8 from "../images/avatar.png";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getBlogsByUser, deleteBlog } from "../store/actions/blogAction";
function parseJwt(token) {
  if (!token) {
    return;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}
function Profile(props) {
  const router = useRouter();
  if (typeof window !== "undefined") {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }
  const [currentUser, setCurrentUser] = useState(null);
  const [link, setLink] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUser(parseJwt(localStorage.getItem("token")).nickname);
      console.log(localStorage.getItem("currentUserId"));
      props.getBlogsByUserAction(localStorage.getItem("currentUserId"));
      setLink(`/profile/${localStorage.getItem("currentUserId")}`);
    }
  }, []);
  const logOut = () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
  };
  let blogRows = [];
  const blogList = () => {
    if (props.neededBlogs) {
      for (let i of props.neededBlogs) {
        const src1 = `http://blogserver.alikhankaliyev.site/${i.image}`;
        let certainTime = i.createdAt;
        let month = certainTime.getUTCMonth + 1;
        let day = certainTime.getUTCDay;
        let year = certainTime.getUTCFullYear;
        let date = day + "." + month + "." + year;
        if (currentUser === null) {
          setCurrentUser(i.user.nickname);
        }
        let blogLink = `/blogs/${i.id}`;

        blogRows.push(
          <div class="blog-item">
            <Image
              class="blog-item--img"
              src={src1}
              width="700px"
              height="371px"
              alt=""
            />
            <div class="blog-header">
              <Link href={blogLink}>
                <h3> {i.title}</h3>
              </Link>
              <span class="link">
                <Image src={img7} alt="" />
                Еще
                <ul class="dropdown">
                  <li>
                    {" "}
                    <a href="">Редактировать</a>{" "}
                  </li>
                  <li>
                    <a
                      class="danger"
                      onClick={() => {
                        props.deleteBlogAction(i.id);
                      }}
                    >
                      Удалить
                    </a>
                  </li>
                </ul>
              </span>
            </div>
            <p class="blog-desc">{i.text}</p>

            <div class="blog-info">
              <span class="link">
                <Image src={img2} />
                {certainTime.substr(2, 2) +
                  "." +
                  certainTime.substr(5, 2) +
                  "." +
                  certainTime.substr(8, 2)}
              </span>
              <span class="link">
                <Image src={img3} />
                21
              </span>
              <a class="link">
                <Image src={img4} />4
              </a>
              <span class="link">
                <Image src={img5} />
                23
              </span>
              <a class="link">
                <Image src={img6} />
                {i.user.nickname}
              </a>
            </div>
          </div>
        );
      }
    }
  };
  blogList();
  return (
    <div>
      <BlogHeader />
      <section class="container page">
        <div class="page-content">
          <div class="page-header">
            <h2>Мои блоги</h2>

            <Link href="/addblog">
              <a class="button">Новый блог</a>
            </Link>
          </div>

          <div class="blogs">{blogRows}</div>
        </div>
        <div class="page-info">
          <div class="user-profile">
            <Image class="user-profile--ava" src={img8} alt="" />

            <h1>{currentUser}</h1>
            <h2>В основном пишу про веб - разработку, на React & Redux</h2>
            <p>{blogRows.length} постов за все время</p>
            <Link href={link}>
              <a class="button button-danger" onClick={logOut}>
                {" "}
                Выход
              </a>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => ({
  getBlogsByUserAction: bindActionCreators(getBlogsByUser, dispatch),
  deleteBlogAction: bindActionCreators(deleteBlog, dispatch),
});
const mapStateToProps = (state) => ({
  neededBlogs: state.blogsReducers.neededBlogs,
  blogs: state.blogsReducers.blogs,
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
