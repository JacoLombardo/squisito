import { Product } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";

interface Props {
  product: Product;
  variants: object;
}

export default function ProductCard({ product, variants }: Props) {
  const [color, setColor] = useState<string>("black");
  const [itemImage, setItemImage] = useState<string>(product.image);
  const colorVariants = Object.entries(variants)[0][1];
  console.log("colorVariants", colorVariants);

  useEffect(() => {
    setItemImage(
      colorVariants.filter((variant: any) => variant.color.includes(color))[0]
        .image
    );
  }, [color]);
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={itemImage} />
        <Card.Header>
          {colorVariants.map((variant: any, index: number) => {
            return (
              <a key={index} onClick={() => setColor(variant.color)}>
                <Image
                  alt={`${variant.color}`}
                  title={`${variant.color}`}
                  src={`/Images/Colors/${variant.color}.png`}
                  width={25}
                  height={25}
                />
              </a>
            );
          })}
        </Card.Header>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Subtitle>{product.price},00€</Card.Subtitle>
          <p>IN STOCK</p>
          <p>Color: {color}</p>
          <Card.Text>{product.description}</Card.Text>

          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </>
  );
}
