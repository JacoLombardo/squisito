import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/component.module.css";
import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";

function NavBar() {
  const { cart } = useContext(CartContext);
  return (
    <Navbar expand="lg" className={styles.navbar}>
      <Container>
        <Navbar.Brand as={Link} href="/">
          <Image
                alt="logo"
                title="the logo"
            src="/Images/Navbar/logo2.png"
            width="0"
            height="0"
            sizes="100vw"
            style={{width: "120px", height: "auto"}}
                className={`${styles.Logo}`}
              />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className={styles.toggle}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`ml-auto ${styles.nav}`}>
            <Nav.Link as={Link} href="/" className={styles.navLink}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} href="/products" className={styles.navLink}>
              Products
            </Nav.Link>
            {cart.length === 0 ? (
              <Nav.Link
                title="The cart is empty"
                style={{ color: "grey" }}
                className={styles.navLink}
              >
                Cart
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} href="/cart" className={styles.navLink}>
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
