import React, { useState } from "react";
import Button from "./Button";
import styles from "../styles/modules/app.module.scss";
import TodoModal from "./TodoModal";
import SearchFilter from "./SearchFilter";

function AppHeader({ setSearchValue, tableDisabled }) {
  const [modalOpen, setModalOpen] = useState(false);


  return (
    <>
      <div className={styles.appHeader}>
        <Button
          variant={tableDisabled ? "primary__disabled" : "primary"}
          disabled={tableDisabled}
          onClick={() => setModalOpen(true)}>
          Add Task
        </Button>
        <SearchFilter
          disabled={tableDisabled}
          id='filter'
          value={setSearchValue}
          onChange={(e) => setSearchValue(e.target.value.toLowerCase())}
        />
        <TodoModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      </div>
    </>
  );
}

export default AppHeader;
