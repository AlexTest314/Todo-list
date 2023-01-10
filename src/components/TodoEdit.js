import React, { useEffect, useState } from "react";
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

function TodoEdit({ type, updateModeOpen, setModeOpen, todo }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("New");

  const dispatch = useDispatch();
  useEffect(() => {
    if (type === "edit" && todo) {
      setTitle(todo.title);
      setStatus(todo.status);
    } else {
      setTitle("");
      setStatus("new");
    }
  }, [type, todo, updateModeOpen]);

  const handleAgree = (e) => {
    e.preventDefault();
    if (title === "") {
      toast.error("Please enter a title");
      return;
    }
    if (title && status) {
      if (type === "edit") {
        if (todo.title !== title || todo.status !== status) {
          dispatch(
            updateTodo({
              ...todo,
              title,
              status
            })
          );
        } else {
          toast.error("No Changes Made");
          return;
        }
      }
      setModeOpen(false);
    }
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
              />
              <p className={styles.time}>
                {format(new Date(todo.time), "p, MM/dd/yyyy")}
              </p>
            </div>
          </div>
          <div className={styles.todoActions}>
            <Button
              className={styles.iconCheck}
              onClick={handleAgree}
              onKeyDown={handleAgree}
              type='button'>
              <MdCheck />
            </Button>
            <Button
              className={styles.iconCancel}
              onClick={() => setModeOpen(false)}
              onKeyDown={() => setModeOpen(false)}
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
