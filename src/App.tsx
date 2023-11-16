import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Root from './pages/Root';
import Categories from './pages/Categories';
import Products from './pages/Products';
import Suppliers from './pages/Suppliers';
import Employees from './pages/Employees';
import Customers from './pages/Customers';
import Orders from './pages/Orders';
import Cart from './pages/Cart';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        index: true,
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/online-shop/products',
        element: <Products />
      },
      {
        path: '/online-shop/categories',
        element: <Categories />
      },
      {
        path: '/online-shop/suppliers',
        element: <Suppliers />
      },
      {
        path: '/online-shop/employees',
        element: <Employees />
      },
      {
        path: '/online-shop/customers',
        element: <Customers />
      },
      {
        path: '/online-shop/orders',
        element: <Orders />
      },
    ]
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
