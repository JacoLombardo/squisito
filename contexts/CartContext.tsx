import { CartItem } from "@/types";
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
};
const initialFileContext: CartContextValue = {
  cart: [],
  setCart: () => {},
};

// ** Create Context
export const CartContext = createContext<CartContextValue>(initialFileContext);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
