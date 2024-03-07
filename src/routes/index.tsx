import Home from '../pages/home';
import Orders from '../pages/orders';

export const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/orders/:id',
    element: <Orders />,
  },
];
