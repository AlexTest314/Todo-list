import styles from "../styles/modules/app.module.scss";
import { getClasses } from "../utils/getClasses";
import TodoItem from "./TodoItem";
import { Droppable } from "react-beautiful-dnd";

function Column({
  status,
  inputValue,
  index,
  tableDisabled,
  setTableDisabled,
  filteredList,
  setCheckedItems,
  checkedItems
}) {
  const filterTitles = filteredList.filter((todo) => {
    if (inputValue === "") {
      return todo;
    } else {
      return todo.title.toLowerCase().includes(inputValue);
    }
  });

  return (
    <>
      <div
        className={styles.content__wrapper}
        initial='hidden'
        animate='visible'>
        <div className={getClasses([styles[`todoStatus--${status}`]])}>
          {status}
        </div>
        <Droppable
          droppableId={status}
          index={index}>
          {(provided, snapshot) => (
            <div
              className={styles.drag__wrapper}
              style={{
                border: snapshot.isDraggingOver ? "5px solid pink" : "0px"
              }}
              ref={provided.innerRef}
              {...provided.droppableProps}>
              {filterTitles.length > 0 ? (
                <>
                  {filterTitles.map((todo, index) => (
                    <TodoItem
                      tableDisabled={tableDisabled}
                      setTableDisabled={setTableDisabled}
                      key={todo.id}
                      todo={todo}
                      index={index}
                      setCheckedItems={setCheckedItems}
                      checkedItems={checkedItems}
                    />
                  ))}
                  {provided.placeholder}
                </>
              ) : (
                <>
                  <div className={styles.emptyText__wrapper}>
                    <p className={styles.emptyText}>No Todo Found</p>
                  </div>
                  {provided.placeholder}
                </>
              )}
            </div>
          )}
        </Droppable>
      </div>
    </>
  );
}

export default Column;
