import styles from "../styles/modules/search.module.scss";

function SearchFilter({ onChange, disabled }) {
  return (
    <div>
      <input
        type='text'
        className={disabled ? styles.search__disabled : styles.search}
        id='search'
        placeholder={"Filter by title"}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}

export default SearchFilter;
