import NavBar from "@/components/NavBar";
import getProductById from "../api/product-by-id";
import { Product } from "@/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "@/styles/product-info.module.css";

export default function ProductInfo() {
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const router = useRouter();

  const getProductById = (internal_id: any) => {
    console.log("ciao2");
    var requestOptions = {
      headers: new Headers(),
    };

    fetch(`/api/product-by-id?id=${internal_id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setProduct(result);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    const id = router.query.internal_id;
    getProductById(id);
  }, [router.query]);
  return (
    <>
      <NavBar />
      {product && (
        <div>
          <h1 style={{ textAlign: "center" }}>{product.name}</h1>
          <div className={styles.product_info_div}>
            <Image
              alt={product.name}
              title={product.name}
              src={product.image}
              width={0}
              height={0}
              className={styles.product_info_image}
              sizes="100vw"
            />
            <div className={styles.product_info}>
              <p>{product.price},00€</p>
              <p>Color: {product.color}</p>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// export async function getServerSideProps() {
//   try {
//     const product: Product | undefined = await getProductById();
//     // const stringList: string = JSON.stringify(list);
//     return {
//       props: {
//         product,
//       },
//     };
//   } catch (error) {
//     console.log(error);
//   }
// }
