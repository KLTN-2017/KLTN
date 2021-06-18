import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import { userLogin, userLoginGoogle, userLoginFaceBook } from 'app/rootSlice'
import { toast } from 'react-toastify'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login'
import {useDispatch} from 'react-redux'
const FormLogin = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
  const history = useHistory()
  const dispatch = useDispatch()
    const login = async () => {
        if (email && password) await userLogin({ email, password }, () => history.goBack())
        else toast.warn('Bạn cần điền đủ thông tin')
    }
    return (
      <>
        <h1>Login</h1>

        <input
          type="text"
          name="email"
          placeholder="email..."
          value={email}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setEmail(e.currentTarget.value.trim())
          }
        />
        <input
          type="password"
          name="password"
          placeholder="Password..."
          value={password}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setPassword(e.currentTarget.value.trim())
          }
        />
        <button onClick={login}>Login</button>
        <div className="google-facebook">
          <GoogleLogin
            clientId="86608748460-v9v8o03gku4iqg907pc038ilvmid27l2.apps.googleusercontent.com"
            buttonText=""
            onSuccess={(res) =>
              dispatch(userLoginGoogle(res, () => history.goBack()))
            }
            onFailure={(res) => {
              toast.error('Lỗi đăng nhập với Google')
              console.log(res)
            }}
            cookiePolicy={'single_host_origin'}
          />
          <FacebookLogin
            size="small"
            appId="136388861783011"
            autoLoad={false}
            callback={(res) =>
              dispatch(userLoginFaceBook(res, () => history.goBack()))
            }
            cssClass="my-facebook-button-class"
            icon={<i className="fab fa-facebook-square" />}
            textButton=""
          />
        </div>
      </>
    )
}

export default FormLogin