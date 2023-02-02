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
  const [checkedItems, setCheckedItems] = useState(() => new Set());

  console.log("checkedItems", checkedItems);
  const dispatch = useDispatch();

  const onDragEnd = (result) => {
    const { source, destination } = result;

    const status = destination.droppableId;

    if (!destination) {
      return;
    }
    if (status === source.droppableId && destination.index === source.index) {
      return;
    }
    if (status === source.droppableId && destination.index !== source.index) {
      dispatch(
        updateOrderTodo({
          id: result.draggableId,
          prevStatus: source.droppableId,
          newStatus: status,
          prevIndex: source.index,
          newIndex: destination.index
        })
      );
      return;
    }

    if (checkedItems.size > 1) {
      dispatch(
        updateOrderListTodo({
          id: checkedItems,
          prevStatus: source.droppableId,
          newStatus: status
        })
      );

      setCheckedItems(() => new Set());
    } else {
      dispatch(
        updateOrderTodo({
          id: result.draggableId,
          prevStatus: source.droppableId,
          newStatus: status,
          prevIndex: source.index,
          newIndex: destination.index
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
          <DragDropContext onDragEnd={onDragEnd}>
            <AppContent
              searchValue={searchValue}
              tableDisabled={tableDisabled}
              setTableDisabled={setTableDisabled}
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
            fontSize: "1.4rem",
            right: "10px"
          }
        }}
      />
    </>
  );
}

export default App;
