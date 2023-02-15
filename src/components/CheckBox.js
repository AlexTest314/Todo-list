import React from "react";
import styles from "../styles/modules/checkbox.module.scss";
import { getClasses } from "../utils/getClasses";

const checkboxTypes = {
  checkbox: "checkbox",
  disabled: "disabled"
};

function CheckBox({ disabled, variant, setChecked, checked }) {
  return (
    <div>
      <input
        type='checkbox'
        className={getClasses([
          styles.checkbox,
          styles[`button--${checkboxTypes[variant]}`]
        ])}
        checked={checked ? true : false}
        onChange={() => setChecked(!checked)}
        disabled={disabled}></input>
    </div>
  );
}

export default CheckBox;
