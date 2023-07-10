/* eslint-disable react-hooks/exhaustive-deps */
import { Product } from "@/types";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Counter from "./Counter";
import { CartContext } from "@/contexts/CartContext";
import styles from "@/styles/product.module.css";

interface Props {
  product: Product;
  variants: object;
}

export default function ProductCard({ product, variants }: Props) {
  const [actualVariant, setActualVariant] = useState<Product>(product);
  const [inCart, setInCart] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(1);
  const { cart, setCart } = useContext(CartContext);
  const colorVariants = Object.entries(variants)[0][1];

  const AddToCart = () => {
    if (inCart) {
      if (counter > 0) {
        cart.filter(
          (item) => item.item.internal_id === actualVariant.internal_id
        )[0].number = counter;
      } else if (counter === 0) {
        setCart((current) =>
          current.filter((item) => {
            return item.item.internal_id !== actualVariant.internal_id;
          })
        );
        setInCart(false);
        setCounter(1);
      }
    } else {
      cart.push({
        number: counter,
        item: actualVariant,
      });
      setInCart(true);
    }
  };

  useEffect(() => {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].item.internal_id === actualVariant.internal_id) {
        setCounter(cart[i].number);
        setInCart(true);
        break;
      } else {
        setCounter(1);
        setInCart(false);
      }
    }
  }, [actualVariant]);
return (
    <>
      <Card className={styles.product_card}>
        <div className={styles.product_img_div}>
          <Card.Img
            variant="top"
            src={actualVariant.image}
            className={styles.product_img}
          />
        </div>
        <Card.Header className={styles.product_header}>
          {colorVariants.map((variant: Product, index: number) => (
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
          ))}
        </Card.Header>
        <Card.Body className={styles.card_body}>
          <Card.Title>{actualVariant.name}</Card.Title>
          <Card.Subtitle>{actualVariant.price},00€</Card.Subtitle>
          <p className={styles.instock}>IN STOCK</p>
          {/* <p>Color: {actualVariant.color}</p> */}
          {/* <Card.Text>{actualVariant.description}</Card.Text> */}
            <Counter
              counter={counter}
              setCounter={setCounter}
              inCart={inCart}
              setInCart={setInCart}
            />

            {inCart ? (
              <Button variant="primary" className={styles.product_button} onClick={AddToCart}>
                Modify Order
              </Button>
            ) : (
              <Button variant="primary" className={styles.product_button} onClick={AddToCart}>
                Add to Cart
              </Button>
            )}
        </Card.Body>
      </Card>
    </>
  );
}
