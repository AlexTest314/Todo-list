import React, { useState } from "react";
import Button from "./Button";
import styles from "../styles/modules/app.module.scss";
import TodoModal from "./TodoModal";
/* import SearchFilter from "./SearchFilter";
import { useSelector } from "react-redux";
import AppContent from "./AppContent"; */

function AppHeader() {
  //const filterStatus = useSelector(state => state.todo.filterStatus);
  //const todoList = useSelector(state => state.todo.todoList);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className={styles.appHeader}>
      <Button variant="primary" onClick={() => setModalOpen(true)}>
        Add Task
      </Button>

      {/*  <SelectButton id="status" value={filterStatus} onChange={updateFilter}>
        <option value="all">ALL</option>
        <option value="new">New</option>
        <option value="pending">Pending</option>
        <option value="done">Done</option>
      </SelectButton> */}
      <TodoModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
}

export default AppHeader;
