import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Alert } from "bootstrap";

const height = window.innerHeight;

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "yaseminuuslu",
      password: "Yu.12345",
    },
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        data,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const token = response.data;

      const user = await axios.get("http://localhost:8080/api/v1/auth/info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(user.data);

      localStorage.setItem("token", token);

      localStorage.setItem("id", user.data.id);
      localStorage.setItem("username", user.data.username);
      localStorage.setItem("role", user.data.roles[0]);

      navigate("/home");
    } catch (error) {
      console.error("Login hatası:", error);
    }
  };

  return (
    <section className="vh-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-5 text-black">
            {" "}
            {/* Adjusted to 5 for 30% width */}
            <div className="px-5 ms-xl-4">
              <i
                className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4"
                style={{ color: "#876653" }} //6A3947
              ></i>
              <span className="h1 fw-bold mb-0" style={{ color: "#767674" }}>
                Yu'Store
              </span>
            </div>
            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
              <form
                style={{ width: "23rem", marginTop: "3rem" }}
                onSubmit={handleSubmit(onSubmit)}
              >
                <h3
                  className="fw-normal mb-3 pb-3"
                  style={{
                    letterSpacing: "1px",
                    marginLeft: "20px",
                    color: "#555",
                  }}
                >
                  Log in
                </h3>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="username"
                    className="form-control form-control-lg"
                    placeholder="Username"
                    {...register("username", {
                      required: "Kullanıcı adı gereklidir",
                    })}
                    style={{
                      fontSize: 18,
                      width: 400,
                      marginLeft: "20px",
                    }}
                  />
                  {errors.username && (
                    <p style={{ color: "red", marginLeft: "40px" }}>
                      {errors.username.message}
                    </p>
                  )}
                </div>

                <div className="form-outline mb-4">
                  <input
                    id="password"
                    type="password"
                    {...register("password", {
                      required: "Şifre gereklidir",
                    })}
                    className="form-control form-control-lg"
                    placeholder="Password"
                    style={{
                      fontSize: 18,
                      width: 400,
                      marginLeft: "20px",
                    }}
                  />
                  {errors.password && (
                    <p style={{ color: "red", marginLeft: "40px" }}>
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="pt-1 mb-4">
                  <button
                    className="btn btn-lg btn-block"
                    type="submit"
                    style={{
                      backgroundColor: "#876653",
                      color: "white",
                      width: 400,
                      marginLeft: "20px",
                    }}
                  >
                    Login
                  </button>
                </div>

                {/* "Hesabınız yoksa oluşturun" linki */}
                <div className="text-center">
                  <p style={{ marginLeft: "15px", fontSize: 16 }}>
                    Don't have an account?{" "}
                    <a href="/register" style={{ color: "#B3929A" }}>
                      Create one here
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>

          <div className="col-sm-7 px-0 d-none d-sm-block">
            <img
              src="/images/login2.jpeg"
              alt="login"
              className="w-100 vh-100"
              style={{ objectFit: "cover", objectPosition: "left" }}
            />
          </div>
        </div>
      </div>
    </section>
  );

  /*  <div style={{flexDirection:'row',display:'flex'}}>
    <div style={{flex:1,backgroundColor:'red',height:height}}>
    asd
    </div>
    
    <div style={{flex:1,backgroundColor:'yellow',height:'100%'}}>
asdas 
    </div>
  </div> */

  /*  <div className="login-container">
      <h1>Giriş Yap</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username">Kullanıcı Adı:</label>
          <input
            id="username"
            type="text"
            {...register('username', { required: 'Kullanıcı adı gereklidir' })}
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div>
          <label htmlFor="password">Şifre:</label>
          <input
            id="password"
            type="password"
            {...register('password', { required: 'Şifre gereklidir' })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit">Giriş Yap</button>
      </form>
    </div> */
};

export default LoginPage;
