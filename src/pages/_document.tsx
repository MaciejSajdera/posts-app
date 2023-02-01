import ErrorBoundary from "@/common/components/ErrorBoundary";

import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <ErrorBoundary>
        <body>
          <Main />
          <NextScript />
        </body>
      </ErrorBoundary>
    </Html>
  );
}
