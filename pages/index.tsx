import NavBar from "@/components/NavBar";
import styles from "@/styles/homepage.module.css";

export default function Home() {
  return (
    <>
      <NavBar />
      <div className={styles.cardContainer}>
        <div className={`${styles.card} ${styles.cardBig}`}></div>
        <div className={styles.card}></div>
        <div className={styles.card}></div>
      </div>
      <p className={styles.title}>Discover a wide range of kitchen appliance tools</p>
    </>
  );
}
