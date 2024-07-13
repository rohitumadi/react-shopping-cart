import { Button } from "@mui/material";
import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
}

export default function Cart() {
  const { cart, dispatch } = useCart();
  const total = cart.reduce(
    (acc: number, item: CartItem) => acc + item.price * (item?.quantity || 1),
    0
  );
  const isCartEmpty = cart.length === 0;

  return (
    <div className="col-span-1 w-80 fixed top-20 right-2  border h-fit ">
      <div className="border p-4 flex justify-between">
        <ShoppingCartIcon />

        <span>{cart.length} items</span>
        {!isCartEmpty && (
          <Button
            onClick={() => dispatch({ type: "CLEAR_CART" })}
            variant="contained"
          >
            Clear cart
          </Button>
        )}
      </div>
      {isCartEmpty && <p className="text-center p-2">No items in cart</p>}
      {cart.length > 0 && (
        <>
          <div className="h-[60vh]  overflow-y-scroll">
            {cart.map((item: CartItem) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="p-4 border-t-2">
            <span>Total : ${total.toFixed(2)}</span>
          </div>
        </>
      )}
    </div>
  );
}
