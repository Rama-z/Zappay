import React, { useState } from "react";
import Image from "next/image";
import profile from "src/assets/profile.png";
import css from "src/styles/Navbar.module.css";
import Sidebar from "components/Sidebar";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import sample from "src/assets/avatar.webp";

function Navbar({ children }) {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const user = useSelector((state) => state.user);
  // const link = process.env.CLOUDINARY_LINK;
  const link = `https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839`;

  const notifHandler = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  const sidebarHandler = (e) => {
    e.preventDefault();
    show === true && setShow(false);
  };

  return (
    <>
      <div className={css["navbar"]}>
        <div className={css["navbar-left"]}>
          <div className={css["on-mobile"]} onClick={sidebarHandler}>
            <Sidebar />
          </div>
          <p
            className={css.title}
            onClick={() => {
              router.push("/");
            }}
          >
            FazzPay
          </p>
        </div>
        <div className={css["navbar-right"]}>
          <div className={css["mobile"]}>
            <Image
              src={
                user.profile.image ? `${link}/${user.profile.image}` : sample
              }
              alt="profile"
              style={{ cursor: "pointer" }}
              layout="fill"
              objectFit="cover"
            />
            <div className={css["name-phone"]}>
              <p className={css["greating"]}>Hello,</p>
              <p className={css["navbar-name"]}>
                {user.profile.firstName} {user.profile.lastName}
              </p>
              {/* <p className={css["navbar-phone"]}>+62 8139 3877 7946</p> */}
            </div>
          </div>
          <div className={css["pc"]}>
            <div className={css["image-profile"]}>
              <Image
                src={
                  user.profile.image ? `${link}/${user.profile.image}` : sample
                }
                alt="profile"
                style={{ cursor: "pointer" }}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className={css["name-phone"]}>
              <p className={css["navbar-name"]}>
                {user.profile.firstName} {user.profile.lastName}
              </p>
              <p className={css["navbar-phone"]}>{user.profile.noTelp}</p>
            </div>
          </div>
          <i
            className="fa-regular fa-bell"
            onClick={notifHandler}
            style={{
              fontSize: "1.6rem",
              color: "#4D4B57",
              marginLeft: "1rem",
              cursor: "pointer",
            }}
          ></i>
        </div>
      </div>
      {show && (
        <>
          <div className={css.modal}>
            <div className={css.card}>
              <i
                className="fa-solid fa-arrow-down"
                style={{
                  color: "#1EC15F",
                  fontSize: "30px",
                  marginBottom: "0.5rem",
                }}
              ></i>
              <div style={{ lineHeight: "15px" }}>
                <p className={css["name"]}>Accept from Joshua Lee</p>
                <p className={css["price"]}>Rp220.000</p>
              </div>
            </div>
            <div className={css.card}>
              <i
                className="fa-solid fa-arrow-up"
                style={{
                  color: "#FF5B37",
                  fontSize: "30px",
                  marginBottom: "0.5rem",
                }}
              ></i>
              <div style={{ lineHeight: "15px" }}>
                <p className={css["name"]}>Transfer to Deni</p>
                <p className={css["price"]}>Rp149.000</p>
              </div>
            </div>
            <div className={css.card}>
              <i
                className="fa-solid fa-arrow-down"
                style={{
                  color: "#1EC15F",
                  fontSize: "30px",
                  marginBottom: "0.5rem",
                }}
              ></i>
              <div style={{ lineHeight: "15px" }}>
                <p className={css["name"]}>Accept from Joshua Lee</p>
                <p className={css["price"]}>Rp220.000</p>
              </div>
            </div>
            <div className={css.card}>
              <i
                className="fa-solid fa-arrow-up"
                style={{
                  color: "#FF5B37",
                  fontSize: "30px",
                  marginBottom: "0.5rem",
                }}
              ></i>
              <div style={{ lineHeight: "15px" }}>
                <p className={css["name"]}>Transfer to Deni</p>
                <p className={css["price"]}>Rp149.000</p>
              </div>
            </div>
            <div className={css.card}>
              <i
                className="fa-solid fa-arrow-down"
                style={{
                  color: "#1EC15F",
                  fontSize: "30px",
                  marginBottom: "0.5rem",
                }}
              ></i>
              <div style={{ lineHeight: "15px" }}>
                <p className={css["name"]}>Accept from Joshua Lee</p>
                <p className={css["price"]}>Rp220.000</p>
              </div>
            </div>
            <div className={css.card}>
              <i
                className="fa-solid fa-arrow-up"
                style={{
                  color: "#FF5B37",
                  fontSize: "30px",
                  marginBottom: "0.5rem",
                }}
              ></i>
              <div style={{ lineHeight: "15px" }}>
                <p className={css["name"]}>Transfer to Deni</p>
                <p className={css["price"]}>Rp149.000</p>
              </div>
            </div>
            <div className={css.card}>
              <i
                className="fa-solid fa-arrow-down"
                style={{
                  color: "#1EC15F",
                  fontSize: "30px",
                  marginBottom: "0.5rem",
                }}
              ></i>
              <div style={{ lineHeight: "15px" }}>
                <p className={css["name"]}>Accept from Joshua Lee</p>
                <p className={css["price"]}>Rp220.000</p>
              </div>
            </div>
            <div className={css.card}>
              <i
                className="fa-solid fa-arrow-up"
                style={{
                  color: "#FF5B37",
                  fontSize: "30px",
                  marginBottom: "0.5rem",
                }}
              ></i>
              <div style={{ lineHeight: "15px" }}>
                <p className={css["name"]}>Transfer to Deni</p>
                <p className={css["price"]}>Rp149.000</p>
              </div>
            </div>
          </div>
        </>
      )}
      {children}
    </>
  );
}

export default Navbar;
