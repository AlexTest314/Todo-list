import { useSelector } from "react-redux";
//import { STATUS_DONE, STATUS_NEW, STATUS_PENDING } from "../app/statuses";
import { todoListInit } from "../app/utils";
import styles from "../styles/modules/app.module.scss";
import Column from "./Column";

function AppContent({
  searchValue,
  tableDisabled,
  setTableDisabled,
  checkedItems,
  setCheckedItems,
  draggableIdTodo
}) {
  const todoList = useSelector(todoListInit);

  return (
    <>
      <div className={styles.contentStatus__wrapper}>
        {Object.entries(todoList).map((columnStatus, index) => {
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
              draggableIdTodo={draggableIdTodo}
            />
          );
        })}
      </div>
    </>
  );
}

export default AppContent;
