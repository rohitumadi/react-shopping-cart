import { createContext, useContext, useEffect, useReducer } from "react";

const CartContext = createContext({} as any);
interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
}

interface CartItem {
  product: Product;
  quantity: number;
  id: number;

  // Add other cart item properties here as needed
}

interface State {
  cart: CartItem[];
  products: Product[];
}

interface Action {
  type: string;
  payload?: any;
  item?: CartItem;
  id?: number;
}

const initialState: State = {
  cart: [],
  products: [],
};
function reducer(state: State, action: Action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "UPDATE_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => {
          if (item.id === action.payload.id) {
            item.quantity = action.payload.quantity;
            return item;
          } else {
            return item;
          }
        }),
      };
    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
}

function CartProvider({ children }: { children: React.ReactNode }) {
  const [{ cart, products }, dispatch] = useReducer(reducer, initialState);
  useEffect(function () {
    async function fetchProducts() {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const { products } = await res.json();

        dispatch({ type: "SET_PRODUCTS", payload: products });
      } catch (err) {
        console.log("Failed to fetch products");
      }
    }
    fetchProducts();
  }, []);
  return (
    <CartContext.Provider value={{ cart, products, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
export { CartProvider, useCart };
