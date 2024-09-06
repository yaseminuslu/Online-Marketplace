import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import Navbar from "./Navbar";
import "../css/DoesNotExistFavorite.css";
import ApiService from "../../ApiService";
import Product from "../Product";
import FavoriteProduct from "./FavoriteProduct";

const FavoritePage = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [filteredFavoriteProducts, setFilteredFavoriteProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchAllFavoriteProducts = () => {
    const userId = localStorage.getItem("id");
    ApiService.get("/favorites/user", {
      userId: userId,
    })
      .then((response) => {
        setFavoriteProducts(response.data);
        setFilteredFavoriteProducts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  };

  useEffect(() => {
    fetchAllFavoriteProducts(); // Sayfa yüklendiğinde tüm favori ürünleri getir
  }, []);

  const searchProductFavorite = () => {
    const userId = localStorage.getItem("id");
    if (searchQuery.length > 1) {
      ApiService.get("favorites/search", {
        searchQuery: searchQuery,
        userId: userId,
      })
        .then((response) => {
          console.log(response.data);
          setFilteredFavoriteProducts(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the products!", error);
        });
    } else {
      setFilteredFavoriteProducts(favoriteProducts);
    }
  };

  useEffect(() => {
    searchProductFavorite();
  }, [searchQuery]);

  return (
    <div>
      <Navbar />
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <div className="breadcrumb">
          <a href="/" className="breadcrumb-item">
            Home /
          </a>
          <span className="breadcrumb-current">Favorites</span>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search in favorites"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="search-icon" />
        </div>
      </div>
      {filteredFavoriteProducts.length === 0 ? (
        <div className="no-products">
          <FaHeart size={120} />
          <p>Henüz favori ürün eklemediniz.</p>
          <button className="go-back-btn" onClick={() => navigate("/")}>
            Alışverişe Başla
          </button>
        </div>
      ) : (
        <div className="product-list">
          {filteredFavoriteProducts.map((favoriteProduct) => (
            <FavoriteProduct
              favoriteProduct={favoriteProduct}
              key={favoriteProduct.id}
              onRemoved={(value) => {
                if (value) {
                  fetchAllFavoriteProducts();
                }
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritePage;
