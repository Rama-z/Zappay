import React, { useState } from "react";
import Image from "next/image";
import Header from "components/Header";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import Footer from "components/Footer";
import css from "styles/Confirmation.module.css";
import user from "src/assets/1.png";
import { useRouter } from "next/router";
// import { toast } from "react-toastify";
import Modal from "src/components/ModalConfirm";
import { useSelector } from "react-redux";
import sample from "src/assets/avatar.webp";

function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const transfer = useSelector((state) => state.transfer);
  const router = useRouter();
  const newDate = new Date();
  const month = newDate.toLocaleString("en-US", { month: "long" });
  const year = newDate.getFullYear();
  const date = newDate.getDate();
  const hour = newDate.getHours();
  const minute = newDate.getMinutes();
  const modalhandler = () => setModalOpen(!modalOpen);
  // const link = process.env.CLOUDINARY_LINK;
  const link = `https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839`;

  return (
    <>
      <Header title={"HOME"} />
      <Navbar />
      <div className={css.container}>
        <div className={`col-lg-3 ${css.onMobile}`}>
          <Sidebar />
        </div>
        <section className={css.side}>
          <aside className={css["bottom-right"]}>
            <div className={css["right-top"]}>
              <p className={css["transaction"]}>Transfer To</p>
            </div>
            <div className={css["card"]}>
              <div className={css["image-name"]}>
                <Image
                  src={
                    user.profileTarget.image
                      ? `${link}${user.profileTarget.image}`
                      : sample
                  }
                  alt="user"
                  width={56}
                  height={56}
                />
                <div>
                  <p className={css["username"]}>
                    {user.profileTarget.firstName} {user.profileTarget.lastName}
                  </p>
                  <p className={css.status}>
                    {user.profileTarget.noTelp || "-"}
                  </p>
                </div>
              </div>
            </div>
            <div className={css["right-top2"]}>
              <p className={css["transaction"]}>Details</p>
            </div>
            <div className={css["card-detail"]}>
              <div>
                <p className={css.details}>Amount</p>
                <p className={css.subdetails}>
                  Rp{transfer.transferData.amount}
                </p>
              </div>
            </div>
            <div className={css["card-detail"]}>
              <div>
                <p className={css.details}>Balance</p>
                <p className={css.subdetails}>Rp{user.profile.balance}</p>
              </div>
            </div>
            <div className={css["card-detail"]}>
              <div>
                <p className={css.details}>Date & Time</p>
                <p className={css.subdetails}>
                  {month} {date}, {year} - {hour}.{minute}
                </p>
              </div>
            </div>
            <div className={css["card-detail"]}>
              <div>
                <p className={css.details}>Notes</p>
                <p
                  className={css.subdetailsNotes}
                  placeholder="Type your note here"
                >
                  {transfer.transferData.notes}
                </p>
              </div>
            </div>
            <div
              className={css.continue1}
              onClick={() => {
                modalhandler();
              }}
            >
              <button className={css.continue}>Continue</button>
            </div>
          </aside>
        </section>
        <Modal open={modalOpen} setOpen={setModalOpen} />
      </div>
      <Footer />
    </>
  );
}

export default Home;
