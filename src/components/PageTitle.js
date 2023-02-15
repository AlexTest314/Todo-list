import React from "react";
import style from "../styles/modules/title.module.scss";

function PageTitle({ title }) {
  return <p className={style.title}>{title}</p>;
}

export default PageTitle;
