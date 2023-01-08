import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";
import { todoListInit } from "../app/utils";
import styles from "../styles/modules/app.module.scss";
import { getClasses } from "../utils/getClasses";
import TodoItem from "./TodoItem";

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

  return (
    <>
      <motion.div
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
