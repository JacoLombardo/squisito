import NavBar from "@/components/NavBar";
import { CartContext } from "@/contexts/CartContext";
import styles from "@/styles/cart.module.css";
import { CartItem } from "@/types";
import Image from "next/image";
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
                return (
                  <div key={index} className={styles.cart_item}>
                    <Image
                      alt={item.item.name}
                      title={item.item.name}
                      src={item.item.image}
                      width={0}
                      height={0}
                      className={styles.cart_image}
                      sizes="100vw"
                      // style={{ maxWidth: "100px", maxHeight: "auto" }}
                    />
                    <p>{item.item.name}</p>
                    <p>{item.item.color}</p>
                  </div>
                );
              })}
        </div>
        <div className={styles.costs}>
          <p>Costs</p>
        </div>
      </div>
    </>
  );
}
