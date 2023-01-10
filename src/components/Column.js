import { AnimatePresence, motion } from "framer-motion";
import { todoListInit } from "../app/utils";
import styles from "../styles/modules/app.module.scss";
import { getClasses } from "../utils/getClasses";
import TodoItem from "./TodoItem";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
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

function Column({ status, inputValue }) {
  const todoList = useSelector(todoListInit);
  const sortedTodoList = [...todoList];
  const dispatch = useDispatch();

  sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));

  const filterTitle = sortedTodoList.filter((todo) => {
    if (inputValue === "") {
      return todo;
    } else {
      return todo.title.toLowerCase().includes(inputValue);
    }
  });

  const filterStatus = (todoList, status) => {
    return todoList.filter((todo) => todo.status === status);
  };

  const fullFilter = filterStatus(filterTitle, status);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "div",
    drop: (item) => addTodoToColumn(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }));

  const addTodoToColumn = (id) => {
    const todoListDrop = todoList.filter((todo) => id === todo.id);
    const title = todoListDrop[0].title;

    dispatch(
      updateTodo({
        id,
        title,
        status,
        time: new Date().toLocaleString()
      })
    );
  };

  return (
    <>
      <motion.div
        ref={drop}
        style={{ border: isOver ? "5px solid pink" : "0px" }}
        className={styles.content__wrapper}
        variants={container}
        initial='hidden'
        animate='visible'>
        <div
          className={getClasses([
            styles.icon,
            styles[`todoStatus--${status}`]
          ])}>
          {status}
        </div>
        <AnimatePresence>
          {fullFilter.length > 0 ? (
            fullFilter.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
              />
            ))
          ) : (
            <motion.p
              className={styles.emptyText}
              variants={child}>
              No Todo Found
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

export default Column;
