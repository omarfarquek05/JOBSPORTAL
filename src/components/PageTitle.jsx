import React from "react";
//import Divider from "./Divider";

function PageTitle({ title }) {
  return (
    <div className=" text-light-1 ">
      <h1 className="text-xl ">
        <b>{title}</b>
      </h1>
      {/*<Divider />*/}
    </div>
  );
}

export default PageTitle;