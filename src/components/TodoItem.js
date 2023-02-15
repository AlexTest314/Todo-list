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

const boxSha = {
  top: "5px 5px 2px 0px",
  mid: " 10px 10px 2px 0px",
  bot: "15px 15px 2px 0px"
};

const boxShadowDragging = {
  multy: {
    boxShadow: `rgba(100, 102, 129, 0.9) ${boxSha.top}, rgba(100, 102, 129, 0.5) ${boxSha.mid},rgba(100, 102, 129, 0.25) ${boxSha.bot}`
  },
  single: {
    boxShadow: `${boxSha.top} rgba(100, 102, 129, 0.9)`
  }
};

function TodoItem({
  todo,
  index,
  tableDisabled,
  setTableDisabled,
  setCheckedItems,
  checkedItems,
  draggableIdTodo
}) {
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);
  const [checked, setChecked] = useState(false);
  const time = format(new Date(todo.time), "p, MM/dd/yyyy");

  const handleDelete = () => {
    dispatch(deleteTodo({ id: todo.id, status: todo.status }));
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
          index={index}
          isDragDisabled={tableDisabled ? true : false}>
          {(provided, snapshot) => (
            <>
              <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}>
                <div
                  style={
                    snapshot.isDragging
                      ? checkedItems.size > 1
                        ? boxShadowDragging.multy
                        : boxShadowDragging.single
                      : { boxShadow: "0px 0px 0px 0px" }
                  }>
                  <div
                    style={
                      draggableIdTodo
                        ? draggableIdTodo !== todo.id &&
                          checkedItems.has(todo.id)
                          ? { display: "none" }
                          : { display: "flex" }
                        : { display: "flex" }
                    }
                    className={
                      tableDisabled ? styles.item__disabled : styles.item
                    }>
                    <div className={styles.todoDetails}>
                      <CheckButton
                        checked={checkedItems.has(todo.id) ? true : false}
                        handleCheck={tableDisabled ? () => {} : handleCheck}
                        variant={
                          tableDisabled ? "disabled" : "checkbox"
                        }></CheckButton>
                      <div className={styles.text}>
                        <p className={styles.todoText}>{todo.title}</p>
                        <p className={styles.time}>{time}</p>
                      </div>
                    </div>
                    <div
                      className={styles.todoActions}
                      style={{ position: "relative" }}>
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
                      <div
                        style={
                          draggableIdTodo
                            ? draggableIdTodo === todo.id
                              ? {
                                  width: "15px",
                                  height: "15px",
                                  backgroundColor: `rgb(100, 102, 129)`,
                                  borderRadius: "10px",
                                  textAlign: "center",
                                  position: "absolute",
                                  left: "91px",
                                  top: "39px"
                                }
                              : { display: "none" }
                            : { display: "none" }
                        }>
                        {checkedItems.size}
                      </div>
                    </div>
                  </div>
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
