import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "@/styles/cart.module.css";

export default function Checkout() {
  const [show, setShow] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const lastName = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);

  const proceed = () => {
    setError(false);
    if (firstName === "") {
      setError(true);
    } else {
      setShow(false);
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
    <>
      <div className={styles.checkout_div}>
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
                placeholder="Enter first name"
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
                placeholder="Enter last name"
                ref={lastName}
              />
              <br />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                ref={email}
              />
              <br />
            </Form.Group>

            <Button
              style={{ width: "100px" }}
              className={styles.checkout_button}
              variant="primary"
              onClick={proceed}
            >
              Proceed
            </Button>
          </Form>
        ) : (
          <div className={styles.thanks_div}>
            <h1>Thank you for your purchase, {firstName}!</h1>
            <p>The order will be shipped soon :)</p>
          </div>
        )}

        <br />
        <br />
        <br />
        <Link href="/">Go back to the homepage</Link>
      </div>
    </>
  );
}
