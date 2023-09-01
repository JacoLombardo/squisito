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
          <span className={styles.brandText}>Squisito.</span>
          {/* <Image
                alt="search"
                title="Search a Product"
                src="/Images/Navbar/logo.png"
                width={120}
                height={45}
                className={`${styles.cartLogo}`}
              /> */}
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
