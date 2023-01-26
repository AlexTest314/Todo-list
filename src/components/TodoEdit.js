import React, { useState } from "react";
import { format } from "date-fns/esm";
import { AnimatePresence, motion } from "framer-motion";
import styles from "../styles/modules/todoItem.module.scss";
import { MdCheck } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";
import { updateTodo } from "../slices/todoSlice";
import { useDispatch } from "react-redux";
import Button from "./Button";

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

function TodoEdit({ setIsEdit, todo, setTableDisabled }) {
  const [title, setTitle] = useState(todo.title);

  const dispatch = useDispatch();

  const time = format(new Date(todo.time), "p, MM/dd/yyyy");

  const handleAgree = (e) => {
    e.preventDefault();
    if (title === "") {
      toast.error("Please enter a title");
      return;
    } else if (todo.title !== title) {
      dispatch(
        updateTodo({
          ...todo,
          title
        })
      );
      setIsEdit(false);
      setTableDisabled(false);
    } else {
      toast.error("No Changes Made");

      return;
    }
  };

  const handleDesagree = (e) => {
    e.preventDefault();
    setIsEdit(false);
    setTableDisabled(false);
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          className={styles.item}
          variants={child}>
          <div>
            <div>
              <input
                className={(styles.input, styles.input__select)}
                type='text'
                id='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => (e.key === "Enter" ? handleAgree(e) : null)}
              />
              <p className={styles.time}>{time}</p>
            </div>
          </div>
          <div className={styles.todoActions}>
            <Button
              variant='agree'
              onClick={handleAgree}
              onKeyDown={handleAgree}
              type='button'>
              <MdCheck />
            </Button>
            <Button
              variant='desagree'
              onClick={handleDesagree}
              onKeyDown={handleDesagree}
              type='button'>
              <RxCross2 />
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default TodoEdit;
