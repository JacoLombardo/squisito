/* eslint-disable react-hooks/exhaustive-deps */
import NavBar from "@/components/NavBar";
import ProductCard from "@/components/Product";
import { Product } from "@/types";
import { useContext } from "react";
import styles from "@/styles/product.module.css";
import { ProductContext } from "@/contexts/ProductContext";
import getProducts from "./api/get-products";

export default function Products({
  stringProducts,
}: {
  stringProducts: string;
}) {
  const { getVariants } = useContext(ProductContext);
  const products = JSON.parse(stringProducts);

  return (
    <>
      <NavBar />
      <div className={styles.titleContainer}>
        <p className={styles.title}>Products</p>
      </div>
      <div className={styles.products_div}>
        {products
          ?.filter((product: any) => product.type.includes("main"))
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

export async function getServerSideProps() {
  try {
    const products = await getProducts();
    const stringProducts: string = JSON.stringify(products);
    return {
      props: {
        stringProducts,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
