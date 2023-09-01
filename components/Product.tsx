/* eslint-disable react-hooks/exhaustive-deps */
import { Product } from "@/types";
import Image from "next/image";
import { useContext, useState } from "react";
import { Card } from "react-bootstrap";
import Counter from "./Counter";
import styles from "@/styles/product.module.css";
import Link from "next/link";
import { ProductContext } from "@/contexts/ProductContext";

interface Props {
  product: Product;
  variants: object;
}

export default function ProductCard({ product, variants }: Props) {
  const [actualVariant, setActualVariant] = useState<Product>(product);
  const { getColorVariants } = useContext(ProductContext);

  return (
    <>
      <Card className={styles.product_card}>
        <Link href={`/product/${actualVariant.internal_id}`}>
          <div className={styles.product_img_div}>
            <Card.Img
              variant="top"
              src={actualVariant.image}
              className={styles.product_img}
            />
          </div>
        </Link>
        <Card.Header className={styles.product_header}>
          {variants &&
            getColorVariants(variants).map(
              (variant: Product, index: number) => (
                <a
                  key={index}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setActualVariant(variant);
                  }}
                >
                  <Image
                    alt={`${variant.color}`}
                    title={`${variant.color}`}
                    src={`/Images/Colors/${variant.color}.png`}
                    width={25}
                    height={25}
                  />
                </a>
              )
            )}
        </Card.Header>
        <div className={styles.titleContainer}>
          <Card.Title>{actualVariant.name}</Card.Title>
          <Card.Subtitle>{actualVariant.price},00€</Card.Subtitle>
          <p className={styles.instock}>IN STOCK</p>
        </div>
        <Card.Body className={styles.card_body}>
          <Counter actualVariant={actualVariant} page="product" />
        </Card.Body>
      </Card>
    </>
  );
}
