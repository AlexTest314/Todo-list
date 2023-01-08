import { useSelector } from "react-redux";
import { inputValueInit } from "../app/utils";
import styles from "../styles/modules/app.module.scss";
import Column from "./Column";

function AppContent() {
  const inputValue = useSelector(inputValueInit);

  return (
    <>
      <div className={styles.contentStatus__wrapper}>
        <Column
          status={"new"}
          inputValue={inputValue}
        />
        <Column
          status={"pending"}
          inputValue={inputValue}
        />
        <Column
          status={"done"}
          inputValue={inputValue}
        />
      </div>
    </>
  );
}

export default AppContent;
