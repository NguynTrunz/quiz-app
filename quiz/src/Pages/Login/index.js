import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "../../image/logo.png"
import { login } from "../../services/usersService";
import "./style.scss"
import { setCookie } from "../../helpers/cookie";
import { checkLogin } from "../../actions/login";
import { useEffect, useRef } from "react";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef();
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    const response = await login(email, password);
    if(response.length > 0){
      setCookie("id",response[0].id, 1);
      setCookie("fullName", response[0].fullName, 1);
      setCookie("email", response[0].email, 1);
      setCookie("token", response[0].token, 1);
      dispatch(checkLogin(true));
      navigate("/")
    }else{
      alert("sai tk hoac mk")
    }
  }
  return (
    <>
    <div className="login">
      <form onSubmit={handleSubmit} className="login__container">
        <div className="login__header">
          <img src={logo} />
          <p>Đăng nhập</p>
        </div>
        <div className="login__main">
          <input ref={inputRef} type="email" placeholder="Nhập email" />
          <input type="password" placeholder="Nhập mật khẩu" />
          <button type="submit">Đăng nhập</button>
        </div>
      </form>
    </div>
      
    </>
  )
}
export default Login;