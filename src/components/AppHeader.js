import React, { useState } from "react";
import Button from "./Button";
import styles from "../styles/modules/app.module.scss";
import TodoModal from "./TodoModal";
import SearchFilter from "./SearchFilter";
import { useDispatch, useSelector } from "react-redux";
import { editSearchFilter } from "../slices/todoSlice";
import { inputValueInit } from "../app/utils";

function AppHeader() {
  const inputValue = useSelector(inputValueInit);
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();

  const searchFilter = (e) => {
    dispatch(editSearchFilter(e.target.value.toLowerCase()));
  };

  return (
    <>
      <div className={styles.appHeader}>
        <Button
          variant='primary'
          onClick={() => setModalOpen(true)}>
          Add Task
        </Button>
        <SearchFilter
          id='filter'
          value={inputValue}
          onChange={searchFilter}
        />
        <TodoModal
          type='add'
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      </div>
    </>
  );
}

export default AppHeader;
