import { Product } from "@/types";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Counter from "./Counter";
import { CartContext } from "@/contexts/CartContext";

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
  // console.log("product", product);
  // console.log("variants", variants);
  // console.log("colorVariants", colorVariants);
  // console.log("actualVariant", actualVariant);

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
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={actualVariant.image} />
        <Card.Header>
          {colorVariants.map((variant: Product, index: number) => {
            return (
              <a
                key={index}
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
            );
          })}
        </Card.Header>
        <Card.Body>
          <Card.Title>{actualVariant.name}</Card.Title>
          <Card.Subtitle>{actualVariant.price},00€</Card.Subtitle>
          <p>IN STOCK</p>
          <p>Color: {actualVariant.color}</p>
          <Card.Text>{actualVariant.description}</Card.Text>

          <Card.Footer
            style={{
              display: "flex",
            }}
          >
            <Counter
              counter={counter}
              setCounter={setCounter}
              inCart={inCart}
              setInCart={setInCart}
            />

            {inCart ? (
              <Button variant="primary" onClick={AddToCart}>
                Modify order
              </Button>
            ) : (
              <Button variant="primary" onClick={AddToCart}>
                Add to the cart
              </Button>
            )}
          </Card.Footer>
        </Card.Body>
      </Card>
    </>
  );
}
