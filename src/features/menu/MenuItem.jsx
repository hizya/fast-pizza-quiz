import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { addToCart,decreaseCart,increaseQuantity,decareseQuantity, getCurrentQuantityById } from '../cart/cartSlice';
import { useState } from 'react';
import DeleteItem from '../cart/DeleteItem';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';
function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentQuantity=useSelector(getCurrentQuantityById(id));
  const dispatch=useDispatch();
  
  function handleAddToCart(){
    const newCartItem={
      pizzaId:id,
      name,
      quantity:1,
      unitPrice,
      totalPrice:unitPrice*1,
    }
    dispatch(addToCart(newCartItem));
  }


  return (
    <li className='flex py-2 gap-4'>
      <img src={imageUrl} alt={name} className={`h-24 mr-2 ${soldOut?'opacity-70 grayscale':''}`}/>
      <div className='flex flex-col grow pt-0.5'>
        <p className='font-medium'>{name}</p>
        <p className='text-sm italic capitalize text-stone-500'>{ingredients.join(', ')}</p>
        <div className='mt-auto flex items-center'>
          {!soldOut ? 
          <>
            <p className='text-sm mr-auto'>{formatCurrency(unitPrice)}</p> 
            <div className='flex gap-5 items-center justify-center'>
             {currentQuantity>0?
             <>
             <UpdateItemQuantity pizzaId={id} quantity={currentQuantity}/>
             <DeleteItem pizzaID={id}/>
             </>
             : <Button type="small" onClick={handleAddToCart}>add to cart</Button>
             }
            </div>
          </>
          : <p className='text-sm uppercase font-medium text-stone-500'>Sold out</p>}
        </div>
      </div>
    </li>
  );   
}

export default MenuItem;
