/* eslint-disable react-hooks/exhaustive-deps */
import CartListItem from "@/components/CartListItem";
import CartTotal from "@/components/CartTotal";
import NavBar from "@/components/NavBar";
import { CartContext } from "@/contexts/CartContext";
import styles from "@/styles/cart.module.css";
import { CartItem } from "@/types";
import { useContext, useEffect } from "react";

export default function ShoppingCart() {
  const { cart, calculateTotal, total } = useContext(CartContext);

  useEffect(() => {
    calculateTotal(cart);
  }, []);

  return (
    <>
      <NavBar />
      <p className={styles.title}>Shopping Cart</p>
      {cart.length === 0 ? (
        <p>There are no items in the cart</p>
      ) : (
        <div className={styles.shopping_cart}>
          <div className={styles.item_list}>
            <p>Items</p>
            {cart &&
              cart
                .sort((a, b) => a.item.internal_id - b.item.internal_id)
                .map((item: CartItem, index: number) => {
                  return (
                    <CartListItem
                      key={index}
                      item={item}
                      calculateTotal={calculateTotal}
                    />
                  );
                })}
          </div>
          <CartTotal total={total} />
        </div>
      )}
    </>
  );
}
