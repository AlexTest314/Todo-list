import { useSelector } from "react-redux";
import { STATUS_NEW, STATUS_PENDING, STATUS_DONE } from "../app/statuses";
import { todoListInit } from "../app/utils";
import styles from "../styles/modules/app.module.scss";
import Column from "./Column";

function AppContent({
  searchValue,
  tableDisabled,
  setTableDisabled,
  checkedItems,
  setCheckedItems
}) {
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
        {Object.entries(filteredTodos).map((columnStatus, index) => {
          return (
            <Column
              key={index}
              status={columnStatus[0]}
              tableDisabled={tableDisabled}
              setTableDisabled={setTableDisabled}
              inputValue={searchValue}
              filteredList={columnStatus[1]}
              index={index}
              setCheckedItems={setCheckedItems}
              checkedItems={checkedItems}
            />
          );
        })}
      </div>
    </>
  );
}

export default AppContent;
