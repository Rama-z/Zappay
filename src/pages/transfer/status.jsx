import React from "react";
import Image from "next/image";
import styles from "styles/status.module.css";
import Sidebar from "src/Components/Sidebar";
import profile from "src/assets/profile.png";
import Header from "src/Components/Header";
import Navbar from "src/Components/Navbar";
import Footer from "src/Components/Footer";
import { useRouter } from "next/router";
import success from "src/assets/success.png";
import failed from "src/assets/failed.png";
import { useSelector } from "react-redux";
import sample from "src/assets/avatar.webp";

function Status() {
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const transfer = useSelector((state) => state.transfer);
  const newDate = new Date();
  const month = newDate.toLocaleString("en-US", { month: "long" });
  const year = newDate.getFullYear();
  const date = newDate.getDate();
  const hour = newDate.getHours();
  const minute = newDate.getMinutes();
  const link = process.env.NEXT_PUBLIC_CLOUDINARY_LINK;

  return (
    <>
      <Header title={"Status"} />
      <Navbar>
        <div className={styles["main-status"]}>
          <div className="col-lg-3">
            <Sidebar />
          </div>
          <div className={`col-lg-9 ${styles["status-info"]}`}>
            <div className={styles.status}>
              <div className={styles["contact-item"]}>
                <div className={styles["img"]}>
                  <Image
                    src={success}
                    placeholder={"empty"}
                    alt="profile"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
            </div>
            <p className={styles["status-text"]}>
              {transfer.isFulfilled ? "Transfer Success" : "Transfer Failed"}
            </p>
            <div className={styles["info"]}>
              <div className={styles["item-container"]}>
                <p className={styles["info-label"]}>Amount</p>
                <p className={styles["info-value"]}>
                  {transfer.transferData.amount}
                </p>
              </div>
              <div className={styles["item-container"]}>
                <p className={styles["info-label"]}>Balance Left</p>
                <p className={styles["info-value"]}>{user.profile.balance}</p>
              </div>
              <div className={styles["item-container"]}>
                <p className={styles["info-label"]}>Date & Time</p>
                <p className={styles["info-value"]}>
                  {month} {date}, {year} - {hour}.{minute}
                </p>
              </div>
              <div className={styles["item-container"]}>
                <p className={styles["info-label"]}>Notes</p>
                <p className={styles["info-value"]}>
                  {transfer.transferData.notes}
                </p>
              </div>
            </div>
            <section className={styles["receiver"]}>
              <p className={styles["title"]}>Transfer to</p>
              <div className={styles["contact-item"]}>
                <div className={styles["img"]}>
                  <Image
                    src={
                      user.profileTarget.image
                        ? `${link}/${user.profileTarget.image}`
                        : sample
                    }
                    placeholder={"empty"}
                    alt="profile"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className={styles["name-phone"]}>
                  <p className={styles["name"]}>
                    {user.profileTarget.firstName} {user.profileTarget.lastName}
                  </p>
                  <p className={styles["phone"]}>{user.profileTarget.noTelp}</p>
                </div>
              </div>
            </section>
            <section className={styles["buttons"]}>
              <a href="" target="_blank" rel="noreferrer">
                <button className={`btn ${styles["download"]}`}>
                  <i
                    className={`fa fa-download ${styles["icon-fontawesome"]}`}
                    aria-hidden="true"
                  ></i>
                  Download PDF
                </button>
              </a>
              <button
                className={`btn btn-primary ${styles["home"]}`}
                onClick={() => {
                  router.push(`/dashboard/${user.profile.firstName}`);
                }}
              >
                Back to Home
              </button>
            </section>
          </div>
        </div>
        <Footer />
      </Navbar>
    </>
  );
}

export default Status;
