import { Product } from "@/types";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

export type ProductContextValue = {
  products: Product[] | null | void;
  setProducts: Dispatch<SetStateAction<Product[] | null | void>>;
  filterProducts: Function;
  getProducts: Function;
  getVariants: Function;
  getColorVariants: Function;
};
const initialFileContext: ProductContextValue = {
  products: null,
  setProducts: () => {},
  filterProducts: () => {},
  getProducts: () => {},
  getVariants: () => {},
  getColorVariants: () => {},
};

// ** Create Context
export const ProductContext =
  createContext<ProductContextValue>(initialFileContext);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[] | null | void>(null);

  const filterProducts = (products: Product[]) => {
    const groupByCategory = products.reduce((group: any, product: Product) => {
      const { name } = product;
      group[name] = group[name] ?? [];
      group[name].push(product);
      return group;
    }, {});
    return groupByCategory;
  };

  const getProducts = () => {
    var requestOptions = {
      headers: new Headers(),
    };

    fetch("/api/get-products", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setProducts(result);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const getColorVariants = (variants: Object) => {
    return Object.entries(variants)[0][1];
  };

  const getVariants = (products: Product[], product: Product) => {
    return Object.fromEntries(
      Object.entries(filterProducts(products)).filter(([key]) =>
        key.includes(product.name)
      )
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        filterProducts,
        getProducts,
        getVariants,
        getColorVariants,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
