import React from "react";
import styles from "../styles/modules/button.module.scss";
import { getClasses } from "../utils/getClasses";

function SearchFilter({ id, ...rest }) {
  return (
    <div>
      <input
        type="text"
        className={getClasses([styles.button, styles.button__select])}
        {...rest}
      />
    </div>
  );
}

export default SearchFilter;
