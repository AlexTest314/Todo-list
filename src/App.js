import React, { useState } from "react";
import AppContent from "./components/AppContent";
import AppHeader from "./components/AppHeader";
import PageTitle from "./components/PageTitle";
import styles from "./styles/modules/app.module.scss";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateOrderListTodo, updateOrderTodo } from "./slices/todoSlice";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [tableDisabled, setTableDisabled] = useState(false);
  const [draggableIdTodo, setDraggableIdTodo] = useState();
  const [checkedItems, setCheckedItems] = useState(() => new Set());

  const dispatch = useDispatch();

  const onDragStart = (result) => {
    if (checkedItems.size > 1) {
      setDraggableIdTodo(result.draggableId);
    }
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    const prevStatus = source.droppableId;
    const prevIndex = source.index;
    const newStatus = destination.droppableId;
    const newIndex = destination.index;

    if (!destination) {
      return;
    }
    if (newStatus === prevStatus && newIndex === prevIndex) {
      if (checkedItems.size > 1) {
        setCheckedItems(() => new Set());
      }

      setDraggableIdTodo(undefined);
      return;
    }
    if (newStatus === prevStatus && newIndex !== prevIndex) {
      if (checkedItems.size > 1 && checkedItems.has(result.draggableId)) {
        Array.from(checkedItems).forEach((item, index) => {
          dispatch(
            updateOrderListTodo({
              id: item,
              status: [prevStatus, newStatus],
              index: [newIndex, index]
            })
          );
        });
        setCheckedItems(() => new Set());
      } else {
        dispatch(
          updateOrderTodo({
            id: result.draggableId,
            status: [prevStatus, newStatus],
            index: [prevIndex, newIndex]
          })
        );
        if (checkedItems.has(result.draggableId)) {
          setCheckedItems(() => new Set());
        }
      }
      setDraggableIdTodo(undefined);
      return;
    }

    if (checkedItems.size > 1 && checkedItems.has(result.draggableId)) {
      Array.from(checkedItems).forEach((item, index) => {
        dispatch(
          updateOrderListTodo({
            id: item,
            status: [prevStatus, newStatus],
            index: [newIndex, index]
          })
        );
      });
      setCheckedItems(() => new Set());
    } else {
      dispatch(
        updateOrderTodo({
          id: result.draggableId,
          status: [prevStatus, newStatus],
          index: [prevIndex, newIndex]
        })
      );
      if (checkedItems.has(result.draggableId)) {
        setCheckedItems(() => new Set());
      }
    }
    setDraggableIdTodo(undefined);
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
              checkedItems={checkedItems}
              setCheckedItems={setCheckedItems}
              draggableIdTodo={draggableIdTodo}
            />
          </DragDropContext>
        </div>
      </div>
      <Toaster
        position='bottom-right'
        toastOption={{
          style: {
            fontSize: "1.4rem",
            right: "10px"
          }
        }}
      />
    </>
  );
}

export default App;
