import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import styles from "src/styles/Modal.module.css";
import authAction from "src/redux/actions/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const ModalLogout = ({ open, setOpen }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(authAction.logoutThunk());
    toast.success(`Success logout`);
    router.push("/");
  };

  return (
    <>
      {open && (
        <div>
          <div className={styles.modal}>
            <div className={styles["modal-content"]}>
              <div className={styles.text}>
                Are you sure you want to logout?
              </div>
              <div className={styles.tombol}>
                <div onClick={() => setOpen(!open)}>
                  <button type="submit" className="btn btn-secondary">
                    Cancel
                  </button>
                </div>
                <div onClick={logoutHandler}>
                  <button type="submit" className="btn btn-danger">
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalLogout;
