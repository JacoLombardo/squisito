import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";

interface Product {
  internal_id: number;
  name: string;
  description: string;
  color: string;
  price: number;
  image: string;
  tags: string[];
}

export default function Products() {
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState<Product[] | null>(null);
  const getProducts = () => {
    var myHeaders = new Headers();

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch("/api/getProducts", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setProducts(result);
        setShow(true);
      })
      .catch((error) => {
        console.log("error", error);
        setShow(false);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <NavBar />
      <p>Products</p>
      {show &&
        products?.map((product, index) => {
          return <li key={index}>{product.name}</li>;
        })}
    </>
  );
}
