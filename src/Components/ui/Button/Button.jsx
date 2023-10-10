import { Link } from "react-router-dom";
import styles from "./Button.module.css";
export default function Button({
    type = "button",
    clickHandler = null,
    children,
    to = "/",
    moreClasses,
    disabled = false,
}) {
    if (type === "link")
        return (
            <Link
                className={`${styles.button} ${moreClasses} btn`}
                to={to}
                style={{
                    backgroundColor: "var(--main-color)",
                    color: "#fff",
                    fontWeight: "600",
                    fontSize: "0.8rem",
                }}
            >
                {children}
            </Link>
        );
    return (
        <>
            <button
                className={`${styles.button} ${moreClasses} btn`}
                style={{
                    backgroundColor: "var(--main-color)",
                    color: "#fff",
                    fontWeight: "600",
                    fontSize: "0.8rem",
                }}
                type={type}
                onClick={clickHandler}
                disabled={disabled}
            >
                {children}
            </button>
        </>
    );
}
