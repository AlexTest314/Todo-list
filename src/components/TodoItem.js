import { motion } from "framer-motion";
import { format } from "date-fns/esm";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../slices/todoSlice";
import styles from "../styles/modules/todoItem.module.scss";
import TodoEdit from "./TodoEdit";
import Button from "./Button";
import { useDrag } from "react-dnd";

const child = {
  hidden: { y: 20, opacity: 0.75 },
  visible: {
    y: 0,
    opacity: 1
  }
};

function TodoItem({ todo, tableDisabled, setTableDisabled }) {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);

  const time = format(new Date(todo.time), "p, MM/dd/yyyy");
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "div",
      item: { id: todo.id, title: todo.title },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging()
      })
    }),
    [todo]
  );

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    toast.success("Todo Deleted Successfully");
  };

  return (
    <>
      {isEdit ? (
        <TodoEdit
          setIsEdit={setIsEdit}
          todo={todo}
          setTableDisabled={setTableDisabled}
        />
      ) : (
        <motion.div
          style={{ border: isDragging ? "5px solid pink" : "0px" }}
          className={tableDisabled ? styles.item__disabled : styles.item}
          ref={drag}
          draggable={tableDisabled ? "false" : "true"}
          variants={tableDisabled ? child.hidden : child.visible}>
          <div className={styles.todoDetails}>
            <div className={styles.text}>
              <p className={styles.todoText}>{todo.title}</p>
              <p className={styles.time}>{time}</p>
            </div>
          </div>
          <div className={styles.todoActions}>
            <Button
              disabled={tableDisabled}
              variant={tableDisabled ? "disabled" : "edit"}
              className={styles.icon}
              onClick={handleDelete}
              type='button'>
              <MdDelete />
            </Button>
            <Button
              disabled={tableDisabled}
              variant={tableDisabled ? "disabled" : "edit"}
              onClick={() => {
                setTableDisabled(true);
                setIsEdit(true);
              }}
              type='button'>
              <MdEdit />
            </Button>
          </div>
        </motion.div>
      )}
    </>
  );
}

export default TodoItem;
