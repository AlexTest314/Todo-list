import React from "react";
import AppContent from "./components/AppContent";
import AppHeader from "./components/AppHeader";
import PageTitle from "./components/PageTitle";
import styles from "./styles/modules/app.module.scss";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <>
      <div className='container'>
        <PageTitle title={"TODO LIST"}></PageTitle>
        <div className={styles.app__wrapper}>
          <AppHeader />
          <DndProvider backend={HTML5Backend}>
            <AppContent />
          </DndProvider>
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
