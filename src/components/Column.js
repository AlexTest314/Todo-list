import { AnimatePresence, motion } from "framer-motion";
import styles from "../styles/modules/app.module.scss";
import { getClasses } from "../utils/getClasses";
import TodoItem from "./TodoItem";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { updateTodo } from "../slices/todoSlice";

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

function Column({
  status,
  inputValue,
  filteredList,
  tableDisabled,
  setTableDisabled
}) {
  const dispatch = useDispatch();

  const filterTitles = filteredList.filter((todo) => {
    if (inputValue === "") {
      return todo;
    } else {
      return todo.title.toLowerCase().includes(inputValue);
    }
  });

  const addTodoToColumn = (id, title) => {
    dispatch(
      updateTodo({
        id,
        title,
        status,
        time: new Date().toLocaleString()
      })
    );
  };

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "div",
      drop: (item) => addTodoToColumn(item.id, item.title),
      collect: (monitor) => ({
        isOver: !!monitor.isOver()
      })
    }),
    [filteredList]
  );

  return (
    <>
      <motion.div
        ref={drop}
        style={{ border: isOver ? "5px solid pink" : "0px" }}
        className={styles.content__wrapper}
        variants={container}
        initial='hidden'
        animate='visible'>
        <div className={getClasses([styles[`todoStatus--${status}`]])}>
          {status}
        </div>
        <AnimatePresence>
          {filterTitles.length > 0 ? (
            filterTitles.map((todo) => (
              <TodoItem
                tableDisabled={tableDisabled}
                setTableDisabled={setTableDisabled}
                key={todo.id}
                todo={todo}
              />
            ))
          ) : (
            <div className={styles.emptyText__wrapper}>
              <motion.p
                className={styles.emptyText}
                variants={child}>
                No Todo Found
              </motion.p>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

export default Column;
