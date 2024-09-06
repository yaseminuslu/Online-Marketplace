import React from "react";
import "../components/css/ProductList.css";
import { FaRegHeart, FaSearch } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ApiService from "../ApiService";
import { MdDeleteOutline } from "react-icons/md";

function Product(props) {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = React.useState(null);

  const id = localStorage.getItem("id");
  const role = localStorage.getItem("role");

  const product = props.product;

  React.useEffect(() => {
    const fetchImage = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:8080${product.imageUrl}`,
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
  }, [product.imageUrl]);

  const addProductToFavorite = (productId) => {
    ApiService.post(`/favorites?userId=${id}&productId=${productId}`)
      .then((response) => {
        console.log("Product added to favorites!", response.data);
      })
      .catch((error) => {
        console.error(
          "There was an error adding the product to favorites!",
          error
        );
      });
  };

  const deleteProduct = (productId) => {
    ApiService.delete(`/products/${productId}`)
      .then((response) => {
        props.onDeleted(true);
      })
      .catch((error) => {
        console.error(
          "There was an error adding the product to favorites!",
          error
        );
      });
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
      <h1>{product.name.toUpperCase()}</h1>
      <h2>{product.category}</h2>
      <h4>${product.price}</h4>
      <h6>{product.description}</h6>
      {role == "ADMIN" ? (
        <div style={{ flexDirection: "row", display: "flex" }}>
          <button
            className="icon-button"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/edit-product", { state: { product } });
            }}
          >
            <FaRegEdit className="button-icon" />
          </button>
          <button
            className="icon-button"
            onClick={(e) => {
              e.stopPropagation();
              deleteProduct(product.id);
            }}
          >
            <MdDeleteOutline className="button-icon" size={22} />
          </button>
        </div>
      ) : (
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
              addProductToFavorite(product.id);
              navigate("/favorite");
            }}
          >
            <FaRegHeart className="button-icon" />
          </button>
        </div>
      )}
    </div>
  );
}

export default Product;
