import { CartProvider } from "@/contexts/CartContext";
import { ProductProvider } from "@/contexts/ProductContext";
import "bootstrap/dist/css/bootstrap.css";
import Head from "next/head";

export default function MyApp({ Component, pageProps }: any) {
  return (
    <div style={{ backgroundColor: "#fefdf4" }}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ProductProvider>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </ProductProvider>
    </div>
  );
}
