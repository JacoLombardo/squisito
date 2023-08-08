import { CartContext } from "@/contexts/CartContext";
import styles from "@/styles/cart.module.css";
import { useContext } from "react";
import { Button } from "react-bootstrap";

interface Props {
  total: number;
}

export default function CartTotal({ total }: Props) {
  const { shipping } = useContext(CartContext);
  return (
    <>
      <div>
        <div className={styles.total_div}>
          <div>
            <h6>Subtotal:</h6>
            <p>{total},00€</p>
          </div>
          <div>
            <h6>Shipping:</h6>
            {total !== 0 && <p>{shipping},00€</p>}
          </div>
          <br />
          <div>
            <h4>Total:</h4>
            {total !== 0 && <p>{total + shipping},00€</p>}
          </div>
          <br />
          <Button className={styles.checkout_button}>Proceed to payment</Button>
        </div>
      </div>
    </>
  );
}
