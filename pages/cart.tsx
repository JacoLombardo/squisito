/* eslint-disable react-hooks/exhaustive-deps */
import CartListItem from "@/components/CartListItem";
import CartTotal from "@/components/CartTotal";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import NavBar from "@/components/NavBar";
import { CartContext } from "@/contexts/CartContext";
import styles from "@/styles/cart.module.css";
import { CartItem } from "@/types";
import Link from "next/link";
import { useContext, useEffect } from "react";

export default function ShoppingCart() {
  const { cart, calculateTotal, total, loader } = useContext(CartContext);

  useEffect(() => {
    calculateTotal(cart);
  }, []);

  return (
    <>
      <NavBar />
      {loader ? (
        <Loader />
      ) : (
        <div id="content">
          <p className={styles.title}>Your Shopping Cart</p>
          {cart.length === 0 ? (
            <div>
              <br />
              <br />
              <p style={{ textAlign: "center", fontStyle: "oblique" }}>
                There are no items in the cart yet.
              </p>
            </div>
          ) : (
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
              <CartTotal total={total} />
            </div>
          )}
          <Link className={styles.continueshopping} href="/products">
            ← Continue Shopping
          </Link>
        </div>
      )}
      <Footer />
    </>
  );
}
