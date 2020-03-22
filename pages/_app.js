import React from 'react'
import "github-markdown-css";
import "primer-tooltips/build/build.css";
import "react-simple-dropdown/styles/Dropdown.css";
import '../css/tailwind.css'
import '../css/app.css'
import '../css/advertisement.css'
import '../css/readme.css'

function MyApp(props) {
  const {Component, pageProps} = props;
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp;
