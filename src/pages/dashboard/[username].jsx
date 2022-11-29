import React, { useEffect, useState } from "react";
import { currency as currencyComma } from "src/modules/helpers/currency";
import Image from "next/image";
import Header from "src/Components/Header";
import Navbar from "src/Components/Navbar";
import Sidebar from "src/Components/Sidebar";
import Footer from "src/Components/Footer";
import css from "styles/Home.module.css";
import user1 from "src/assets/1.png";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import userAction from "src/redux/actions/user";
// import { createSearchParams, useSearchParams } from "react-router-dom";

function Home({ children }) {
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const router = useRouter();
  const link = process.env.NEXT_PUBLIC_CLOUDINARY_LINK;
  const dispatch = useDispatch();
  // const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({});
  const currency = (price) => {
    return (
      "Rp. " +
      parseFloat(price)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    );
  };
  useEffect(() => {
    if (auth.isFulfilled)
      dispatch(
        userAction.getUserExpenseThunk(auth.userData.token, auth.userData.id)
      );
    dispatch(
      userAction.getUserHistoryThunk(
        auth.userData.token,
        `?page=1&limit=5&filter=MONTH`
      )
    );
    dispatch(
      userAction.getUserDetailThunk(auth.userData.token, auth.userData.id)
    );
  }, [auth, dispatch]);

  return (
    <>
      <Header title={"HOME"} />
      <Navbar>
        <div className={css.container}>
          <div className={`col-lg-3 ${css.onMobile}`}>
            <Sidebar />
          </div>
          <div className="col-lg-9">
            <aside className={css.side}>
              <div className={css["side-top"]}>
                <div className={css["top-left"]}>
                  <p className={css.balance}>Balance</p>
                  <p className={css.price}>{currency(user.profile.balance)}</p>
                  <p className={css.phone}>{user.profile.noTelp}</p>
                </div>
                <div className={`${css["top-btn"]} ${css.btnHide}`}>
                  <div className={css.btn}>
                    <i className="fa-sharp fa-solid fa-arrow-up"></i>
                    <p>Transfer</p>
                  </div>
                  <div className={css.btn}>
                    <i className="fa-solid fa-plus"></i>
                    <p>Top Up</p>
                  </div>
                </div>
              </div>
              <div className={`${css["top-btn"]} ${css.hide}`}>
                <div className={css.btn}>
                  <i className="fa-sharp fa-solid fa-arrow-up"></i>
                  <p>Transfer</p>
                </div>
                <div className={css.btn}>
                  <i className="fa-solid fa-plus"></i>
                  <p>Top Up</p>
                </div>
              </div>
              <div className={css["bottom"]}>
                <aside className={css["right-side"]}>
                  <div className={css["left-top"]}>
                    <div>
                      <i
                        className="fa-solid fa-arrow-down"
                        style={{
                          color: "#1EC15F",
                          fontSize: "30px",
                          marginBottom: "0.5rem",
                        }}
                      ></i>
                      <p style={{ color: "#6A6A6A" }}>Income</p>
                      <p
                        style={{
                          fontWeight: "700",
                          fontSize: "18px",
                          marginTop: "0.5rem",
                        }}
                      >
                        {currencyComma(user.dashboard.totalIncome)}
                      </p>
                    </div>
                    <div>
                      <i
                        className="fa-solid fa-arrow-up"
                        style={{
                          color: "#FF5B37",
                          fontSize: "30px",
                          marginBottom: "0.5rem",
                        }}
                      ></i>
                      <p style={{ color: "#6A6A6A" }}>Expense</p>
                      <p
                        style={{
                          fontWeight: "700",
                          fontSize: "18px",
                          marginTop: "0.5rem",
                        }}
                      >
                        Rp{currencyComma(user.dashboard.totalExpense)}
                      </p>
                    </div>
                  </div>
                  <div className={css["left-middle"]}>
                    <p className={css["plus"]}>+Rp65.000</p>
                    <div className={css["static"]}>
                      <div className={css.sat}></div>
                      <p>Sat</p>
                    </div>
                    <div className={css["static"]}>
                      <div className={css.sun}></div>
                      <p>Sun</p>
                    </div>
                    <div className={css["static"]}>
                      <div className={css.mon}></div>
                      <p>Mon</p>
                    </div>
                    <div className={css["static"]}>
                      <div className={css.tue}>
                        <div className={css.circle}></div>
                        <div className={css["circle-blue"]}></div>
                      </div>
                      <p>Tue</p>
                    </div>
                    <div className={css["static"]}>
                      <div className={css.wed}></div>
                      <p>Wed</p>
                    </div>
                    <div className={css["static"]}>
                      <div className={css.thu}></div>
                      <p>Thu</p>
                    </div>
                    <div className={css["static"]}>
                      <div className={css.fri}></div>
                      <p>Fri</p>
                    </div>
                  </div>
                </aside>
                <div className={css["bottom-right"]}>
                  <div className={css["right-top"]}>
                    <p className={css["transaction"]}>Transaction History</p>
                    <p
                      className={css["seall"]}
                      onClick={() => {
                        router.push(`/history/${user.profile.firstName}`);
                      }}
                    >
                      See all
                    </p>
                  </div>
                  {user.history &&
                    user.history.map((item, idx) => {
                      return (
                        <div className={css["card"]} key={idx}>
                          <div className={css["image-name"]}>
                            <Image
                              src={item.image ? `${link}/${item.image}` : user1}
                              alt="user"
                              width={56}
                              height={56}
                            />
                            <div>
                              <p className={css["username"]}>{item.fullName}</p>
                              <p className={css.status}>{item.type}</p>
                            </div>
                          </div>
                          <div>
                            <p
                              className={
                                item.type === "accept"
                                  ? css.recive
                                  : item.type === "topup"
                                  ? css.recive
                                  : css.paid
                              }
                            >
                              {item.type === "accept"
                                ? `+${currency(item.amount)}`
                                : item.type === "topup"
                                ? `+${currency(item.amount)}`
                                : `-${currency(item.amount)}`}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </aside>
          </div>
        </div>
        <Footer />
      </Navbar>
    </>
  );
}

export default Home;
