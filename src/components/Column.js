import styles from "../styles/modules/app.module.scss";
import { getClasses } from "../utils/getClasses";
import TodoItem from "./TodoItem";
import { Droppable } from "react-beautiful-dnd";

const boxBgDragging = {
  new: {
    backgroundColor: "rgba(177, 177, 247, 0.3)"
  },
  pending: {
    backgroundColor: "rgba(239, 185, 83, 0.3)"
  },
  done: {
    backgroundColor: "rgba(117, 230, 117, 0.3)"
  }
};

function Column({
  status,
  inputValue,
  index,
  tableDisabled,
  setTableDisabled,
  filteredList,
  setCheckedItems,
  checkedItems,
  draggableIdTodo
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
            <>
              <div
                className={styles.drag__wrapper}
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={
                  snapshot.isDraggingOver
                    ? boxBgDragging[status]
                    : { border: "0px" }
                }>
                {filterTitles.length > 0 ? (
                  <>
                    {filterTitles.map((todo, index) => (
                      <TodoItem
                        tableDisabled={tableDisabled}
                        setTableDisabled={setTableDisabled}
                        key={todo.id}
                        todo={todo}
                        index={index}
                        status={status}
                        setCheckedItems={setCheckedItems}
                        checkedItems={checkedItems}
                        draggableIdTodo={draggableIdTodo}
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
            </>
          )}
        </Droppable>
      </div>
    </>
  );
}

export default Column;
