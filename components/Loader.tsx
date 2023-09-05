import styles from "@/styles/component.module.css";
import Image from "next/image";

export default function Loader() {
  return (
    <>
      <div className={styles.loader_div}>
        <Image
          alt="loader"
          title="loader"
          src="/Images/IMG_8113.jpeg"
          width="0"
          height="0"
          sizes="100vw"
          style={{ width: "120px", height: "auto" }}
          className={styles.loader}
        />
      </div>
    </>
  );
}
