import React, { useState } from 'react'
import './style/checkCode.scss'
import {checkCode } from '../api/auth/index'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router'
const CheckCode = () => {
    const [code, setCode] = useState<string>('')
    const history = useHistory()
    const checkCodeUser = async () => {
        if (!code) toast.warn('Bạn chưa nhập mã code')
        else await checkCode(code, ()=> history.push('/login'))

    }
    return <div className="check-code">
        <h1>Check code để kích hoạt tài khoản của bạn</h1>
        <input
            value={code}
            placeholder="Enter code"
            onChange={(e)=> setCode(e.target.value)}
        />
        <button onClick={checkCodeUser}>Submit</button>
    </div>
}
export default CheckCode