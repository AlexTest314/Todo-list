import React, { useState } from "react";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import styles from "../styles/modules/app.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import SearchFilter from "./SearchFilter";



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

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

function AppContent() {

  const todoList = useSelector(state => state.todo.todoList);
  const [inputText, setInputText] = useState("");
  const sortedTodoList = [...todoList];

  sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));
    
    const filterHandler = e => {
        const lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
      };
    
    const filterTitle = sortedTodoList.filter(todo => {
        if (inputText === "") {
          return todo;
        } else {
          return todo.title.toLowerCase().includes(inputText);
        }
})

    const filterStatus = (todoList, status) => {
        return todoList.filter(todo => todo.status === status);
}

  return (
    <>
    <div className={styles.appHeader}>
    <SearchFilter id="search" onChange={filterHandler} />
    </div>
    <div className={styles.contentStatus__wrapper}>

     <motion.div
      className={styles.content__wrapper}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {<AnimatePresence>
        {filterStatus(filterTitle, 'new') && filterStatus(filterTitle, 'new').length > 0
          ? filterStatus(filterTitle, 'new').map((todo ) =>  <TodoItem key={todo.id} todo={todo} />)
          : <motion.p className={styles.emptyText} variants={child}>
              No Todo Found
            </motion.p>}
      </AnimatePresence>}
    </motion.div>

     <motion.div
      className={styles.content__wrapper}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {<AnimatePresence>
        {filterStatus(filterTitle, 'pending') && filterStatus(filterTitle, 'pending').length > 0
          ? filterStatus(filterTitle, 'pending').map((todo ) =>  <TodoItem key={todo.id} todo={todo} />)
          : <motion.p className={styles.emptyText} variants={child}>
              No Todo Found
            </motion.p>}
      </AnimatePresence>}
    </motion.div>

     <motion.div
      className={styles.content__wrapper}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {<AnimatePresence>
        {filterStatus(filterTitle, 'done') && filterStatus(filterTitle, 'done').length > 0
          ? filterStatus(filterTitle, 'done').map((todo ) =>  <TodoItem key={todo.id} todo={todo} />)
          : <motion.p className={styles.emptyText} variants={child}>
              No Todo Found
            </motion.p>}
      </AnimatePresence>}
    </motion.div>
    
      
    </div>
    </>
  );
}

export default AppContent;
