import React from 'react'
import { Helmet } from 'react-helmet'

const Home = () => {
  function head() {
    return (
      <Helmet>
        <title>React SSR Home</title>
        <meta property='og:title' content='React SSR Home' />
      </Helmet>
    )
  }

  return (
    <div className='center-align' style={{ marginTop: '200px' }}>
      {head()}
      <h3>Welcome</h3>
      <p>Check out these awesom features</p>
    </div>
  )
}

export default {
  component: Home,
}
