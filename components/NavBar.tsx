import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/component.module.css";
import { useContext, useState } from "react";
import { CartContext } from "@/contexts/CartContext";

function NavBar() {
  const { cart } = useContext(CartContext);
  const [show, setShow] = useState<boolean>(false);
  return (
    <Navbar expand="lg" className={styles.navbar}>
      <Container>
        <Navbar.Brand as={Link} href="/">
          <Image
            alt="logo"
            title="the logo"
            src="https://res.cloudinary.com/dtl48kr1u/image/upload/v1694116269/fake-shop/logo2_drwmph.png"
            width="0"
            height="0"
            sizes="100vw"
            style={{ width: "120px", height: "auto" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className={styles.toggle}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`ml-auto ${styles.nav}`}>
            <Nav.Link as={Link} href="/" className={styles.nav_link}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} href="/products" className={styles.nav_link}>
              Products
            </Nav.Link>
            {cart.length === 0 ? (
              <Nav.Link
                title="The cart is empty"
                style={{ color: "grey" }}
                className={styles.navLink}
                onClick={() => {
                  setShow(true);
                  setTimeout(() => setShow(false), 1000);
                }}
              >
                <div className={styles.tooltip}>
                  Cart
                  <span
                    style={
                      show
                        ? { visibility: "visible" }
                        : { visibility: "hidden" }
                    }
                    className={styles.tooltiptext}
                  >
                    Cart is empty
                  </span>
                </div>
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} href="/cart" className={styles.nav_link}>
                Cart
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
