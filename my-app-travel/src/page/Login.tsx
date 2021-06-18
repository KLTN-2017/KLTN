import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'
import FormLogin from './components/login/FormLogin'
import FormRegister from './components/login/FormRegister'
import './style/login.scss'
const Login = () => {
  const history = useHistory()
  const [status, setStatus] = useState<'login' | 'register' | 'forgot'>('login')
  const container = status === 'login' ? <FormLogin /> : (status === 'register' ? <FormRegister /> : '')
  const loginOrregister = () =>{
    status === 'login' ? setStatus('register') : setStatus('login')
  }
  return (
    <div className="login">
      <div className="login-container">
        <i
          onClick={() => history.goBack()}
          className="fas fa-long-arrow-alt-left"
        ></i>
        {container}
        <div className="button-forget-register">
          <button
            onClick={loginOrregister}>
            {status ==='register' ? 'Đăng nhập' : 'Đăng ký'}
          </button>
          <button>Quên mật khẩu</button>
        </div>
      </div>
    </div>
  )
}

export default Login
