import { useNavigate } from "react-router-dom";
import logo from "../../image/logo.png"
import { checkExits, register } from "../../services/usersService";
import { generateToken } from "../../helpers/generateToken";
import "../Login/style.scss"
import { useEffect, useRef } from "react";
function Register() {
  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    const checkExitsEmail = await checkExits("email", email);

    if (checkExitsEmail.length > 0) {
      alert("Email đã tồn tại")
    } else {
      const options = {
        fullName: fullName,
        email: email,
        password: password,
        token: generateToken()
      }
      const response = await register(options);
      if (response) {
        navigate("/login")
        alert("Dki thanh cong")
      } else {
        alert("Đăng kí thất bại!")
      }
    }
  }

  return (
    <>
      <div className="login">
        <form onSubmit={handleSubmit} className="login__container">
          <div className="login__header">
            <img src={logo} />
            <p>Đăng kí</p>
          </div>
          <div className="login__main">
            <input ref={inputRef} type="text" placeholder="Nhập họ và tên" />
            <input type="email" placeholder="Nhập email" />
            <input type="password" placeholder="Nhập mật khẩu" />
            <button type="submit">Đăng nhập</button>
          </div>
        </form>
      </div>
    </>
  )
}
export default Register;