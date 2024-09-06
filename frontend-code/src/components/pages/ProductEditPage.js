import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { LuImagePlus } from "react-icons/lu";

const ProductEditPage = () => {
  const location = useLocation();
  const { product } = location.state || {};

  const [imageSrc, setImageSrc] = React.useState(null);

  const [imageUrl, setImageUrl] = React.useState(product.imageUrl);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      productName: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
    },
  });

  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles) => {
    setImage(acceptedFiles[0]);
  }, []);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.productName);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("price", data.price);
      if (image) {
        formData.append("image", image);
      }

      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:8080/api/v1/products/${product.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/products", { replace: true });
    } catch (error) {
      console.error("Error:", error);
      // Handle error (e.g., show an error message)
    }
  };

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

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/*",
  });

  const removeImage = () => {
    if (imageUrl != null) {
      setImageUrl(null);
    } else {
      setImage(null);
    }
  };

  if (!product) {
    return <div>Ürün bulunamadı.</div>;
  }

  return (
    <div>
      <Navbar></Navbar>
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <h2 style={styles.header}>Edit Product</h2>
          <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Product Name</label>
              <input
                type="text"
                {...register("productName", {
                  required: "Product name is required",
                })}
                style={styles.input}
              />
              {errors.productName && (
                <p style={styles.error}>{errors.productName.message}</p>
              )}
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Price</label>
              <input
                type="number"
                {...register("price", { required: "Price is required" })}
                style={styles.input}
              />
              {errors.price && (
                <p style={styles.error}>{errors.price.message}</p>
              )}
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Category</label>
              <input
                type="text"
                {...register("category", { required: "Category is required" })}
                style={styles.input}
              />
              {errors.category && (
                <p style={styles.error}>{errors.category.message}</p>
              )}
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Description</label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                style={styles.textarea}
              />
              {errors.description && (
                <p style={styles.error}>{errors.description.message}</p>
              )}
            </div>
            {imageUrl != null ? (
              <div style={styles.imageContainer}>
                <img src={imageSrc} alt={""} style={styles.image} />
                <button style={styles.removeButton} onClick={removeImage}>
                  &times; {/* Veya bir ikon kullanabilirsiniz */}
                </button>
              </div>
            ) : image != null ? (
              <div style={styles.imageContainer}>
                <img
                  src={URL.createObjectURL(image)}
                  alt={image.name}
                  style={styles.image}
                />
                <button style={styles.removeButton} onClick={removeImage}>
                  &times; {/* Veya bir ikon kullanabilirsiniz */}
                </button>
              </div>
            ) : (
              <div style={styles.formGroup}>
                <div {...getRootProps({ style: styles.dropzone })}>
                  <input {...getInputProps()} />
                  <LuImagePlus size={"48px"} />
                  <p style={styles.dropzoneText}>
                    Drag & drop an image here, or click to select one
                  </p>
                </div>
              </div>
            )}
            <div style={styles.buttonContainer}>
              <button type="submit" style={styles.button}>
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f5f6fa",
    marginTop: 80,
    padding: 0,
  },
  container: {
    maxWidth: "600px",
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: "15px",
    padding: "40px",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
    display: "flex",
    flexDirection: "column",
    border: "1px solid #ddd",
    marginTop: "20px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  header: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginBottom: "30px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "25px",
  },
  label: {
    fontSize: "16px",
    color: "#444",
    marginBottom: "5px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    width: "100%",
    boxSizing: "border-box",
  },
  textarea: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    width: "100%",
    height: "80px",
    boxSizing: "border-box",
  },
  select: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    width: "100%",
    backgroundColor: "#ffffff",
    color: "#333",
  },
  dropzone: {
    padding: "20px",
    border: "2px dashed #555",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    color: "#333",
    textAlign: "center",
  },
  dropzoneText: {
    fontWeight: "bold",
    marginTop: "10px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    width: "100%",
    padding: "15px 25px",
    backgroundColor: "#b7a66a",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    fontSize: "18px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#9b8d52",
  },
  error: {
    color: "#e74c3c",
    fontSize: "14px",
    marginTop: "5px",
  },
  imageContainer: {
    position: "relative",
    display: "inline-block",
    justifyContent: "center",
    display: "flex",
    marginBottom: 30,
  },
  image: {
    height: "220px",
    borderRadius: "15px", // Köşe yuvarlama
  },
  removeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    color: "#e74c3c",
    cursor: "pointer",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
  },
};

export default ProductEditPage;
