import React, { useEffect, useState } from "react";
import Image from "next/image";
import Header from "src/Components/Header";
import Navbar from "src/Components/Navbar";
import Sidebar from "src/Components/Sidebar";
import Footer from "src/Components/Footer";
import css from "styles/Ammount.module.css";
import user1 from "src/assets/1.png";
import { useRouter } from "next/router";
import pen from "src/assets/Vector-pen.png";
import { useDispatch, useSelector } from "react-redux";
import authAction from "src/redux/actions/auth";
import userAction from "src/redux/actions/user";
import sample from "src/assets/avatar.webp";
import { actionStrings } from "src/redux/actions/actionStrings";
import transferDataActions from "src/redux/actions/transfer";

function Home() {
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const link = process.env.NEXT_PUBLIC_CLOUDINARY_LINK;
  const [body, setBody] = useState({});
  const [filter, setFilter] = useState(false);
  const dispatch = useDispatch();

  const changeHandler = (e) =>
    setBody({ ...body, id: router.query.id, [e.target.name]: e.target.value });

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(transferDataActions.transferData(body));
  };
  const currency = (price) => {
    return (
      "Rp. " +
      parseFloat(price)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    );
  };
  useEffect(() => {
    dispatch(
      userAction.getUserDetail2Thunk(auth.userData.token, router.query.id)
    );
  }, [auth, dispatch, router.query.id]);

  return (
    <>
      <Header title={"HOME"} />
      <Navbar />
      <div className={css.container}>
        <div className={`col-lg-3 ${css.onMobile}`}>
          <Sidebar />
        </div>
        <section className={`${css.side}`}>
          <aside className={css["bottom-right"]}>
            <div className={css["right-top"]}>
              <p className={css["transaction"]}>Transfer To</p>
            </div>
            <div className={css["card"]}>
              <div className={css["image-name"]}>
                <Image
                  src={
                    user.profileTarget.image
                      ? `${link}/${user.profileTarget.image}`
                      : sample
                  }
                  alt="user"
                  width={56}
                  height={56}
                />
                <div>
                  <p className={css["username"]}>
                    {user.profileTarget.firstName}
                    {user.profileTarget.lastName}
                  </p>
                  <p className={css.status}>
                    {user.profileTarget.noTelp || "-"}
                  </p>
                </div>
              </div>
            </div>
            <div className={css["right-top2"]}>
              <div className={css.type}>
                Type the amount you want to transfer and then press continue to
                the next steps.
              </div>
            </div>
            <form onSubmit={submitHandler}>
              <div className={css["input-transfer"]}>
                <input
                  className={css.searchImage}
                  type="text"
                  name="ammount"
                  placeholder="0.00"
                  onChange={changeHandler}
                />
              </div>
              <div className={css.availability}>
                {currency(user.profile.balance)} Available
              </div>
              <div className={css["input-transfer2"]}>
                <Image className={css["image-pen"]} src={pen} alt="pen" />
                <input
                  className={css.notes}
                  type="text"
                  name="notes"
                  placeholder="Add some notes"
                  onChange={changeHandler}
                />
              </div>
              <div className={css.continue1}>
                <button
                  type="submit"
                  className={css.continue}
                  onClick={() => {
                    router.push(`/transfer/confirmation/${router.query.id}`);
                  }}
                >
                  Continue
                </button>
              </div>
            </form>
          </aside>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Home;
