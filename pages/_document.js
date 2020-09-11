import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)

    return { ...initialProps }
  }

  render () {
    return (
      <Html lang="en" className="bg-white">
      <Head/>
      <body className="overflow-x-hidden">
      <Main/>
      <NextScript/>
      </body>
      </Html>
    )
  }
  }
