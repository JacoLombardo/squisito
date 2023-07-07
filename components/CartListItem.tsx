import { CartContext } from "@/contexts/CartContext";
import styles from "@/styles/cart.module.css";
import { CartItem } from "@/types";
import Image from "next/image";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Button } from "react-bootstrap";

interface Props {
  item: CartItem;
}

export default function CartListItem({ item }: Props) {
  const [counter, setCounter] = useState<number>(item.number);
  const { cart } = useContext(CartContext);

  const increase = () => {
    setCounter((count: number) => count + 1);
    cart.filter(
      (cartItem) => cartItem.item.internal_id === item.item.internal_id
    )[0].number = counter + 1;
  };

  const decrease = () => {
    if (counter > 1) {
      setCounter((count: number) => count - 1);
      cart.filter(
        (cartItem) => cartItem.item.internal_id === item.item.internal_id
      )[0].number = counter - 1;
    }
  };

  const moltiplicate = (itemCost: number, numberItems: number) => {
    return itemCost * numberItems;
  };

  return (
    <>
      <div className={styles.cart_item}>
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
        <p>{item.item.name}</p>
        <p>{item.item.color}</p>
        <div className={styles.counter_div}>
          <Button variant="primary" onClick={decrease}>
            -
          </Button>
          <span className={styles.counter_output}>{counter}</span>
          <Button variant="primary" onClick={increase}>
            +
          </Button>
        </div>
        <p>{moltiplicate(item.item.price, item.number)},00€</p>
      </div>
    </>
  );
}
