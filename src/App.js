import "./App.css";
import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Brands from "./Components/Brands/Brands";
import Login from "./Components/features/Authentication/Login/Login";
import Register from "./Components/features/Authentication/Register/Register";
import Categories from "./Components/Categories/Categories";
import Layout from "./Components/Layout/Layout";
import UserContextProvider from "./context/UserContext";
import NotFound from "./Components/ui/Not Found/NotFound";
import ProductLayout from "./Components/Products/ProductLayout";
import Products from "./Components/features/Products/Products";
import Product, {
  loader as productLoader,
} from "./Components/features/Products/Product";
import ProductsContextProvider from "./context/ProductsContext";
import CartContextProvider from "./context/CartContext";
import CartLayout from "./Components/Layout/CartLayout";
import Payment from "./Components/Cart/Payment";
import OrderPayed from "./Components/Cart/OrderPayed";
import WishList from "./Components/Wish List/WishList";
import WishListContextProvider from "./context/WishListContext";
import ForgetPassword from "./Components/features/Authentication/Login/ForgetPassword";

let routes = createHashRouter(
  [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/products",
        element: <ProductLayout />,
        children: [
          {
            index: true,
            element: <Products />,
          },
          { path: ":productId", element: <Product />, loader: productLoader },
        ],
      },
      {
        path: "cart", element: <CartLayout />, children: [
          { index: true, element: <Cart /> },
          { path: "checkout", element: <Payment /> }
        ]
      },
      { path: "categories", element: <Categories /> },
      { path: "brands", element: <Brands /> },
      { path: "wish-list", element: <WishList /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <NotFound /> },
      { path: "/allorders", element: <OrderPayed /> },
      { path: "/forget-password", element: <ForgetPassword /> },
    ],
  },
],{
  basename:"/Fresh-Cart/"
});

function App() {
  return (
    <UserContextProvider>
      <ProductsContextProvider>
        <CartContextProvider>
          <WishListContextProvider>
              <RouterProvider router={routes} />
          </WishListContextProvider>
        </CartContextProvider>
      </ProductsContextProvider>
    </UserContextProvider>
  );
}

export default App;
