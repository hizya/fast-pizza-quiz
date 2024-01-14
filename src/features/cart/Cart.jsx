import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import LinkButton from '../../ui/LinkButton';
import EmptyCart from './EmptyCart'
import { getCart, decreaseCart, clearCart, getCurrentQuantityById } from './cartSlice';
import DeleteItem from './DeleteItem';
import UpdateItemQuantity from './UpdateItemQuantity';

function CartItem({ pizzaId, name, unitPrice }) {

  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  return <li className='sm:flex sm:justify-between py-3 sm:items-center' key={pizzaId}>
    <p className='mb-1 sm:mb-0'>{`${currentQuantity}× ${name}`}</p>
    <div className='flex justify-between items-center sm:gap-6'>
      <span>€<span className='font-semibold'>{(currentQuantity * unitPrice).toFixed(2)}</span></span>
      <UpdateItemQuantity pizzaId={pizzaId} quantity={currentQuantity} />
      <DeleteItem pizzaID={pizzaId} />
    </div>
  </li>
}

function Cart() {
  const cart = useSelector(getCart);

  const username = useSelector(state => state.user.username);

  const dispatch = useDispatch();


  function handleDelete(id) {
    dispatch(decreaseCart(id));
  }

  function handleClearCart() {
    dispatch(clearCart());
  }

  if (!cart.length) return <EmptyCart />

  return (
    <div className="px-4 py-3">
      <LinkButton to={"/menu"}>&larr; Back to menu</LinkButton>
      <h2 className='mt-7 font-semibold text-xl mb-4'>Your cart, {username}</h2>
      <ul className='divide-y border-b divide-stone-200'>
        {cart.map(item => <CartItem key={item.pizzaId} pizzaId={item.pizzaId} quantity={item.quantity} unitPrice={item.unitPrice} name={item.name} handleDelete={handleDelete} />)}
      </ul>
      <div className="mt-4 space-x-2">
        <Button to="/order/new" type='primary'>
          Order pizzas, {username}
        </Button>
        <Button type='secondary' className='bg-stone-300' onClick={handleClearCart}>Clear cart, {username}</Button>
      </div>
    </div>
  );
}

export default Cart;
