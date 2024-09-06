import "./App.css";
import HomePage from "../src/components/pages/HomePage.js";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductsPage from "../src/components/pages/ProductsPage.js";
import ProductDetails from "./components/pages/ProductDetails.js";
import BlackListPage from "../src/components/pages/BlackListPage.js";
import FavoritePage from "../src/components/pages/FavoritePage.js";
import ProductAddPage from "../src/components/pages/ProductAddPage.js";
import ProductEditPage from "../src/components/pages/ProductEditPage.js";
import LoginPage from "./components/pages/LoginPage.js";
import SellerPage from "./components/pages/SellerPage.js";
import SellerAddPage from "./components/pages/SellerAddPage.js";
import CartPage from "./components/pages/CartPage.js";
import UsersPage from "./components/UsersPage.js";
import UserAddPage from "./components/pages/UserAddPage.js";
import UserEditPage from "./components/pages/UserEditPage.js";
import SellerEditPage from "./components/pages/SellerEditPage.js";
//import SellerAddPage from './components/pages/SellerAddPage.js';

export default function App() {
  const token = localStorage.getItem("token");
  const isAuthenticate = (page) => {
    return token != null ? page : <LoginPage />;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={isAuthenticate(<HomePage />)}></Route>
        <Route path="/home" element={isAuthenticate(<HomePage />)} />
        <Route path="/products" element={isAuthenticate(<ProductsPage />)} />
        <Route path="/sellers" element={isAuthenticate(<SellerPage />)} />
        <Route path="/users" element={isAuthenticate(<UsersPage />)} />
        <Route path="/add-user" element={isAuthenticate(<UserAddPage />)} />
        <Route path="/edit-user" element={isAuthenticate(<UserEditPage />)} />
        <Route
          path="/add-product"
          element={isAuthenticate(<ProductAddPage />)}
        />
        <Route path="/add-seller" element={isAuthenticate(<SellerAddPage />)} />
        <Route
          path="/edit-seller"
          element={isAuthenticate(<SellerEditPage />)}
        />
        <Route
          path="/edit-product"
          element={isAuthenticate(<ProductEditPage />)}
        />
        <Route
          path="/product-details"
          element={isAuthenticate(<ProductDetails />)}
        />
        <Route path="/seller" element={isAuthenticate(<SellerPage />)} />
        <Route path="/blacklist" element={isAuthenticate(<BlackListPage />)} />
        <Route path="/favorite" element={isAuthenticate(<FavoritePage />)} />
        <Route path="/cart" element={isAuthenticate(<CartPage />)} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
