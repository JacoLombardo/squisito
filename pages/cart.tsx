import CartListItem from "@/components/CartListItem";
import Costs from "@/components/Costs";
import NavBar from "@/components/NavBar";
import { CartContext } from "@/contexts/CartContext";
import styles from "@/styles/cart.module.css";
import { CartItem } from "@/types";
import { useContext } from "react";

export default function ShoppingCart() {
  const { cart, setCart } = useContext(CartContext);

  return (
    <>
      <NavBar />
      <p className={styles.title}>Shopping Cart</p>
      <div className={styles.shopping_cart}>
        <div className={styles.item_list}>
          <p>Items</p>
          {cart &&
            cart
              .sort((a, b) => a.item.internal_id - b.item.internal_id)
              .map((item: CartItem, index: number) => {
                return <CartListItem key={index} item={item} />;
              })}
        </div>
        <div className={styles.costs}>
          <Costs />
        </div>
      </div>
    </>
  );
}
