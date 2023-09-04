import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Link from "next/link";
import styles from "@/styles/cart.module.css";
import { CartContext } from "@/contexts/CartContext";

export default function Checkout() {
  const [show, setShow] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const lastName = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const { setCart } = useContext(CartContext);

  const proceed = () => {
    setError(false);
    if (firstName === "") {
      setError(true);
    } else {
      setShow(false);
      setCart([]);
    }
  };

  const onChange = (e: any) => {
    setFirstName(e.target.value);
  };

  useEffect(() => {
    if (firstName !== "") {
      setError(false);
    }
  }, [firstName]);

  return (
    <div className={`container ${styles.checkout_container} mt-5`}>
      <div className="row align-content-center">
        <div className="col-md-6">
          {show ? (
            <Form>
              <Form.Label className={styles.checkout_title}>
                Finish your order
              </Form.Label>
              <br />
              <br />
              <Form.Group className="mb-3" controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="firstName"
                  placeholder="Enter first Name"
                  value={firstName}
                  onChange={onChange}
                />
                {error ? (
                  <Form.Text style={{ color: "red" }}>
                    First name is mandatory
                  </Form.Text>
                ) : (
                  <br />
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="lastName"
                  placeholder="Enter last Name"
                  ref={lastName}
                />
                <br />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your Email"
                  ref={email}
                />
                <br />
              </Form.Group>

              <Button
                className={styles.checkout_button}
                variant="primary"
                onClick={proceed}
              >
                Order Now
              </Button>
            </Form>
          ) : (
            <div className={styles.thanks_div}>
              <h1>Thank you for your purchase, {firstName}! 🪅</h1>
              <p>We will send your order confirmation via Email.</p>
            </div>
          )}

          <br />
          <br />
          <br />
          <Link className={styles.goback} href="/">↲ Go back to Homepage</Link>
        </div>
      </div>
    </div>
  );
}
