/* eslint-disable react-hooks/exhaustive-deps */
import NavBar from "@/components/NavBar";
import ProductCard from "@/components/Product";
import { Product } from "@/types";
import { useContext, useEffect, useState } from "react";
import styles from "@/styles/product.module.css";
import { ProductContext } from "@/contexts/ProductContext";

export default function Products() {
  const [show, setShow] = useState<boolean>(false);
  const { products, getProducts, getVariants } = useContext(ProductContext);

  useEffect(() => {
    try {
      getProducts();
      setShow(true);
    } catch (error) {
      setShow(false);
    }
  }, []);
  return (
    <>
      <NavBar />
      <div className={styles.titleContainer}>
        <p className={styles.title}>Products</p>
      </div>
      <div className={styles.products_div}>
        {show &&
          products
            ?.filter((product) => product.type.includes("main"))
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
    </>
  );
}
