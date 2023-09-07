/* eslint-disable react-hooks/exhaustive-deps */
import NavBar from "@/components/NavBar";
import { Product } from "@/types";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "@/styles/product-info.module.css";
import Counter from "@/components/Counter";
import { ProductContext } from "@/contexts/ProductContext";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";

export default function ProductInfo() {
  const [product, setProduct] = useState<Product>();
  const [variants, setVariants] = useState<Object>();
  const [actualVariant, setActualVariant] = useState<Product>();
  const router = useRouter();
  const { products, getProducts, getColorVariants, getVariants, loader } =
    useContext(ProductContext);

  const getProductById = (id: any) => {
    var requestOptions = {
      headers: new Headers(),
    };

    fetch(`/api/product-by-id?id=${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setProduct(result);
        setActualVariant(result);
        setVariants(getVariants(products, result));
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    const id = router.query.internal_id;
    if (products && id) {
      getProductById(id);
    }
  }, [products]);

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
          {product && (
            <div className={styles.product_info_div}>
              <Image
                alt={product.name}
                title={product.name}
                src={actualVariant ? actualVariant.image : product.image}
                width={0}
                height={0}
                className={styles.product_info_image}
                sizes="100vw"
              />
              <div>
                <h1>{product.name}</h1>
                <p>{product.price},00€</p>
                <p className={styles.instock}>IN STOCK</p>

                <div className={styles.product_info_colors}>
                  {variants &&
                    getColorVariants(variants).map(
                      (variant: Product, index: number) => (
                        <a
                          key={index}
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setActualVariant(variant);
                          }}
                        >
                          <Image
                            alt={`${variant.color}`}
                            title={`${variant.color}`}
                            src={`/Images/Colors/${variant.color}.png`}
                            width={25}
                            height={25}
                          />
                        </a>
                      )
                    )}
                </div>
                <br />
                <p>{product.description[0]}</p>
                <p>{product.description[1]}</p>
                <div className={styles.product_info_counter}>
                  <Counter actualVariant={actualVariant} page="product-info" />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <Footer />
    </>
  );
}
