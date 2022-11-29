import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import transferDataActions from "src/redux/actions/transfer";
import userAction from "src/redux/actions/user";
import styles from "src/styles/Modal.module.css";
const ReactCodeInput = dynamic(import("react-code-input"));

const ModalConfirm = ({ open, setOpen }) => {
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const transfer = useSelector((state) => state.transfer);
  const dispatch = useDispatch();
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [btnAccess, setBtn] = useState(false);
  const [errPin, setErrpin] = useState();
  const navigate = () => {
    router.push("/transfer/status");
  };

  const transferHandler = () => {
    dispatch(
      transferDataActions.transferThunk(
        auth.userData.token,
        {
          receiverId: transfer.transferData.receiverId,
          amount: transfer.transferData.amount,
          notes: transfer.transferData.notes,
        },
        navigate
      )
    );
  };

  const checkPinHandler = async (e) => {
    e.preventDefault();
    setOpen(!open);
    setErrpin();
    if (!btnAccess) return;
    dispatch(
      userAction.checkPinThunk(pin, auth.userData.token, transferHandler)
    );
  };

  const pinHandler = (e) => {
    setPin(e);
  };

  useEffect(() => {
    if (pin.length === 6) setBtn(true);
    if (pin.length < 6) setBtn(false);
  }, [pin]);

  useEffect(() => {
    if (transfer.isLoading) setBtn(true);
    if (!transfer.isLoading) setBtn(false);
    // if (user.pinWorng) setErrpin("Pin Worng !");
    // if (users.isFulfilled) {
    // const sendData = {
    //   receiverId: transaction.transfer.receiverId,
    //   amount: transaction.transfer.total,
    //   notes: transaction.transfer.notes,
    // };
    // dispatch(
    //   transactionAction.createTransactionThunk(sendData, auth.userData.token)
    // );
    //   if (transaction.statusTransfer) router.push("/transfer/status");
    // }
    //   dispatch(userAction.resetpinMsgThunk());
    // }
    // if (users.pinMsg) {
    //   router.push("/transfer/status");
    // }
  }, [user, auth, dispatch, transfer, router]);
  return (
    <>
      {open && (
        <div>
          <div className={styles.modal}>
            <div className={styles["modal-content"]}>
              <div className={styles["pin-container"]}>
                <div className={styles.title}>
                  <h2 className={styles["h2"]}>Enter PIN to Transfer</h2>
                  <p className={styles["description"]}>
                    Enter your 6 digits Fazzpay PIN for confirmation to continue
                    transfering money.
                  </p>
                </div>
                <div className={styles["form-container"]}>
                  <form className={styles["form"]}>
                    <div className={styles["otp-input"]}>
                      <ReactCodeInput
                        type="password"
                        fields={6}
                        className={styles["otp-box"]}
                        onChange={pinHandler}
                      />
                    </div>
                    {errPin && (
                      <p style={{ color: "var(--red)", fontWeight: "700" }}>
                        {errPin}
                      </p>
                    )}
                    <div
                      onClick={checkPinHandler}
                      className={btnAccess ? undefined : styles["not-accept"]}
                      style={{ justifyContent: "right", display: "flex" }}
                    >
                      <button type="submit">Confirm</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/*<div className={styles.modal}>
            <div className={styles["modal-content"]}>
              <div className={styles["modal-header"]}>
                <p className={styles["modal-title"]}>Logout</p>
              </div>
              <div className={styles["modal-body"]}>Are you sure?</div>
              <div className={styles["modal-footer"]}>
                <button className={styles.button}>yes</button>
                <button
                  className={styles.button}
                  onClick={() => setOpen(!open)}
                >
                  no
                </button>
              </div>
            </div>
          </div>*/}
        </div>
      )}
    </>
  );
};

export default ModalConfirm;
