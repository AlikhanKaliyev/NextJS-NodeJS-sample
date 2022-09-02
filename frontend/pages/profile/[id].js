import BlogHeader from "../header";
import Link from "next/dist/client/link";
import Image from "next/dist/client/image";
import img1 from "../../images/1.png";
import img2 from "../../images/date.svg";
import img3 from "../../images/visibility.svg";
import img4 from "../../images/message.svg";
import img5 from "../../images/forums.svg";
import img6 from "../../images/person.svg";
import img7 from "../../images/dots.svg";
import img8 from "../../images/avatar.png";
import { useState } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getBlogsByUser } from "../../store/actions/blogAction";
import { useEffect } from "react";
function Profile(props) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const { id } = router.query;

    props.getBlogsByUserAction(id);
    console.log(props);
  }, []);
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
  console.log(blogRows);
  return (
    <div>
      <BlogHeader />
      <section class="container page">
        <div class="page-content">
          <div class="page-header">Блоги пользователя {currentUser}</div>

          <div class="blogs">{blogRows}</div>
        </div>
        <div class="page-info">
          <div class="user-profile">
            <Image class="user-profile--ava" src={img8} alt="" />

            <h1>{currentUser}</h1>
            <h2>В основном пишу про веб - разработку, на React & Redux</h2>
            <p>{blogRows.length} постов за все время</p>
          </div>
        </div>
      </section>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getBlogsByUserAction: bindActionCreators(getBlogsByUser, dispatch),
});
const mapStateToProps = (state) => ({
  neededBlogs: state.blogsReducers.neededBlogs,
  blogs: state.blogsReducers.blogs,
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
