import React, { useEffect} from 'react'
import Layout from '../../layout/Main'
import { Link } from 'react-router-dom'
import './home.scss'
import { setTab } from 'app/rootSlice'
import { useDispatch } from 'react-redux'
import { checkLogin } from '../../api/auth/index'
import { useHistory } from 'react-router-dom'
import { checkShowActionHome } from '../../utils/checkActionHome'
const HomePage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    dispatch(setTab(0))
  }, [dispatch])

  useEffect(() => {
    async function testLogin() {
      await checkLogin(() => history.push('/dang-nhap'))
    }
    testLogin()
  })

  return (
    <Layout>
      <h1>QUẢN TRỊ HỆ THỐNG DU LỊCH VietTravelUet</h1>
      <div className="list-admin">
        {checkShowActionHome('Tour') && (
          <div className="item-admin">
            <i className="fas fa-plane-departure"></i>
            <Link to="/du-lich">Quản trị tour du lịch</Link>
          </div>
        )}
        {checkShowActionHome('Hotel') && (
          <div className="item-admin">
            <i className="fas fa-hotel"></i>
            <Link to="/khach-san">Quản trị khách sạn</Link>
          </div>
        )}
        {checkShowActionHome('Car') && (
          <div className="item-admin">
            <i className="fas fa-bus-alt"></i>
            <Link to="/theu-xe">Quản trị thêu xe</Link>
          </div>
        )}
        <div className="item-admin">
          <i className="fas fa-users"></i>
          <Link to="/nhan-su">Quản trị nhân sự</Link>
        </div>
        {checkShowActionHome('Order') && (
          <div className="item-admin">
            <i className="fas fa-bible"></i>
            <Link to="/hoa-don">Quản trị hóa đơn</Link>
          </div>
        )}
        {checkShowActionHome('News') && (
          <div className="item-admin">
            <i className="far fa-newspaper"></i>
            <Link to="/tin-tuc">Quản trị bài viết</Link>
          </div>
        )}
        {checkShowActionHome('System') && (
          <div className="item-admin">
            <i className="fas fa-cogs"></i>
            <Link to="/he-thong">Quản trị hệ thống</Link>
          </div>
        )}
        {checkShowActionHome('Introduce') && (
          <div className="item-admin">
            <i className="fab fa-node-js"></i>
            <Link to="/gioi-thieu">Giới thiệu công ty</Link>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default HomePage
