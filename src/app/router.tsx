import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import Test from '../pages/test/Test';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/test',
    element: <Test />,
  },
]);
