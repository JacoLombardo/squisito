/* eslint-disable react-hooks/exhaustive-deps */
import { CartContext } from "@/contexts/CartContext";
import styles from "@/styles/component.module.css";
import { CartItem, Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";

interface Props {
  actualVariant?: Product;
  page: string;
  item?: CartItem;
}

export default function Counter({ actualVariant, page, item }: Props) {
  const { cart, AddToCartContext, ModifyOrderContext, calculateTotal } =
    useContext(CartContext);

  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [showRemove, setShowRemove] = useState<boolean>(false);
  const [spin, setSpin] = useState<boolean>(false);
  const [reverse, setReverse] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(1);
  const [inCart, setInCart] = useState<boolean>(false);

  const AddToCart = () => {
    if (actualVariant) {
      setCounter(1);
      setShowRemove(false);
      setShowAdd(true);
      setTimeout(() => setShowAdd(false), 1000);
      setSpin(true);
      AddToCartContext(actualVariant, 1);
      setInCart(true);
    }
  };

  const increase = () => {
    setCounter((count: number) => count + 1);
    if (page === "cart" && item) {
      cart.filter(
        (cartItem) => cartItem.item.internal_id === item.item.internal_id
      )[0].number = counter + 1;
      calculateTotal(cart);
    } else if (actualVariant) {
      setShowRemove(false);
      setShowAdd(true);
      setSpin(true);
      setTimeout(() => setShowAdd(false), 1000);
      if (inCart) {
        ModifyOrderContext(actualVariant, counter + 1);
      } else {
        AddToCartContext(actualVariant, counter + 1);
        setInCart(true);
      }
    }
  };

  const decrease = () => {
    if (counter !== 0) {
      setCounter((count: number) => count - 1);
      if (item) {
        cart.filter(
          (cartItem) => cartItem.item.internal_id === item.item.internal_id
        )[0].number = counter - 1;
        calculateTotal(cart);
      } else if (actualVariant) {
        setShowAdd(false);
        setShowRemove(true);
        setReverse(true);
        setTimeout(() => setShowRemove(false), 1000);
        if (counter - 1 === 0) {
          ModifyOrderContext(actualVariant, counter - 1);
          setInCart(false);
        } else {
          ModifyOrderContext(actualVariant, counter - 1);
        }
      }
    }
  };

  useEffect(() => {
    if (actualVariant) {
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
    }
  }, [actualVariant]);

  useEffect(() => {
    if (item) {
      setCounter(item.number);
    }
  }, [item]);

  return (
    <>
      {(page === "product-info" || page === "product") && (
        <div
          style={
            page === "product"
              ? { position: "absolute", bottom: "15px" }
              : { position: "relative", bottom: "0px" }
          }
          className={styles.counter}
        >
          {inCart ? (
            <div>
              <Button
                variant="primary"
                className={styles.counter_button}
                onClick={decrease}
                style={{
                  backgroundColor: "white",
                }}
              >
                -
              </Button>

              <span className={styles.counter_output}>{counter}</span>
              <Button
                variant="primary"
                className={styles.counter_button}
                onClick={increase}
                style={{
                  backgroundColor: "white",
                }}
              >
                +
              </Button>
            </div>
          ) : (
            <div>
              <Button
                variant="primary"
                className={styles.counter_button}
                onClick={AddToCart}
                style={{
                  backgroundColor: "white",
                }}
              >
                Add to Cart
              </Button>
            </div>
          )}
          {inCart && (
            <Link href={`/cart`}>
              <div
                className={reverse ? `${styles.counter_icon_reverse}` : ""}
                onAnimationEnd={() => {
                  setReverse(false);
                }}
              >
                <Image
                  alt={`shopping cart`}
                  title={`Go to the shopping cart`}
                  src={`/Images/Icons/shopping-cart.png`}
                  width={25}
                  height={25}
                  className={spin ? `${styles.counter_icon}` : ""}
                  onAnimationEnd={() => {
                    setSpin(false);
                  }}
                />
              </div>
            </Link>
          )}
          {showAdd && <p className={styles.counter_message}>Added to Cart</p>}
          {showRemove && (
            <p className={styles.counter_message}>Removed from Cart</p>
          )}
        </div>
      )}
      {page === "cart" && (
        <div
          style={{ position: "relative", bottom: "0px" }}
          className={styles.counter}
        >
          <Button
            variant="primary"
            className={styles.counter_button}
            onClick={decrease}
            style={{
              backgroundColor: "white",
            }}
          >
            -
          </Button>
          <span className={styles.counter_output}>{counter}</span>
          <Button
            variant="primary"
            className={styles.counter_button}
            onClick={increase}
            style={{
              backgroundColor: "white",
            }}
          >
            +
          </Button>
        </div>
      )}
    </>
  );
}
