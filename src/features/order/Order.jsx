// Test ID: IIDSAT
import { useLoaderData, useFetcher } from 'react-router-dom';
import { getOrder } from '../../services/apiRestaurant';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import OrderItem from './OrderItem';
import { useEffect } from 'react';
import Button from '../../ui/Button';
import UpdateOrder from './UpdateOrder';


function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const order = useLoaderData();

  // useFetcher to get some data from another page
  const fetcher = useFetcher();

  useEffect(function () {
    if (!fetcher.data && fetcher.state === 'idle')
      fetcher.load('/menu');
  }, [fetcher])


  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className='py-6 px-4 space-y-8'>
      <div className='flex justify-between flex-wrap items-center gap-3'>
        <h2 className=' text-xl font-semibold grow text-center xs:text-left'>Order #{id} status</h2>
        <div className='space-x-2 grow text-center xs:text-right '>
          {priority && <span className=' uppercase bg-red-500 text-red-50 font-semibold px-3 rounded-full py-1 tracking-wide'>Priority</span>}
          <span className=' uppercase bg-green-500 text-green-50 font-semibold px-3 py-1 rounded-full tracking-wide'>{status} order</span>
        </div>
      </div>

      <div className='flex bg-stone-200 px-2 py-4 items-center justify-around flex-wrap xs:justify-between xs:px-4'>
        <p className='font-semibold'>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className='text-xs text-stone-500'>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul className='divide-y dive-stone-200 border-b border-t'>
        {cart.map(item => <OrderItem item={item} key={item.name} isLoadingIngredients={fetcher.state === 'isLoading'} ingredients={fetcher.data?.find(meal => meal.name === item.name).ingredients} />)}
      </ul>

      <div className='bg-stone-200 px-6 py-5 space-y-2'>
        <p className='text-sm font-medium text-stone-600'>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p className='text-sm font-medium text-stone-600'>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className='font-bold'>To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
      {!priority && <UpdateOrder order={order} />}
    </div>
  );
}

export async function loader({ params }) {
  // react hooks can only be used in React Function
  const { orderId } = params;
  const order = await getOrder(orderId);
  return order;
}

export default Order;
