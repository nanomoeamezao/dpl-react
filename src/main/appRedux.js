import React from "react";
import { connect } from "react-redux";
const mapStateToProps = state => {
  return { test: state.test };
};
const ConnectedList = ({ test }) => (
  <ul>
    {test.map(el => (
      <li key={el.id}>{el.title}</li>
    ))}
  </ul>
);
const appRedux = connect(mapStateToProps)(ConnectedList);
export default appRedux; 