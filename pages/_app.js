import React from 'react'
import "github-markdown-css";
import "primer-tooltips/build/build.css";
import '../css/app.css'
import '../css/github-markdown-css.css'
import '../css/advertisement.css'
import '../css/readme.css'
import '../css/tailwind.css'

import { DefaultSeo } from 'next-seo';
import Head  from 'next/head'

function MyApp(props) {
  const {Component, pageProps} = props;
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <meta charSet="utf-8"/>
        <meta name="referrer" content="origin-when-cross-origin"/>
        <meta httpEquiv="x-ua-compatible" content="ie=edge"/>
        <link href="https://fonts.googleapis.com/css?family=Karla:400,700" rel="stylesheet"/>
        <link rel="shortcut icon" href="/favicon.ico"/>
        <link rel="manifest" href="/manifest.json"/>
        <meta name="theme-color" content="#fec93e"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="#181f2c"/>
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-71724704-1"/>
      </Head>
      <DefaultSeo
        title="JS.coach"
        description="Manually curated list of packages for React, Webpack and others."
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://js.coach/',
          site_name: 'JS.coach',
          title: 'JS.coach',
          description: 'Manually curated list of packages for React, Webpack and others.'
        }}
        twitter={{
          handle: '@_jscoach',
          site: '@_jscoach',
          cardType: 'summary',
        }}
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp;
