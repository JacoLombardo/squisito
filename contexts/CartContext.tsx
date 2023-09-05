import { CartItem, Product } from "@/types";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

export type CartContextValue = {
  cart: CartItem[];
  setCart: Dispatch<SetStateAction<CartItem[]>>;
  total: number;
  setTotal: Dispatch<SetStateAction<number>>;
  calculateTotal: Function;
  shipping: number;
  setShipping: Dispatch<SetStateAction<number>>;
  calculateShipping: Function;
  AddToCartContext: Function;
  ModifyOrderContext: Function;
  loader: boolean;
  setLoader: Dispatch<SetStateAction<boolean>>;
};
const initialFileContext: CartContextValue = {
  cart: [],
  setCart: () => {},
  total: 0,
  setTotal: () => {},
  calculateTotal: () => {},
  shipping: 0,
  setShipping: () => {},
  calculateShipping: () => {},
  AddToCartContext: () => {},
  ModifyOrderContext: () => {},
  loader: true,
  setLoader: () => {},
};

// ** Create Context
export const CartContext = createContext<CartContextValue>(initialFileContext);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [shipping, setShipping] = useState<number>(0);
  const [loader, setLoader] = useState<boolean>(true);

  const calculateShipping = (total: number) => {
    if (total < 1000) {
      setShipping(49);
    } else {
      setShipping(0);
    }
  };

  const calculateTotal = (cart: CartItem[]) => {
    setTotal(0);
    let tot: number = 0;
    for (let i: number = 0; i < cart.length; i++) {
      let itemTotal = cart[i].item.price * cart[i].number;
      tot = tot + itemTotal;
    }
    setTotal(tot);
    calculateShipping(tot);
    setLoader(false);
  };

  const AddToCartContext = (actualVariant: Product, counter: number) => {
    setCart([
      ...cart,
      {
        number: counter,
        item: actualVariant,
      },
    ]);
  };

  const ModifyOrderContext = (actualVariant: Product, counter: number) => {
    if (counter > 0) {
      cart.filter(
        (item) => item.item.internal_id === actualVariant.internal_id
      )[0].number = counter;
    } else if (counter === 0) {
      setCart((current) =>
        current.filter((item) => {
          return item.item.internal_id !== actualVariant.internal_id;
        })
      );
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        total,
        setTotal,
        calculateTotal,
        shipping,
        setShipping,
        calculateShipping,
        AddToCartContext,
        ModifyOrderContext,
        loader,
        setLoader,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
