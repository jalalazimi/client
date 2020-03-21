import React from 'react'
import App from 'next/app'
import '../css/tailwind.css'
import '../css/app.css'

class MyApp extends App {
  render() {
    const {Component, pageProps, store} = this.props;
    return (
      <>
        <Component {...pageProps} />
      </>
    )
  }
}

export default MyApp;
