/* eslint-disable react-hooks/exhaustive-deps */
import NavBar from "@/components/NavBar";
import ProductCard from "@/components/Product";
import { Product } from "@/types";
import { useContext, useEffect } from "react";
import styles from "@/styles/product.module.css";
import { ProductContext } from "@/contexts/ProductContext";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import Link from "next/link";

export default function Products() {
  const { products, getProducts, getVariants, loader } =
    useContext(ProductContext);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <NavBar />
      {loader ? (
        <Loader />
      ) : (
        <div id="content">
          <div className={styles.titleContainer}>
            <p className={styles.title}>Products</p>
          </div>
          <div className={styles.products_div}>
            {products
              ?.filter((product: Product) => product.type.includes("main"))
              .map((product: Product, index: number) => {
                return (
                  <ProductCard
                    key={index}
                    product={product}
                    variants={getVariants(products, product)}
                  />
                );
              })}
          </div>
          <div
            className={`${styles.checkoutButton_div} ${styles.centerContent}`}
          >
            <Link href="/cart">
              <button className={styles.checkoutButton}>Checkout</button>
            </Link>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
