import NavBar from "@/components/NavBar";
import styles from "@/styles/homepage.module.css";
// import CustomAccordion from "@/components/Accordion";

export default function Home() {
  return (
    <>
      <NavBar />
      <div className={styles.cardContainer}>
        <div className={`${styles.card} ${styles.cardBig}`}></div>
        <div className={styles.card}></div>
        <div className={styles.card}></div>
      </div>
      <div className={styles.titleContainer}>
        <p className={styles.title}>Discover a wide range of kitchen appliance tools</p>
        <div className={styles.discoverContainer}>
          <span className={styles.discover}>
            <span className={styles.discoverText}>Discover</span>
            <span className={styles.arrow}>→</span>
          </span>
        </div>
      </div>
      {/* <CustomAccordion /> */}
    </>
  );
}
