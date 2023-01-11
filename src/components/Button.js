import React from "react";
import styles from "../styles/modules/button.module.scss";
import { getClasses } from "../utils/getClasses";

const buttonTypes = {
  primary: "primary",
  primary__disabled: "primary__disabled",
  secondary: "secondary",
  agree: "agree",
  desagree: "desagree",
  delete: "delete",
  edit: "edit",
  disabled: "disabled"
};

function Button({ children, type, variant, onClick, disabled }) {
  return (
    <button
      className={getClasses([
        styles.button,
        styles[`button--${buttonTypes[variant]}`]
      ])}
      type={type === "submit" ? "submit" : "button"}
      onClick={onClick}
      disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
