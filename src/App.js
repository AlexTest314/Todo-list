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

    const prevStatus = source.droppableId;
    const prevIndex = source.index;
    const newStatus = destination.droppableId;
    const newIndex = destination.index;

    if (!destination) {
      return;
    }
    if (newStatus === prevStatus && newIndex === prevIndex) {
      return;
    }
    if (newStatus === prevStatus && newIndex !== prevIndex) {
      dispatch(
        updateOrderTodo({
          id: result.draggableId,
          status: [prevStatus, newStatus],
          index: [prevIndex, newIndex]
        })
      );
      return;
    }

    if (checkedItems.size > 1 && checkedItems.has()) {
      dispatch(
        updateOrderListTodo({
          id: checkedItems,
          prevStatus: prevStatus,
          newStatus: newStatus
        })
      );

      setCheckedItems(() => new Set());
    } else {
      dispatch(
        updateOrderTodo({
          id: result.draggableId,
          status: [prevStatus, newStatus],
          index: [prevIndex, newIndex]
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
