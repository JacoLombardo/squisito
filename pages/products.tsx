/* eslint-disable react-hooks/exhaustive-deps */
import NavBar from "@/components/NavBar";
import ProductCard from "@/components/Product";
import { Product } from "@/types";
import { useContext, useEffect, useState } from "react";
import styles from "@/styles/product.module.css";
import { Button } from "react-bootstrap";
import { CartContext } from "@/contexts/CartContext";

export default function Products() {
  const [show, setShow] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[] | null | void>(null);
  const [filteredProducts, setFilteredProducts] = useState<Object | null>(null);
  const { cart } = useContext(CartContext);

  const filterProducts = (products: Product[]) => {
    const groupByCategory = products.reduce((group: any, product: Product) => {
      const { name } = product;
      group[name] = group[name] ?? [];
      group[name].push(product);
      return group;
    }, {});
    return groupByCategory;
  };

  const getProducts = () => {
    var requestOptions = {
      headers: new Headers(),
    };

    fetch("/api/get-products", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setProducts(result);
        setFilteredProducts(filterProducts(result));
        setShow(true);
      })
      .catch((error) => {
        console.log("error", error);
        setShow(false);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <NavBar />
      {/* <Button onClick={() => console.log(cart)}>Hello</Button> */}
      <div className={styles.titleContainer}>
        <p className={styles.title}>Products</p>
        </div>
      <div className={styles.products_div}>
        {show &&
          filteredProducts &&
          products
            ?.filter((product) => product.type.includes("main"))
            .map((product: Product, index: number) => {
              return (
                <ProductCard
                  key={index}
                  product={product}
                  variants={Object.fromEntries(
                    Object.entries(filteredProducts).filter(([key]) =>
                      key.includes(product.name)
                    )
                  )}
                />
              );
            })}
      </div>
    </>
  );
}
