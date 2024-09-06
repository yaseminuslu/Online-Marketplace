import React from "react";
import "../css/Navbar.css";
import { FaHeart } from "react-icons/fa";
import { FaStoreSlash } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <a href="/" style={{ textDecoration: "none", color: "#726969" }}>
        <div className="navbar-logo">Yu'Store.</div>
      </a>

      {role === "USER" && (
        <>
          <a
            href="/products"
            style={{
              textDecoration: "none",
              color: "#726969",
              marginRight: -200,
            }}
          >
            Products
          </a>
          <ul
            className="navbar-links"
            style={{ alignContent: "center", alignItems: "center" }}
          >
            <li>
              <a href="/favorite">
                <FaHeart />
              </a>
            </li>
            <li>
              <a href="/blacklist">
                <FaStoreSlash />
              </a>
            </li>
            <FaShoppingCart size={20} style={{ marginTop: 5 }} />
            <li
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              <IoLogOut size={24} style={{ marginTop: 8 }} />
            </li>
          </ul>
        </>
      )}

      {role === "ADMIN" && (
        <>
          <a
            href="/products"
            style={{
              textDecoration: "none",
              color: "#726969",
              marginRight: -200,
            }}
          >
            Products
          </a>
          <a
            href="/sellers"
            style={{
              textDecoration: "none",
              color: "#726969",
              marginRight: -200,
            }}
          >
            Sellers
          </a>
          <a href="/users" style={{ textDecoration: "none", color: "#726969" }}>
            Users
          </a>
          <ul
            className="navbar-links"
            style={{ alignContent: "center", alignItems: "center" }}
          >
            <FaShoppingCart size={20} style={{ marginTop: 5 }} />
            <li
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              <IoLogOut size={24} style={{ marginTop: 8 }} />
            </li>
          </ul>
        </>
      )}
    </nav>
  );
};

export default Navbar;
