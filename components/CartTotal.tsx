import { CartContext } from "@/contexts/CartContext";
import styles from "@/styles/cart.module.css";
import { useContext } from "react";

interface Props {
  total: number;
}

export default function CartTotal({ total }: Props) {
  const { shipping } = useContext(CartContext);
  return (
    <>
      <div className={styles.total_div}>
        <p>Total:</p>
        <p>{total},00€</p>
        {total !== 0 && <p>{shipping},00€</p>}
        <br />
        {total !== 0 && <p>{total + shipping},00€</p>}
      </div>
    </>
  );
}
