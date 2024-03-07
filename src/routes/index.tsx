import Home from '../pages/home';
import Coin from '../pages/coin';

export const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/coin/:id',
    element: <Coin />,
  },
];
