import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import { formatCurrency } from '../../utils/helpers';
import EmptyCart from '../cart/EmptyCart';
import store from '../../store'
import { useState } from 'react';
import { fetchAddress } from '../users/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const navigation = useNavigation();
  const isSubmmiting = navigation.state === 'submitting';
  const { username, position, address, error, status } = useSelector(state => state.user)

  const isLoading = status === 'loading';

  const formErrors = useActionData();
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice)
  const dispatch = useDispatch();
  const [isPriority, setIsPriority] = useState(false);
  const priorityPrice = isPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  if (!cart.length) return <EmptyCart />

  return (
    <div className="grid py-6 px-4">
      <h2 className='font-semibold text-xl mb-8'>Ready to order? Let's go!</h2>
      <Form method="POST" className=''>
        <div className='flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:gap-4 sm:justify-between'>
          <label className='sm:basis-40'>First Name</label>
          <input
            className="input grow"
            disabled={isLoading}
            type="text"
            name="customer"
            defaultValue={username}
            required
          />
        </div>

        <div className='flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:gap-4 sm:justify-between'>
          <label className='sm:basis-40'>Phone number</label>
          <div className='grow space-y-2'>
            <input className="input w-full" type="tel" name="phone" disabled={isLoading} required />
            {formErrors?.phone && <p className='bg-red-100 text-xs mt-2 tracking-tighter text-red-700 p-2 rounded-md'>{formErrors.phone}</p>}
          </div>
        </div>

        <div className='relative flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:gap-4 sm:justify-between'>
          {!position?.latitude && !position?.longtitude && <div className='absolute right-[3px]'>
            <Button type="small" onClick={() => dispatch(fetchAddress())} disabled={isLoading}>get position</Button>
          </div>}
          <label className='sm:basis-40'>Address</label>
          <div className='grow'>
            <input className='input w-full' type="text" name="address" disabled={isLoading} required defaultValue={address} />
            {status === 'error' && <p className='bg-red-100 text-xs mt-2 tracking-tighter text-red-700 p-2 rounded-md'>{error}</p>}
          </div>
        </div>

        <div className='flex gap-5 items-center mb-12 sm:flex-row sm:items-center'>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={isPriority}
            disabled={isLoading}
            onChange={(e) => setIsPriority(e.target.checked)}
          />
          <label htmlFor="priority" className='font-semibold'>Want to yo give your order priority?</label>
        </div>

        <div>
          <input
            type="hidden"
            name="cart"
            value={JSON.stringify(cart)}
          />
          <input type='hidden' name='position' value={(position?.longtitude && position?.latitude) ? `${position.latitude},${position.longtitude}` : ''} />
          <Button disabled={isSubmmiting || isLoading} type="primary"> {isSubmmiting ? 'Placing order' : `Order now from ${formatCurrency(totalPrice)}`}</Button>
        </div>
      </Form >
    </div >
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      'Please give us your right phone number, we might need it to contact you.';

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
