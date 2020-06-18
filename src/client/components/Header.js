import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Header = ({ auth }) => {
  // 登入、登出 api 因需要傳遞 cookie, 因此使用原生 a tag 來刷新頁面進到 server side, 使用 server side 的 axios 實例方法 call api
  const authButton = auth ? <a href='/api/logout'>Logout</a> : <a href='/api/auth/google'>Login</a>

  return (
    <nav>
      <div className='nav-wrapper'>
        <Link to='/' className='brand-logo'>
          React SSR
        </Link>
        <ul className='right'>
          <li>
            <Link to='/users'>Users</Link>{' '}
          </li>
          <li>
            <Link to='/admins'>Admins</Link>
          </li>
          <li>{authButton}</li>
        </ul>
      </div>
    </nav>
  )
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps)(Header)
