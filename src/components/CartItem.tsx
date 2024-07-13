import { Fab, ListItem, ListItemButton, ListItemText } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCart } from "../context/CartContext";
interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
}

export default function CartItem({ item }: { item: CartItem }) {
  const { dispatch } = useCart();
  return (
    <ListItem component="div" divider>
      <div className="flex  justify-between items-center w-full">
        <span className="w-1/3 text-sm ">{item.title}</span>
        <div className="flex gap-2">
          <Fab
            onClick={() => {
              dispatch({
                type: "UPDATE_CART",
                payload: {
                  id: item.id,

                  quantity: (item?.quantity || 1) + 1,
                },
              });
            }}
            size="small"
            color="primary"
            aria-label="add"
          >
            <AddIcon fontSize="small" />
          </Fab>
          <ListItemText primary={`${item.quantity || 1}`} />
          <Fab
            onClick={() => {
              if (item.quantity === 0) return;
              dispatch({
                type: "UPDATE_CART",
                payload: {
                  id: item.id,
                  quantity: (item?.quantity || 1) - 1,
                },
              });
            }}
            size="small"
            color="error"
            aria-label="add"
          >
            <RemoveIcon fontSize="small" />
          </Fab>
        </div>
        <span className="text-wrap text-sm ">{`$${item.price}`}</span>
      </div>
    </ListItem>
  );
}
