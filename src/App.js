import React, { useState } from "react";
import AppContent from "./components/AppContent";
import AppHeader from "./components/AppHeader";
import PageTitle from "./components/PageTitle";
import styles from "./styles/modules/app.module.scss";
import { Toaster } from "react-hot-toast";
import { todoListInit } from "./app/utils";
import { useSelector } from "react-redux";
import { STATUS_DONE, STATUS_NEW, STATUS_PENDING } from "./app/statuses";
import { useDispatch } from "react-redux";
import { updateTodo } from "./slices/todoSlice";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  const todoList = useSelector(todoListInit);
  const [searchValue, setSearchValue] = useState("");
  const [tableDisabled, setTableDisabled] = useState(false);
  const [checkedItems, setCheckedItems] = useState(() => new Set());

  const filteredTodos = todoList.reduce(
    (todo, item) => {
      todo[`${item.status}`].push(item);
      return todo;
    },
    {
      [STATUS_NEW]: [],
      [STATUS_PENDING]: [],
      [STATUS_DONE]: []
    }
  );

  const dispatch = useDispatch();

  const onDragStart = (provided) => {};

  const onDragEnd = (result) => {
    const { source, destination } = result;

    const id = destination.droppableId;

    if (!destination) {
      return;
    }
    if (id === source.droppableId && destination.index === source.index) {
      return;
    }

    if (checkedItems.size > 1) {
      checkedItems.forEach((item) => {
        dispatch(
          updateTodo({
            id: item,
            status: id,
            time: new Date().toUTCString()
          })
        );
        setCheckedItems(() => new Set());
      });
    } else {
      dispatch(
        updateTodo({
          id: result.draggableId,
          status: id,
          time: new Date().toUTCString()
        })
      );
    }
  };
  return (
    <>
      <div className='container'>
        <PageTitle title={"TODO LIST"}></PageTitle>
        <div className={styles.app__wrapper}>
          <AppHeader
            setSearchValue={setSearchValue}
            tableDisabled={tableDisabled}
          />
          <DragDropContext
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}>
            <AppContent
              searchValue={searchValue}
              tableDisabled={tableDisabled}
              setTableDisabled={setTableDisabled}
              filteredTodos={filteredTodos}
              checkedItems={checkedItems}
              setCheckedItems={setCheckedItems}
            />
          </DragDropContext>
        </div>
      </div>
      <Toaster
        position='bottom-right'
        toastOption={{
          style: {
            fontSize: "1.4rem"
          }
        }}
      />
    </>
  );
}

export default App;
