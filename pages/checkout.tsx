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
    <div className={`${styles.checkout_container} mt-5 d-flex align-items-center justify-content-center`}>
      <div className="col-md-4">
        {show ? (
          <Form>
            <Form.Label className={styles.checkout_title}>
              <h1>Finish your order</h1>
            </Form.Label>
            <br />
            <br />
            <Form.Group className="" controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="firstName"
                placeholder="Enter first Name"
                value={firstName}
                onChange={onChange}
              />
              {error ? (
                <Form.Text style={{ color: "red" }}>
                  🚨 You must fill in a first Name
                </Form.Text>
              ) : (
                <br />
              )}
            </Form.Group>

            <Form.Group className="mb-1" controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="lastName"
                placeholder="Enter last Name"
                ref={lastName}
              />
              <br />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your Email"
                ref={email}
              />
              <br />
            </Form.Group>
        <div className={`${styles.checkout_div} d-flex justify-content-center`}>
            <Button
              className={styles.checkout_button}
              variant="primary"
              onClick={proceed}
            >
              Order Now
            </Button>
            </div>
          </Form>
        ) : (
          <div className={`${styles.thanks_div} text-center`}>
            <h1>Thank you for your purchase, {firstName}! 🪅</h1>
            <p>We will send your order confirmation via Email.</p>
          </div>
        )}

        <br />
        <br />
        <br />
        <Link className={`${styles.goback} d-block text-center`} href="/">← Back to Homepage</Link>
      </div>
    </div>
  );
}
