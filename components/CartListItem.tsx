import { CartContext } from "@/contexts/CartContext";
import styles from "@/styles/cart.module.css";
import { CartItem } from "@/types";
import Image from "next/image";
import { useContext, useState } from "react";
import { Button } from "react-bootstrap";

interface Props {
  item: CartItem;
  calculateTotal: Function;
}

export default function CartListItem({ item, calculateTotal }: Props) {
  const [counter, setCounter] = useState<number>(item.number);
  const { cart, setCart } = useContext(CartContext);

  const increase = () => {
    setCounter((count: number) => count + 1);
    cart.filter(
      (cartItem) => cartItem.item.internal_id === item.item.internal_id
    )[0].number = counter + 1;
    calculateTotal(cart);
  };

  const decrease = () => {
    if (counter > 1) {
      setCounter((count: number) => count - 1);
      cart.filter(
        (cartItem) => cartItem.item.internal_id === item.item.internal_id
      )[0].number = counter - 1;
      calculateTotal(cart);
    }
  };

  const moltiplicate = (itemCost: number, numberItems: number) => {
    return itemCost * numberItems;
  };

  const removeItem = () => {
    setCart((current) =>
      current.filter((cartItem: CartItem) => {
        return cartItem.item.internal_id !== item.item.internal_id;
      })
    );
    let preCart = cart.filter(
      (cartItem) => cartItem.item.internal_id !== item.item.internal_id
    );
    calculateTotal(preCart);
  };

  return (
    <>
      <div className={styles.cart_item}>
        <div className={styles.cart_item_info}>
          <div className={styles.cart_image_div}>
            <Image
              alt={item.item.name}
              title={item.item.name}
              src={item.item.image}
              width={0}
              height={0}
              className={styles.cart_image}
              sizes="100vw"
            />
          </div>
          <p>
            {item.item.name}&nbsp;{item.item.color}
          </p>
          <div className={styles.counter_div}>
            <Button variant="primary" onClick={decrease}>
              -
            </Button>
            <span className={styles.counter_output}>{counter}</span>
            <Button variant="primary" onClick={increase}>
              +
            </Button>
            <a onClick={removeItem} className={styles.remove_item}>
              Remove item
            </a>
          </div>
        </div>

        <p style={{ textAlign: "right" }}>
          {moltiplicate(item.item.price, item.number)},00€
        </p>
      </div>
    </>
  );
}
