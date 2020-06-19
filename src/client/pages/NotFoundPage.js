import React from 'react'
import { Helmet } from 'react-helmet'

const NotFoundPage = ({ staticContext = {} }) => {
  function head() {
    return (
      <Helmet>
        <title>Not Found Page</title>
        <meta property='og:title' content='Not Found Page' />
      </Helmet>
    )
  }

  staticContext.notFound = true
  return (
    <div>
      {head()}
      <h1>Ooops, route not found.</h1>
    </div>
  )
}

export default {
  component: NotFoundPage,
}
