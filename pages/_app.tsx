import "bootstrap/dist/css/bootstrap.css";
import Head from "next/head";

export default function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
