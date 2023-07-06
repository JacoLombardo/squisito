import Image from "next/image";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "@/styles/component.module.css";
import Link from "next/link";

function NavBar() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} href="/products">
              Products
            </Nav.Link>
          </Nav>
        </Container>
        <Nav.Link as={Link} href="/cart">
          <Image
            alt="shopping-cart"
            title="Go to the shopping cart!"
            src="/Images/Icons/shopping-cart.png"
            width={50}
            height={50}
            className={styles.cart_icon}
          />
        </Nav.Link>
      </Navbar>
    </>
  );
}

export default NavBar;
