import React, { Fragment } from "react";
import spinner from "./spinner.gif";
export const Spinner = () => (
  //can auto return if one expression
  <Fragment>
    <img
      src={spinner}
      alt='loading...'
      style={{ width: "200px", margin: "auto", display: "block" }}
    />
  </Fragment>
);

export default Spinner;
