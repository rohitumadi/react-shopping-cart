import Cart from "./components/Cart";
import Products from "./components/Products";
import { useCart } from "./context/CartContext";

function App() {
  const { products } = useCart();
  return (
    <div className="">
      <h1 className="p-4 text-2xl text-center border  ">
        {" "}
        React Shopping Cart
      </h1>
      <div className="grid grid-cols-5 p-4">
        <Products products={products} />
        <Cart />
      </div>
    </div>
  );
}

export default App;
