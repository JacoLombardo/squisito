import NavBar from "@/components/NavBar";
import { Product } from "@/types";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "@/styles/product-info.module.css";
import { CartContext } from "@/contexts/CartContext";
import Counter from "@/components/Counter";
import { Button } from "react-bootstrap";
import { ProductContext } from "@/contexts/ProductContext";

export default function ProductInfo() {
  const [product, setProduct] = useState<Product>();
  const [variants, setVariants] = useState<Object>();
  const [actualVariant, setActualVariant] = useState<Product>();
  const [inCart, setInCart] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(1);
  const router = useRouter();

  const { cart, AddToCartContext, ModifyOrderContext } =
    useContext(CartContext);
  const { products, getProducts, getColorVariants, getVariants } =
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

  // const AddToCart = () => {
  //   if (actualVariant) {
  //     if (inCart) {
  //       if (counter > 0) {
  //         cart.filter(
  //           (item) => item.item.internal_id === actualVariant.internal_id
  //         )[0].number = counter;
  //       } else if (counter === 0) {
  //         setCart((current) =>
  //           current.filter((item) => {
  //             return item.item.internal_id !== actualVariant.internal_id;
  //           })
  //         );
  //         setInCart(false);
  //         setCounter(1);
  //       }
  //     } else {
  //       cart.push({
  //         number: counter,
  //         item: actualVariant,
  //       });
  //       setInCart(true);
  //     }
  //   }
  // };

  const AddToCart = () => {
    if (actualVariant) {
      AddToCartContext(actualVariant, counter);
      setInCart(true);
    }
  };

  const ModifyOrder = () => {
    if (actualVariant && counter === 0) {
      ModifyOrderContext(actualVariant, counter);
      setInCart(false);
      setCounter(1);
    } else if (actualVariant) {
      ModifyOrderContext(actualVariant, counter);
    }
  };

  useEffect(() => {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].item.internal_id === actualVariant?.internal_id) {
        setCounter(cart[i].number);
        setInCart(true);
        break;
      } else {
        setCounter(1);
        setInCart(false);
      }
    }
  }, [actualVariant]);

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
      {products && product && (
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
          <div className={styles.product_info}>
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
            <p>{product.description}</p>
            <div className={styles.product_info_counter}>
              <Counter
                counter={counter}
                setCounter={setCounter}
                inCart={inCart}
                setInCart={setInCart}
              />

              {inCart ? (
                <Button
                  variant="primary"
                  className={styles.product_button}
                  // onClick={AddToCart}
                  onClick={ModifyOrder}
                >
                  Modify Order
                </Button>
              ) : (
                <Button
                  variant="primary"
                  className={styles.product_button}
                  onClick={AddToCart}
                >
                  Add to Cart
                </Button>
              )}
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
