import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { CiSquarePlus } from "react-icons/ci";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import ApiService from "../../ApiService";
import "../css/SellersPage.css"; // CSS dosyasını import et

function SellersPage() {
  const [sellers, setSellers] = useState([]);
  const [filteredSellers, setFilteredSellers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSellerId, setActiveSellerId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSellers();
  }, []);

  const searchSeller = () => {
    if (searchQuery.length > 1) {
      ApiService.get("/sellers/search", { searchQuery: searchQuery })
        .then((response) => {
          setFilteredSellers(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the sellers!", error);
        });
    } else {
      setFilteredSellers(sellers);
    }
  };

  useEffect(() => {
    searchSeller();
  }, [searchQuery, sellers]);

  const fetchSellers = async () => {
    try {
      const response = await ApiService.get("/sellers/all");
      setSellers(response.data);
      setFilteredSellers(response.data);
    } catch (error) {
      console.error("Satıcılar yüklenirken hata oluştu:", error);
    }
  };

  const handleDelete = async (sellerId) => {
    try {
      await ApiService.delete(`/sellers/${sellerId}`);
      setSellers(sellers.filter((seller) => seller.id !== sellerId));
      setFilteredSellers(
        filteredSellers.filter((seller) => seller.id !== sellerId)
      );
    } catch (error) {
      console.error("Satıcı silinirken hata oluştu:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="seller">
        <div className="seller-header">
          <div className="breadcrumb">
            <a href="/" className="breadcrumb-item">
              Home /
            </a>
            <span className="breadcrumb-current">Seller</span>
          </div>
          <div className="seller-actions">
            <CiSquarePlus size={32} onClick={() => navigate("/add-seller")} />
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search in sellers"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="search-icon" />
            </div>
          </div>
        </div>

        <div className="seller-card-container">
          {filteredSellers.length > 0 ? (
            filteredSellers.map((seller) => (
              <div key={seller.id} className="seller-card">
                <div className="seller-card-content">
                  {" "}
                  {/* Tek bir div içinde topladım */}
                  <p>
                    <strong>Name:</strong> {seller.name?.toUpperCase()}
                  </p>
                  <p>
                    <strong>Address:</strong> {seller.address.toUpperCase()}
                  </p>
                  <p>
                    <strong>Phone:</strong> {seller.phoneNumber}
                  </p>
                  <p>
                    <strong>Email:</strong> {seller.email}
                  </p>
                </div>
                <div className="seller-card-actions">
                  <FaEdit
                    className="seller-action-icon"
                    onClick={() =>
                      navigate(`/edit-seller`, { state: { seller } })
                    }
                  />
                  <FaTrash
                    className="seller-action-icon"
                    onClick={() => handleDelete(seller.id)}
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No sellers available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SellersPage;
