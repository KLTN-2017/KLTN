import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { validateEmail } from '../../../utils/validateEmail'
import { register } from '../../../api/auth/index'
import { handleError } from 'utils/handleError'
import { useHistory } from 'react-router'
const FormRegister = () => {
  const [password, setPassword] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [repasswd, setRePasswd] = useState<string>('')
  const history = useHistory()
  const registerUser = () => {
    if (password && repasswd && email) {
      if (validateEmail(email)) {
        if (password === repasswd) {
          register({ email, passwd: password})
            .then((res) => {
              history.push('/check-code')
            })
            .catch((err) => handleError(err))
        } else toast.warn('Mật không không trùng')
      } else toast.warn('Email không đúng định dạng')
    } else toast.warn('Bạn cần điền đủ thông tin')
  }
  return (
    <>
      <h1>Register</h1>
      <input
        type="text"
        name="email"
        placeholder="Email..."
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
      <input
        type="password"
        name="confirm password"
        placeholder="Confirm password..."
        value={repasswd}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          setRePasswd(e.currentTarget.value.trim())
        }
      />
      <button onClick={registerUser}>Đăng ký</button>
    </>
  )
}

export default FormRegister
