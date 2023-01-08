import styles from "../styles/modules/button.module.scss";
import { getClasses } from "../utils/getClasses";

function SearchFilter({ onChange }) {
  return (
    <div>
      <input
        type='text'
        className={getClasses([styles.button, styles.button__select])}
        id='search'
        placeholder={"Filter by title"}
        onChange={onChange}
      />
    </div>
  );
}

export default SearchFilter;
