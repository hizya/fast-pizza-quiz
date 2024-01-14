import { useDispatch } from "react-redux"
import Button from "../../ui/Button"
import { decareseQuantity,increaseQuantity } from "./cartSlice"


function UpdateItemQuantity({pizzaId,quantity}) {

  const dispatch=useDispatch();

  return (
    <div className='flex justify-center items-center gap-2'>
    <Button type='xsmall' onClick={()=>dispatch(decareseQuantity(pizzaId))}>-</Button>
    <span>{quantity}</span>
    <Button type='xsmall' onClick={()=>dispatch(increaseQuantity(pizzaId))}>+</Button>
  </div>
  )
}

export default UpdateItemQuantity
