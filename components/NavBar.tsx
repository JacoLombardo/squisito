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
              Search
            </Nav.Link>
            <Nav.Link as={Link} href="/cart" className={styles.navLink}>
              Cart
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
