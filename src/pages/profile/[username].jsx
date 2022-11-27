import React from "react";
import Header from "components/Navbar";
import Sidebar from "components/Sidebar";
import Footer from "components/Footer";
import css from "styles/Profile.module.css";
import Image from "next/image";

import sample from "../../assets/avatar.webp";
import { useSelector } from "react-redux";

function index() {
  const user = useSelector((state) => state.user);
  return (
    <>
      <Header title={"HOME"} />
      <main className={css["container"]}>
        <div className="container">
          <div className={`row ${css["main-content"]}`}>
            <div className="col-lg-3 col-md-4">
              <Sidebar />
            </div>
            <div className="col-lg-9 col-md-8 col-12">
              <div className={css["profile-content"]}>
                <div className={css["profile-detail"]}>
                  <div className={css["top-content"]}>
                    <div className={css["photo"]}>
                      <Image
                        alt="profile"
                        src={sample}
                        placeholder="blur"
                        blurDataURL={"./assets/avatar.jpg"}
                        onError={() => "./assets/avatar.jpg"}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className={css["name-phone"]}>
                      <div className={css["edit"]}>
                        <i className="fa-solid fa-pen"></i>
                        <p>Edit</p>
                      </div>
                      <div className={css["name"]}>
                        <p>
                          {user.profile.firstName} {user.profile.lastName}
                        </p>
                      </div>
                      <div className={css["phone"]}>
                        <p>{user.profile.noTelp}</p>
                      </div>
                    </div>
                  </div>
                  <div className={css["profile-btn"]}>
                    <button>
                      <p>Personal Information</p>
                      <span>
                        <i className="fa-solid fa-arrow-right"></i>
                      </span>
                    </button>
                    <button>
                      <p>Change Password</p>
                      <span>
                        <i className="fa-solid fa-arrow-right"></i>
                      </span>
                    </button>
                    <button>
                      <p>Change PIN</p>
                      <span>
                        <i className="fa-solid fa-arrow-right"></i>
                      </span>
                    </button>
                    <button>Logout </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default index;
