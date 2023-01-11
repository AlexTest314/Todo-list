import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import styles from "../styles/modules/modal.module.scss";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import Button from "./Button";
import { addTodo } from "../slices/todoSlice";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import { AnimatePresence } from "framer-motion";

const dropIn = {
  hidden: {
    opacity: 0,
    transform: "scale(0.9)"
  },
  visible: {
    transform: "scale(1)",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500
    }
  },
  exit: {
    transform: "scale(0.9)",
    opacity: 0
  }
};

function TodoModal({ type, modalOpen, setModalOpen, todo }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("New");

  const dispatch = useDispatch();

  useEffect(() => {
    setTitle("");
    setStatus("new");
  }, [modalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "") {
      toast.error("Please enter a title");
      return;
    }
    dispatch(
      addTodo({
        id: uuid(),
        title,
        status,
        time: new Date().toLocaleString()
      })
    );
    toast.success("Task Added Successfully");

    setModalOpen(false);
  };
  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          <motion.div
            className={styles.container}
            variants={dropIn}
            initial='hidden'
            animate='visible'
            exit='exit'>
            <motion.div
              className={styles.closeButton}
              initial={{ top: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}>
              <Button
                className={styles.closeButton}
                onClick={() => setModalOpen(false)}
                onKeyDown={() => setModalOpen(false)}
                role='button'>
                <MdOutlineClose />
              </Button>
            </motion.div>
            <form
              className={styles.form}
              onSubmit={(e) => handleSubmit(e)}>
              <h1 className={styles.formTitle}>Add Task</h1>
              <label htmlFor='title'>
                Title
                <input
                  type='text'
                  id='title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label htmlFor='type'>
                Status
                <select
                  name='status'
                  id='status'
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}>
                  <option value='pending'>Pending</option>
                  <option value='done'>Done</option>
                  <option value='new'>New</option>
                </select>
              </label>
              <div className={styles.buttonContainer}>
                <Button
                  type='submit'
                  variant='primary'>
                  Add Task
                </Button>
                <Button
                  variant='secondary'
                  onClick={() => setModalOpen(false)}
                  onKeyDown={() => setModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TodoModal;
