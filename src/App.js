import React, { useState } from "react";
import AppContent from "./components/AppContent";
import AppHeader from "./components/AppHeader";
import PageTitle from "./components/PageTitle";
import styles from "./styles/modules/app.module.scss";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateTodo } from "./slices/todoSlice";
import { DragDropContext } from "react-beautiful-dnd";
function App() {
  const [searchValue, setSearchValue] = useState("");
  const [tableDisabled, setTableDisabled] = useState(false);
  const [checkedItems, setCheckedItems] = useState(() => new Set());
  const [indexTodo, setIndexTodo] = useState({});
  console.log("indexTodo", indexTodo);

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
      setIndexTodo({
        newIndex: destination.index,
        prevIndex: source.index,
        id: result.draggableId,
        status: status
      });
      return;
    }

    if (checkedItems.size > 1 && checkedItems.has(result.draggableId)) {
      checkedItems.forEach((item) => {
        dispatch(
          updateTodo({
            id: item,
            status: status,
            time: new Date().toUTCString()
          })
        );
        setCheckedItems(() => new Set());
      });
    } else {
      setIndexTodo({
        newIndex: destination.index,
        prevIndex: source.index,
        id: result.draggableId,
        status: status
      });
      if (checkedItems.has(result.draggableId)) {
        setCheckedItems(() => new Set());
      }
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
              indexTodo={indexTodo}
              setIndexTodo={setIndexTodo}
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
