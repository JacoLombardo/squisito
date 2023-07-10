import styles from "@/styles/component.module.css";
import { Dispatch, SetStateAction } from "react";
import { Button } from "react-bootstrap";

interface Props {
  counter: number;
  setCounter: Dispatch<SetStateAction<number>>;
  inCart: boolean;
  setInCart: Dispatch<SetStateAction<boolean>>;
}

export default function Counter({
  counter,
  setCounter,
  inCart,
  setInCart,
}: Props) {
  const increase = () => {
    setCounter((count: number) => count + 1);
  };

  const decrease = () => {
    if (inCart && counter > 0) {
      setCounter((count: number) => count - 1);
    } else if (!inCart && counter > 1) {
      setCounter((count: number) => count - 1);
    }
    // if (counter > 1) {
    //   setCounter((count: number) => count - 1);
    // }
  };
  return (
    <>
      <div className={styles.counter}>
        <Button variant="primary" className={styles.product_button} onClick={decrease}>
          -
        </Button>
        <span className={styles.counter_output}>{counter}</span>
        <Button variant="primary" className={styles.product_button} onClick={increase}>
          +
        </Button>
      </div>
    </>
  );
}
