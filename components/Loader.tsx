import styles from "@/styles/component.module.css";
import Image from "next/image";

export default function Loader() {
  return (
    <>
      <div className={styles.loader_div}>
        <Image
          alt="loader"
          title="loader"
          src="https://res.cloudinary.com/dtl48kr1u/image/upload/v1694101825/fake-shop/loader_cgvgeu.png"
          width="0"
          height="0"
          sizes="100vw"
          style={{ width: "150px", height: "auto" }}
          className={styles.loader}
        />
      </div>
    </>
  );
}
