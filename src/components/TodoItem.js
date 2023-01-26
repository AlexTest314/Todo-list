import { format } from "date-fns/esm";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../slices/todoSlice";
import styles from "../styles/modules/todoItem.module.scss";
import TodoEdit from "./TodoEdit";
import Button from "./Button";
import { Draggable } from "react-beautiful-dnd";
import CheckButton from "./CheckButton";

function TodoItem({
  todo,
  index,
  tableDisabled,
  setTableDisabled,
  setCheckedItems,
  checkedItems
}) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const time = format(new Date(todo.time), "p, MM/dd/yyyy");

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    toast.success("Todo Deleted Successfully");
  };

  const handleCheck = () => {
    setChecked(!checked);
    const copy = checkedItems;
    if (!copy.has(todo.id)) {
      copy.add(todo.id);
    } else {
      copy.forEach((item) => {
        if (item === todo.id) {
          copy.delete(item);
        }
      });
    }
    setCheckedItems(() => new Set(copy));
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
        <Draggable
          key={todo.id}
          draggableId={todo.id}
          index={index}>
          {(provided, snapshot) => (
            <>
              <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                className={tableDisabled ? styles.item__disabled : styles.item}>
                <div className={styles.todoDetails}>
                  <CheckButton
                    checked={checked}
                    handleCheck={handleCheck}
                    disabled={tableDisabled}
                    variant={
                      tableDisabled ? "disabled" : "checkbox"
                    }></CheckButton>
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
              </div>
            </>
          )}
        </Draggable>
      )}
    </>
  );
}

export default TodoItem;
