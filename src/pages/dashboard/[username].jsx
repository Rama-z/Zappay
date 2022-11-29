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
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

function Home({ children }) {
  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const router = useRouter();
  const link = process.env.NEXT_PUBLIC_CLOUDINARY_LINK;
  const dispatch = useDispatch();
  const statistic = useSelector((state) => state.user.dashboard);
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
    if (user.isError) router.push("/login");
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

  const incomeData = {
    label: "Income",
    data: statistic.listIncome
      ? [
          statistic.listIncome[5].total,
          statistic.listIncome[6].total,
          statistic.listIncome[0].total,
          statistic.listIncome[1].total,
          statistic.listIncome[2].total,
          statistic.listIncome[3].total,
          statistic.listIncome[4].total,
        ]
      : [],
    backgroundColor: "#6379F4",
  };

  const expenseData = {
    label: "Expense",
    data: statistic.listExpense
      ? [
          statistic.listExpense[5].total,
          statistic.listExpense[6].total,
          statistic.listExpense[0].total,
          statistic.listExpense[1].total,
          statistic.listExpense[2].total,
          statistic.listExpense[3].total,
          statistic.listExpense[4].total,
        ]
      : [],
    backgroundColor: "#9DA6B5",
  };

  const data = {
    labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [incomeData, expenseData],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    legend: {
      label: {
        fontSize: 14,
        fontFamily: "Nunito Sans",
      },
    },
  };
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
                  <p className={css.phone}>+62{user.profile.noTelp}</p>
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
                        className="fa-solid fa-arrow-down mt-5"
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
                        className="fa-solid fa-arrow-up mt-5"
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
                  <Bar
                    data={data}
                    options={chartOptions}
                    className={css.bartrans}
                    height={200}
                  />
                </aside>
                <div className={css["bottom-right"]}>
                  <div className={css["right-top"]}>
                    <p className={css["transaction"]}>Transaction History</p>
                    <p
                      className={css["seall"]}
                      onClick={() => {
                        router.push(`/history`);
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
