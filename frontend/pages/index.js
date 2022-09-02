import BlogHeader from "./header";
import Image from "next/dist/client/image";
import img1 from "../images/1.png";
import img2 from "../images/date.svg";
import img3 from "../images/visibility.svg";
import img4 from "../images/message.svg";
import img5 from "../images/forums.svg";
import img6 from "../images/person.svg";
import Link from "next/dist/client/link";
import { getCategories } from "../store/actions/categoriesAction";
import { getBlogs } from "../store/actions/blogAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// axios.defaults.headers.common['authorization'] = `Bearer ${localStorage.getItem('token')}`;
function parseJwt(token) {
  if (!token) {
    return;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}
function Index(props) {
  const [data, setData] = useState(null);
  const [blogs, setBlogs] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("token")) {
        setCurrentUser(parseJwt(localStorage.getItem("token")).id);
      }
    }
    props.getCategoriesAction();
    props.getBlogsAction();
  }, []);
  let blogRows = [];
  const blogList = () => {
    if (props.blogs) {
      for (let i of props.blogs) {
        const src1 = `http://blogserver.alikhankaliyev.site/${i.image}`;
        let certainTime = i.createdAt;
        let month = certainTime.getUTCMonth + 1;
        let day = certainTime.getUTCDay;
        let year = certainTime.getUTCFullYear;
        let date = day + "." + month + "." + year;
        let link;
        if (currentUser === i.user_id) {
          link = "/profile";
        } else {
          link = `/profile/${i.user_id}`;
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
              <Link href={link}>
                <a class="link">
                  <Image src={img6} />
                  {i.user.nickname}
                </a>
              </Link>
            </div>
          </div>
        );
      }
    }
  };
  blogList();
  const Categories = () => {
    let rows = [];
    if (props.categories) {
      for (let i of props.categories) {
        const href = `/category/${i.id}`;
        rows.push(
          <Link href={href}>
            <a className="list-item">{i.name}</a>
          </Link>
        );
      }
    }
    return (
      <div class="page-info">
        <div class="page-header">
          <h2>Категории</h2>
        </div>
        {rows}
      </div>
    );
  };
  return (
    <div>
      <BlogHeader />
      <section class="container page">
        <div class="page-content">
          <h2 class="page-title">Блоги по программированию</h2>
          <p class="page-desc">
            Популярные и лучшие публикации по программированию для начинающих и
            профессиональных программистов и IT-специалистов.
          </p>

          <div class="blogs">{blogRows}</div>
        </div>
        <Categories></Categories>
      </section>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getCategoriesAction: bindActionCreators(getCategories, dispatch),
  getBlogsAction: bindActionCreators(getBlogs, dispatch),
});
const mapStateToProps = (state) => ({
  categories: state.categoriesReducers.categories,
  blogs: state.blogsReducers.blogs,
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
