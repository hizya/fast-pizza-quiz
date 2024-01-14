import { formatCurrency } from '../../utils/helpers';

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;


  return (
    <li className='py-3'>
      <div className='flex flex-col gap-2 text-sm'>
        <div className='flex justify-between items-center'>
          <p className=' tracking-wider'>
            <span className='font-bold'>{quantity}&times; </span>{name}
          </p>
          <p className='font-bold'>{formatCurrency(totalPrice)}</p>
        </div>
        <p className='italic capitalize'>{isLoadingIngredients ? 'Loading...' : ingredients?.join(', ')}</p>
      </div>
    </li>
  );
}

export default OrderItem;
