import React, { useEffect, useState } from "react";
import Header from "src/Components/Navbar";
import Sidebar from "src/Components/Sidebar";
import Footer from "src/Components/Footer";
import css from "styles/Profile.module.css";
import Image from "next/image";
import ModalLogout from "src/Components/ModalLogout";

import sample from "../../assets/avatar.webp";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import authAction from "src/redux/actions/auth";
import userAction from "src/redux/actions/user";

function Profile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const logoutMsg = useSelector((state) => state.auth.logoutMsg);
  const [openModal, setOpenModal] = useState(false);
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.user.profile);
  // const link = process.env.CLOUDINARY_LINK;
  const link = `https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839`;
  const inputFileRef = React.createRef();
  const [modalOpen, setModalOpen] = useState(false);
  const modalhandler = () => setModalOpen(!modalOpen);

  const inputImage = () => {
    inputFileRef.current.click();
  };

  const toInfo = () => {
    router.push("/profile/information");
  };

  const toChangePwd = () => {
    router.push("/profile/change-password");
  };

  const toChangePin = () => {
    router.push("/profile/change-pin");
  };

  const editImageHandler = (e) => {
    const body = new FormData();
    body.append("image", e.target.files[0]);

    dispatch(
      userAction.editImageThunk(auth.userData.token, auth.userData.id, body)
    );
  };

  useEffect(() => {
    dispatch(
      userAction.getUserDetailThunk(auth.userData.token, auth.userData.id)
    );
  }, [auth, dispatch]);

  return (
    <>
      <Header title={"HOME"} />
      <main className={`${css.container}`}>
        <div className={`col-lg-3 ${css.onMobile}`}>
          <Sidebar />
        </div>
        <aside className={`${css["bottom-right"]} ${css.side}`}>
          <div className={`${css["main-content"]}`}>
            <div className={css["profile-content"]}>
              <div className={css["profile-detail"]}>
                <div className={css["top-content"]}>
                  <div className={css["photo"]}>
                    <Image
                      alt="profile"
                      src={!profile.image ? sample : `${link}/${profile.image}`}
                      placeholder="blur"
                      blurDataURL={"./assets/avatar.jpg"}
                      onError={() => "./assets/avatar.jpg"}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <input
                    type="file"
                    name="image"
                    hidden={true}
                    ref={inputFileRef}
                    onChange={(e) => {
                      editImageHandler(e);
                    }}
                  />
                  <div className={css["name-phone"]}>
                    <div className={css["edit"]} onClick={inputImage}>
                      <i className="fa-solid fa-pen"></i>
                      <p>Edit</p>
                    </div>
                    <div className={css["name"]}>
                      <p>{`${profile.firstName} ${profile.lastName}`}</p>
                    </div>
                    <div className={css["phone"]}>
                      <p>
                        {!profile.noTelp
                          ? "+62-xx-xxxx-xxxx"
                          : `+62${profile.noTelp}`}
                      </p>
                    </div>
                  </div>
                </div>
                <div className={css["profile-btn"]}>
                  <button onClick={toInfo}>
                    <p>Personal Information</p>
                    <span>
                      <i className="fa-solid fa-arrow-right"></i>
                    </span>
                  </button>
                  <button onClick={toChangePwd}>
                    <p>Change Password</p>
                    <span>
                      <i className="fa-solid fa-arrow-right"></i>
                    </span>
                  </button>
                  <button onClick={toChangePin}>
                    <p>Change PIN</p>
                    <span>
                      <i className="fa-solid fa-arrow-right"></i>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </main>
      <Footer />
    </>
  );
}

export default Profile;
