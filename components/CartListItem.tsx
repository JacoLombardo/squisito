import { CartContext } from "@/contexts/CartContext";
import styles from "@/styles/cart.module.css";
import { CartItem } from "@/types";
import Image from "next/image";
import { useContext } from "react";
import Counter from "./Counter";

interface Props {
  item: CartItem;
}

export default function CartListItem({ item }: Props) {
  const { cart, setCart, calculateTotal } = useContext(CartContext);

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
        <div className={styles.counter_div}>
          <Counter page="cart" item={item} />
        </div>
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
        </div>
        <p style={{ textAlign: "right" }}>
          {moltiplicate(item.item.price, item.number)},00€
        </p>
        <div style={{ position: "relative" }}>
          <a
            onClick={removeItem}
            className={styles.remove_item}
            title="Remove from cart"
          >
            ✕
          </a>
        </div>
      </div>
      <hr />
    </>
  );
}
