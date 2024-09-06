import React from "react";
import "../css/ProductList.css";
import { FaHeart, FaSearch } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import ApiService from "../../ApiService";
import axios from "axios";

function FavoriteProduct(props) {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = React.useState(null);

  const userId = localStorage.getItem("id");
  const role = localStorage.getItem("role");

  const [product, setProduct] = React.useState({});

  React.useEffect(() => {
    const fetchImage = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:8080${props.favoriteProduct.productImage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Image fetch failed");
        }

        const blob = await response.blob();
        const imageObjectURL = URL.createObjectURL(blob);
        setImageSrc(imageObjectURL);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [props.favoriteProduct.productImage]);

  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await ApiService.get(
          `/products/${props.favoriteProduct.productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchProduct();
  }, [props.favoriteProduct.productId]);

  const removeProductToFavorite = async () => {
    try {
      await axios.delete("http://localhost:8080/api/v1/favorites", {
        params: {
          userId: userId,
          productId: product.id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      props.onRemoved(true);
    } catch (error) {}
  };

  return (
    <div
      key={product.id}
      className="product-card"
      onClick={() => {
        navigate("/product-details", { state: { product } });
      }}
    >
      <img src={imageSrc} alt={product.name} style={{ height: 220 }} />
      <h1>{product.name}</h1>
      <h2>{product.category}</h2>
      <h4>${product.price}</h4>
      <h6>{product.description}</h6>
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          className="icon-button"
          onClick={(e) => {
            e.stopPropagation();
            removeProductToFavorite();
          }}
        >
          <FaHeart className="button-icon" />
        </button>
      </div>
    </div>
  );
}

export default FavoriteProduct;
