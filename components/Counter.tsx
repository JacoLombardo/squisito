import { CartContext } from "@/contexts/CartContext";
import styles from "@/styles/component.module.css";
import { CartItem, Product } from "@/types";
import { Dispatch, SetStateAction, useContext } from "react";
import { Button } from "react-bootstrap";

interface Props {
  actualVariant?: Product;
  counter: number;
  setCounter: Dispatch<SetStateAction<number>>;
  inCart?: boolean;
  setInCart?: Dispatch<SetStateAction<boolean>>;
  page: string;
  item?: CartItem;
}

export default function Counter({
  actualVariant,
  counter,
  setCounter,
  inCart,
  setInCart,
  page,
  item,
}: Props) {
  const { cart, AddToCartContext, ModifyOrderContext, calculateTotal } =
    useContext(CartContext);

  const AddToCart = () => {
    if (actualVariant && setInCart) {
      AddToCartContext(actualVariant, counter);
      setInCart(true);
    }
  };

  const ModifyOrder = () => {
    if (actualVariant && counter === 0 && setInCart) {
      ModifyOrderContext(actualVariant, counter);
      setInCart(false);
      setCounter(1);
    } else if (actualVariant) {
      ModifyOrderContext(actualVariant, counter);
    }
  };

  const increase = () => {
    if (page === "product") {
      setCounter((count: number) => count + 1);
    } else if (page === "cart" && item) {
      setCounter((count: number) => count + 1);
      cart.filter(
        (cartItem) => cartItem.item.internal_id === item.item.internal_id
      )[0].number = counter + 1;
      calculateTotal(cart);
    }
  };

  const decrease = () => {
    if (page === "product") {
      if (inCart && counter > 0) {
        setCounter((count: number) => count - 1);
      } else if (!inCart && counter > 1) {
        setCounter((count: number) => count - 1);
      }
    } else if (page === "cart" && item) {
      setCounter((count: number) => count - 1);
      cart.filter(
        (cartItem) => cartItem.item.internal_id === item.item.internal_id
      )[0].number = counter - 1;
      calculateTotal(cart);
    }
  };

  return (
    <>
      <div className={styles.counter}>
        <div>
          <Button
            variant="primary"
            className={styles.product_button}
            onClick={decrease}
          >
            -
          </Button>
          <span className={styles.counter_output}>{counter}</span>
          <Button
            variant="primary"
            className={styles.product_button}
            onClick={increase}
          >
            +
          </Button>
        </div>
        {page === "product" && (
          <div>
            {inCart ? (
              <Button
                variant="primary"
                className={styles.product_button}
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
        )}
      </div>
    </>
  );
}
