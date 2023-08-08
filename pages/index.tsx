import NavBar from "@/components/NavBar";
import styles from "@/styles/homepage.module.css";
import Link from "next/link";
import Image from "next/image";


// import CustomAccordion from "@/components/Accordion";

export default function Home() {
  return (
    <>
      <NavBar />
      <div className={styles.cardContainer}>
        <div className={`${styles.card} ${styles.cardBig}`}></div>
        <div className={styles.card}>
          <Image
                alt="product1"
                title="product 1"
                src="/Images/NewProducts/Kneading/kneading-machine-beige.png"
                width={320}
                height={320}
                className={`${styles.cartLogo}`}
              />
        </div>
        <div className={styles.card}></div>
      </div>
      <div className={styles.loremIpsum}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </div>
      <div className={styles.titleContainer}>
        <p className={styles.title}>Discover a wide range of kitchen appliance tools</p>
        <div className={styles.discoverContainer}>
          <Link href="/products" className={styles.discover}>
            <span className={styles.discoverText}>Discover</span>
            <span className={styles.arrow}>→</span>
          </Link>
        </div>
      </div>
      {/* <CustomAccordion /> */}
    </>
  );
}
