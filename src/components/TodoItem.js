import { motion } from "framer-motion";
import { format } from "date-fns/esm";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../slices/todoSlice";
import styles from "../styles/modules/todoItem.module.scss";
import CheckButton from "./CheckButton";
import TodoEdit from "./TodoEdit";

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [updateModeOpen, setUpdateModeOpen] = useState(false);

  useEffect(() => {
    if (todo.status === "done") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.status]);
  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    toast.success("Todo Deleted Successfully");
  };
  const handleUpdate = () => {
    setUpdateModeOpen(true);
  };

  const handleCheck = () => {
    setChecked(!checked);
    dispatch(
      updateTodo({
        ...todo,
        status: checked ? "new" : "done"
      })
    );
  };
  return (
    <>
      {updateModeOpen ? (
        <TodoEdit
          type='update'
          updateModeOpen={updateModeOpen}
          setModeOpen={setUpdateModeOpen}
          todo={todo}
        />
      ) : (
        <motion.div
          className={styles.item}
          variants={child}>
          <div className={styles.todoDetails}>
            <CheckButton
              checked={checked}
              handleCheck={handleCheck}
            />
            <div className={styles.text}>
              <p className={styles.todoText}>{todo.title}</p>
              <p className={styles.time}>
                {format(new Date(todo.time), "p, MM/dd/yyyy")}
              </p>
            </div>
          </div>
          <div className={styles.todoActions}>
            <div
              className={styles.icon}
              onClick={handleDelete}
              onKeyDown={handleDelete}
              role='button'>
              <MdDelete />
            </div>
            <div
              className={styles.icon}
              onClick={handleUpdate}
              onKeyDown={handleUpdate}
              role='button'>
              <MdEdit />
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}

export default TodoItem;
