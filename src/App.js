import React from "react";
import AppContent from "./components/AppContent";
import AppHeader from "./components/AppHeader";
import PageTitle from "./components/PageTitle";
import styles from "./styles/modules/app.module.scss";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <div className='container'>
        <PageTitle title={"TODO LIST"}></PageTitle>
        <div className={styles.app__wrapper}>
          <AppHeader />

          <AppContent />
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
