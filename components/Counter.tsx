import styles from "@/styles/counter.module.css";
import { Button } from "react-bootstrap";

interface Props {
  counter: number;
  setCounter: any;
}

export default function Counter({ counter, setCounter }: Props) {
  const increase = () => {
    setCounter((count: number) => count + 1);
  };

  const decrease = () => {
    if (counter > 1) {
      setCounter((count: number) => count - 1);
    }
  };
  return (
    <>
      <div className={styles.counter}>
        <Button variant="primary" onClick={decrease}>
          -
        </Button>
        <span className={styles.counter_output}>{counter}</span>
        <Button variant="primary" onClick={increase}>
          +
        </Button>
      </div>
    </>
  );
}
