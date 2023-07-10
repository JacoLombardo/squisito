import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/component.module.css";

function NavBar() {
  return (
    <Navbar expand="lg" className={styles.navbar}>
      <Container>
        <Navbar.Brand href="#home">
          <span className={styles.brandText}>Saporito</span>
          {/* <Image
                alt="search"
                title="Search a Product"
                src="/Images/Navbar/logo.png"
                width={120}
                height={45}
                className={`${styles.cartLogo}`}
              /> */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.toggle} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`ml-auto ${styles.nav}`}>
            <Nav.Link as={Link} href="/" className={styles.navLink}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} href="/products" className={styles.navLink}>
              Search
              <Image
                alt="search"
                title="Search a Product"
                src="/Images/Icons/search.png"
                width={25}
                height={25}
                className={`${styles.cartIcon}`}
              />
            </Nav.Link>
            <Nav.Link as={Link} href="/cart" className={styles.navLink}>
              Cart
              <Image
                alt="shopping-cart"
                title="Go to Shopping Cart"
                src="/Images/Icons/shopping-cart.png"
                width={25}
                height={25}
                className={`${styles.cartIcon}`}
              />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
