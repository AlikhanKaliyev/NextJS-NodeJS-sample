import BlogHeader from "../header";
import Image from "next/image";
import Link from "next/dist/client/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  getBlog,
  getComments,
  addComment,
} from "../../store/actions/blogAction";
function parseJwt(token) {
  if (!token) {
    return;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}
function Blog(props) {
  const [token, setToken] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const [text, setText] = useState("");
  const [currentBlog, setCurrentBlog] = useState(null);
  useEffect(() => {
    // if(typeof window !== "undefined"){
    // if(localStorage.getItem('token')){
    setToken(localStorage.getItem("token"));
    // }
    // }
    props.getCommentsAction(id);
    props.getBlogAction(id);
  }, []);
  const onChangeText = (e) => {
    setText(e.target.value);
  };
  const blogInfo = props.blog.blog;
  let src1;
  let blog;
  const comments = [];

  const getComs = () => {
    if (blogInfo) {
      if (currentBlog === null) {
        setCurrentBlog(blogInfo.id);
      }
      src1 = `http://blogserver.alikhankaliyev.site/${blogInfo.image}`;
      blog = (
        <div class="blog-item">
          <Image src={src1} width="700px" height="371px" />

          <div class="blog-info">
            <span class="link">
              <img src="images/date.svg" alt="" />
              26.06.2020
            </span>
            <span class="link">
              <img src="images/visibility.svg" alt="" />
              21
            </span>
            <a class="link">
              <img src="images/message.svg" alt="" />4
            </a>
            <span class="link">
              <img src="images/forums.svg" alt="" />
              {blogInfo.category.name}
            </span>
            <a class="link">
              <img src="images/person.svg" alt="" />
              Nast1289
            </a>
          </div>

          <div class="blog-header">
            <h3>{blogInfo.title}</h3>
          </div>
          <p class="blog-desc">{blogInfo.text}</p>
        </div>
      );
    }
    if (props.comments) {
      for (let i of props.comments) {
        if (i && i.text && i.author) {
          comments.push(
            <div class="comment">
              <div class="comment-header">
                <img src="images/avatar.png" alt="" />
                {i.author.nickname}
              </div>
              <p>{i.text}</p>
            </div>
          );
        }
      }
    }
  };
  getComs();
  const sendComment = () => {
    props.addCommentAction({
      blog_id: currentBlog,
      text,
      user_id: parseJwt(token).id,
    });
    setText("");
    comments.push();
    props.getCommentsAction(currentBlog);
    getComs();
  };
  if (token) {
    return (
      <div>
        <BlogHeader />
        <section class="container page">
          <div class="page-content">
            <div class="blogs">{blog}</div>

            <div class="comments">
              <h2>{comments.length} комментария</h2>

              {comments}

              <span class="comment-add">
                <textarea
                  name=""
                  class="comment-textarea"
                  placeholder="Введит текст комментария"
                  value={text}
                  onChange={onChangeText}
                ></textarea>
                <button class="button" onClick={sendComment}>
                  Отправить
                </button>
              </span>
            </div>
          </div>
        </section>
      </div>
    );
  } else {
    return (
      <div>
        <BlogHeader />
        <section class="container page">
          <div class="page-content">
            <div class="blogs">{blog}</div>

            <div class="comments">
              <h2>{comments.length} комментария</h2>

              {comments}

              <span class="comment-warning">
                Чтобы оставить комментарий{" "}
                <Link href="/register">
                  <a>зарегистрируйтесь</a>
                </Link>{" "}
                , или{" "}
                <Link href="/login">
                  <a href="">войдите</a>
                </Link>{" "}
                в аккаунт.
              </span>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getBlogAction: bindActionCreators(getBlog, dispatch),
  getCommentsAction: bindActionCreators(getComments, dispatch),
  addCommentAction: bindActionCreators(addComment, dispatch),
});
const mapStateToProps = (state) => ({
  blog: state.blogsReducers.blog,
  comments: state.blogsReducers.comments,
});
export default connect(mapStateToProps, mapDispatchToProps)(Blog);
