import { useDispatch } from "react-redux"
import Button from "../../ui/Button"
import { decreaseCart } from "./cartSlice";



function DeleteItem({pizzaID}) {

  const dispatch=useDispatch();

  return (
    <Button type='small' onClick={()=>dispatch(decreaseCart(pizzaID))}>delete</Button>
  )
}

export default DeleteItem
