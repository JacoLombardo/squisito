import { CartContext } from "@/contexts/CartContext";
import { CartItem } from "@/types";
import { useContext, useEffect } from "react";

export default function Costs() {
  const { cart, setCart } = useContext(CartContext);

  const moltiplicate = (itemCost: number, numberItems: number) => {
    return itemCost * numberItems;
  };
  return (
    <>
      <p>Costs:</p>
      {cart &&
        cart
          .sort((a, b) => a.item.internal_id - b.item.internal_id)
          .map((item: CartItem, index: number) => {
            return (
              <p key={index}>
                {moltiplicate(item.item.price, item.number)},00€
              </p>
            );
          })}
    </>
  );
}
