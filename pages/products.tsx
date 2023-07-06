import NavBar from "@/components/NavBar";
import ProductCard from "@/components/Product";
import { Product } from "@/types";
import { useEffect, useState } from "react";
import styles from "@/styles/homepage.module.css";

export default function Products() {
  const [show, setShow] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[] | null | void>(null);
  const [filteredProducts, setFilteredProducts] = useState<Object | null>(null);

  const filterProducts = (products: Product[]) => {
    const groupByCategory = products.reduce((group: any, product: Product) => {
      const { name } = product;
      group[name] = group[name] ?? [];
      group[name].push(product);
      return group;
    }, {});
    console.log(groupByCategory);
    return groupByCategory;
  };

  const getProducts = () => {
    var requestOptions = {
      headers: new Headers(),
    };

    fetch("/api/getProducts", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
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
      <p className={styles.title}>Products</p>
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
