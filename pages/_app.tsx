import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from 'next/head'
import Layout from "./../components/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
       <Head>
         <title>Trinks rollbacks</title>
         <meta name="viewport" content="initial-scale=1.0, width=device-width" />
       </Head>
       <Layout>
         <Component {...pageProps} />
       </Layout>
    </>
  );
}
export default MyApp;
