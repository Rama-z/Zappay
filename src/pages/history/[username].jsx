import React, { useEffect, useState } from "react";
import Image from "next/image";
import Header from "src/Components/Header";
import Navbar from "src/Components/Navbar";
import Sidebar from "src/Components/Sidebar";
import Footer from "src/Components/Footer";
import css from "styles/History.module.css";
import user1 from "src/assets/1.png";
import { useDispatch, useSelector } from "react-redux";
import userAction from "src/redux/actions/user";
import Loading from "src/Components/Loading";
import { useRouter } from "next/router";

function Home() {
  const isData = true;
  const [filter, setFilter] = useState(false);
  const user = useSelector((state) => state.user);
  const [filtering, setFiltering] = useState(user.history);
  const [page, setPage] = useState(1);
  // const link = process.env.CLOUDINARY_LINK
  const link = `https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839`;
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(
      userAction.getUserHistoryThunk(
        auth.userData.token,
        `?page=${page}&limit=5&filter=MONTH`
      )
    );
  }, [auth, page]);
  return (
    <>
      <Header title={"HOME"} />
      <Navbar />
      <section className={css.container}>
        <div className={`col-lg-3 ${css.onMobile}`}>
          <Sidebar />
        </div>
        <aside className={css["bottom-right"]}>
          <div className={css["right-top"]}>
            <p className={css["transaction"]}>Transaction History</p>
            <div className={`${css.filter} ${css.filterHead}`}>
              <div
                onClick={() => {
                  setFilter(filter ? false : true);
                }}
              >
                -- Select Filter --
              </div>
              <div className={filter ? css.filterDownOn : css.filterDownOff}>
                <p
                  className={css.filterDownOn2}
                  onClick={() => {
                    setFiltering("send");
                    setFilter(filter ? false : true);
                  }}
                >
                  Send
                </p>
                <p
                  className={css.filterDownOn2}
                  onClick={() => {
                    setFiltering("accept");
                    setFilter(filter ? false : true);
                  }}
                >
                  Accept
                </p>
              </div>
            </div>
          </div>
          {!user.isLoading ? (
            <div>
              {user.history &&
                user.history.map((item) => {
                  return (
                    <div
                      className={css["card"]}
                      onClick={() => {
                        router.push(`/ammount/${item.id}`);
                      }}
                    >
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
                              ? css.recieve
                              : item.type === "topup"
                              ? css.recieve
                              : css.paid
                          }
                        >
                          {item.type === "accept"
                            ? `+${item.amount}`
                            : item.type === "topup"
                            ? `+${item.amount}`
                            : `-${item.amount}`}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <Loading />
          )}
          <div className={`${css["paginasi"]}`}>
            <button
              type="submit"
              className={`${css["previous-button"]} btn ${
                user.pagination.page === 1 ? `btn-secondary` : `btn-primary`
              } `}
              disabled={user.pagination.page === 1}
              onClick={() => {
                setPage(page - 1);
              }}
            >
              Previous
            </button>
            <button
              type="submit"
              className={`${css["next-button"]} btn ${
                user.pagination.page === user.pagination.totalPage
                  ? `btn-secondary`
                  : `btn-primary`
              } `}
              disabled={user.pagination.page === user.pagination.totalPage}
              onClick={() => {
                setPage(page + 1);
              }}
            >
              Next
            </button>
          </div>
        </aside>
      </section>
      <Footer />
    </>
  );
}

export default Home;
