import { CartProvider } from "@/contexts/CartContext";
import { ProductProvider } from "@/contexts/ProductContext";
import "bootstrap/dist/css/bootstrap.css";
import Head from "next/head";
import "../styles/global.css";

export default function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Images/Icons/favicon.png" sizes="any" />
        <title>Squisito Kitchen Appliances</title>
        <meta
          name="description"
          content="Fake-shop of high class kitchen appliances."
        />
        <meta property="og:image" content="/Images/Navbar/logo2.png" />
      </Head>
      <ProductProvider>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </ProductProvider>
    </>
  );
}
