import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { STATUS_DONE, STATUS_NEW, STATUS_PENDING } from "../app/statuses";
import { todoListInit } from "../app/utils";
import styles from "../styles/modules/app.module.scss";
import Column from "./Column";

function AppContent({
  searchValue,
  tableDisabled,
  setTableDisabled,
  checkedItems,
  setCheckedItems,
  indexTodo,
  setIndexTodo
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
  const [orderedTodo, setOrderedTodo] = useState(filteredTodos);
  console.log("orderedTodoStart", orderedTodo);
  useEffect(() => {
    if (indexTodo.hasOwnProperty("id")) {
      const reorderTodo = orderedTodo[indexTodo.status];
      console.log("reorderTodo", reorderTodo);
      const [removed] = reorderTodo.splice(indexTodo.prevIndex, 1);
      reorderTodo.splice(indexTodo.newIndex, 0, removed);

      setOrderedTodo(() => {
        orderedTodo[indexTodo.status] = reorderTodo;
        return orderedTodo;
      });
      setIndexTodo({});
    }
  }, [indexTodo, setIndexTodo, orderedTodo, setOrderedTodo]);

  console.log("orderedTodo", orderedTodo);

  return (
    <>
      <div className={styles.contentStatus__wrapper}>
        {Object.entries(orderedTodo).map((columnStatus, index) => {
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
              indexTodo={indexTodo}
              setIndexTodo={setIndexTodo}
            />
          );
        })}
      </div>
    </>
  );
}

export default AppContent;
