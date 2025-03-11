import { NavLink, Outlet } from "react-router-dom";
import logo from "../../image/logo.png"
import "./style.scss"
import { getCookie } from "../../helpers/cookie";
import { useSelector } from "react-redux"
function LayoutDefault() {
  const navLinkActive = (e) => {
    return e.isActive ? "layout-default__function--active" : "layout-default__function";
  }

  const token = getCookie("token")
  const isLogin = useSelector(state => state.loginReducer)
  console.log(isLogin)
  return (
    <>
      <header className="layout-default__header">
        <NavLink className="layout-default__logo" to="/">
          <img src={logo} />
        </NavLink>
        <div className="layout-default__function">
          <ul>
            <li>
              <NavLink to="/" className={navLinkActive}>
                Trang chủ
              </NavLink>
            </li>
            {token && (
              <>
                <li>
                  <NavLink to="/topic" className={navLinkActive}>
                    Chủ đề
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/answers" className={navLinkActive}>
                    Lịch sử luyện tập
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="layout-default__account">
          <ul>
            {token ? (
              <>
                <li>
                  <NavLink to="/logout" className={navLinkActive}>
                    Đăng xuất
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/login" className={navLinkActive}>
                    Đăng nhập
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/register" className={navLinkActive}>
                    Đăng kí
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </header>
      <main className="layout-default__main">
        <Outlet />
      </main>
      <footer className="layout-default__footer">
        Copyright @2025 trunn
      </footer>
    </>
  )
}
export default LayoutDefault;