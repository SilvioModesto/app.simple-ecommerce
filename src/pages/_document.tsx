import { Html, Head, Main, NextScript } from 'next/document'

const bodyStyle = {
  padding: 0,
  margin: 0,
};

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body style={bodyStyle}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
