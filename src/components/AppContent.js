import { useSelector } from "react-redux";
import { STATUS_NEW, STATUS_PENDING, STATUS_DONE } from "../app/statuses";
import { todoListInit } from "../app/utils";
import styles from "../styles/modules/app.module.scss";
import Column from "./Column";

function AppContent({ searchValue, tableDisabled, setTableDisabled }) {
  const todoList = useSelector(todoListInit);

  const filteredTodos = todoList.reduce(
    (todo, item) => {
      todo[`${item.status}`].push(item);
      return todo;
    },
    {
      [STATUS_NEW]: [],
      [STATUS_PENDING]: [],
      [STATUS_DONE]: []
    }
  );

  return (
    <>
      <div className={styles.contentStatus__wrapper}>
        <Column
          status={STATUS_NEW}
          tableDisabled={tableDisabled}
          setTableDisabled={setTableDisabled}
          inputValue={searchValue}
          filteredList={filteredTodos[STATUS_NEW]}
        />
        <Column
          status={STATUS_PENDING}
          tableDisabled={tableDisabled}
          setTableDisabled={setTableDisabled}
          inputValue={searchValue}
          filteredList={filteredTodos[STATUS_PENDING]}
        />
        <Column
          status={STATUS_DONE}
          tableDisabled={tableDisabled}
          setTableDisabled={setTableDisabled}
          inputValue={searchValue}
          filteredList={filteredTodos[STATUS_DONE]}
        />
      </div>
    </>
  );
}

export default AppContent;
