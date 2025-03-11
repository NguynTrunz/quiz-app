import { NavLink } from "react-router-dom";
import "./style.scss"
import { getCookie } from "../../helpers/cookie";
import { useSelector } from "react-redux"
function Home() {

  const token = getCookie("token")
  const isLogin = useSelector(state => state.loginReducer)

  return (
    <>
      <div className="home">
        {token && (
          <>
            <h3>Chúc mừng bạn đã đăng nhập thành công!</h3>
            <div className="home__button">
              <NavLink to="/topic" className="home__button-topic">Danh sách chủ đề ôn luyện</NavLink>
              <NavLink to="/answers" className="home__button-answers">Danh sách bài đã luyện tập</NavLink>
            </div>
            <hr></hr>
          </>
        )}
        <p>Website trắc nghiệm online lập trình Frontend là một nền tảng trực tuyến cho phép các lập trình viên Frontend thực hiện các bài kiểm tra, trắc nghiệm, đánh giá và đo đạc kiến thức của mình
          trong lĩnh vực lập trình Frontend.
        </p>
        <p> Đối với các lập trình viên Frontend, website trắc nghiệm online
          cung cấp các bài kiểm tra để giúp họ nâng cao kiến thức và kỹ năng của mình trong các công nghệ và công cụ lập trình như HTML CSS, JavaScript, jQuery, Bootstrap, Angular, React, Vue...
        </p>
      </div>
    </>
  )
}
export default Home;