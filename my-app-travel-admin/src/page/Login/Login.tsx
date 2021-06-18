import React from 'react'
import './login.scss'
import { notification } from 'antd'
import { useHistory } from 'react-router-dom'
import { login } from '../../api/auth/index'
import GoogleLogin from 'react-google-login'
import { useDispatch } from 'react-redux'
import { setloading } from 'app/rootSlice'
const Login = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  return (
    <div className="login">
      <div className="login-google">
        <h1>Chào mừng bạn đến với VietTravelUet</h1>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/ha-uet-gateway.appspot.com/o/logo.png?alt=media"
          alt="logo"
        />
        <GoogleLogin
          clientId="246720995377-3e74s2pig3pjavqhd5snrni9oaitdlbd.apps.googleusercontent.com"
          buttonText="Sign in with Google"
          onSuccess={(res) =>
            login(
              res,
              () => history.goBack(),
              (loading) => dispatch(setloading(loading))
            )
          }
          onFailure={() =>
            notification.error({
              message: 'Lỗi đăng nhập với Google',
              description: 'Hãy kiểm tra lại tài khoản google của bạn',
            })
          }
          cookiePolicy={'single_host_origin'}
        />
      </div>
    </div>
  )
}

export default Login
