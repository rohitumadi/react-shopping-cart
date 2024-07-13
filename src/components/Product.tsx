import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useCart } from "../context/CartContext";

interface Product {
  id: number;
  title: string;
  description: string;
  images: string[];
  price: number;
  thumbnail: string;
}
interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}
export default function Product({ product }: { product: Product }) {
  const { cart, dispatch } = useCart();
  const inCart = cart.find((item: CartItem) => item.id === product.id);
  return (
    <Card sx={{ maxWidth: 345 }} className="p-4 flex flex-col ">
      <CardMedia
        component="img"
        height="20"
        image={product.thumbnail}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <div className="font-bold flex justify-between  ">
            <span>{product.title}</span>
            <span> ${product.price}</span>
          </div>
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
      </CardContent>
      <div className="mt-auto ">
        {inCart ? (
          <Button
            color="error"
            fullWidth
            onClick={() =>
              dispatch({ type: "REMOVE_FROM_CART", payload: product.id })
            }
            variant="contained"
          >
            Remove From Cart
          </Button>
        ) : (
          <Button
            fullWidth
            onClick={() => {
              dispatch({ type: "ADD_TO_CART", payload: product });
            }}
            variant="contained"
          >
            Add to Cart
          </Button>
        )}
      </div>
    </Card>
  );
}
