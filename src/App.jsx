import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './ui/Home';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import Order, { loader as searchOrder } from './features/order/Order';
import Cart from './features/cart/Cart';
import CreateOrder, {
  action as formAction,
} from './features/order/CreateOrder';

import { action as updateAction } from './features/order/UpdateOrder'
import AppLayout from './ui/AppLayout';
import Error from './ui/Error';
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/order/new',
        element: <CreateOrder />,
        action: formAction,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: searchOrder,
        errorElement: <Error />,
        action: updateAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
