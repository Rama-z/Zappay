import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Layout from "components/LayoutAuth";
import PageTitle from "components/Header";
import styles from "styles/Login.module.css";
import authAction from "src/redux/actions/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userAction from "src/redux/actions/user";
import { useRouter } from "next/router";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [emptyForm, setEmptyForm] = useState(true);
  const [unouthorized, setUnouthorized] = useState(false);
  const [body, setBody] = useState({});
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const router = useRouter();

  const checkEmptyForm = (body) => {
    if (!body.email || !body.password) return setEmptyForm(true);
    body.email && body.password && setEmptyForm(false);
  };

  const togglePassword = () => setShowPassword(!showPassword);

  const changeHandler = (e) =>
    setBody({ ...body, [e.target.name]: e.target.value });

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(authAction.loginThunk(body));
  };

  useEffect(() => {
    checkEmptyForm(body);
  }, [body]);

  useEffect(() => {
    if (auth.isLoading) setEmptyForm(true);
    if (auth.isFulfilled) {
      dispatch(
        userAction.getUserDetailThunk(auth.userData.token, auth.userData.id)
      );
      if (!auth.userData.pin) {
        toast.success(`Login Success! Please Create Your Pin`);
        router.push("/createpin");
      }
      if (auth.userData.pin) {
        toast.success(`Login Success! welcome ${body.email}`);
        router.push(`/dashboard/${user.profile.firstName}`);
      }
    }
  }, [auth]);

  useEffect(() => {
    if (auth.isError) {
      if (auth.err === "Account not active")
        toast.error(
          `${auth.err}, Please check your email and activate your account`
        );
      if (auth.err === "Wrong password")
        toast.error(`${auth.err}, Please make sure your password is right `);
    }
  }, [auth]);

  return (
    <>
      <PageTitle title="Login" />

      <Layout>
        <h1 className={styles["h1"]}>
          Start Accessing Banking Needs With All Devices and All Platforms With
          30.000+ Users
        </h1>
        <p className={styles["description"]}>
          Transfering money is eassier than ever, you can access Zwallet
          wherever you are. Desktop, laptop, mobile phone? we cover all of that
          for you!
        </p>
        <form className={styles["form"]} onSubmit={loginHandler}>
          <div className={styles["email"]}>
            <i className="bi bi-envelope"></i>
            <input
              type="email"
              name="email"
              placeholder="Enter your e-mail"
              required
              onChange={changeHandler}
            ></input>
          </div>
          <div className={styles["password"]}>
            <i className="bi bi-lock"></i>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              required
              onChange={changeHandler}
            ></input>
            <i
              className={`bi ${showPassword ? `bi-eye-slash` : `bi-eye`} 
            ${styles["toggle-password"]}`}
              onClick={togglePassword}
            ></i>
          </div>
          <div className={styles["link-forgot"]}>
            <Link href="/forgot" passHref>
              Forgot password?
            </Link>
          </div>
          <button type="submit" disabled={emptyForm}>
            Login
          </button>
          <div className={styles["link-blue"]}>
            Don’t have an account? Let’s{"  "}
            <Link href="/register">Register</Link>
          </div>
        </form>
      </Layout>
    </>
  );
}
