import NavBar from "@/components/NavBar";
import styles from "@/styles/homepage.module.css";

export default function Home() {
  return (
    <>
      <NavBar />
      <p className={styles.title}>Welcome to the homepage!</p>
    </>
  );
}
