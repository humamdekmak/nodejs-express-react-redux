import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import logo from "./logo.svg";

import "./App.css";

//Redux components
import { sendData, getData } from "./actions/dashboardAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useState } from "react";

const App = (props) => {
  const [response, setResponse] = useState("");
  const [post, setPost] = useState("");
  const [responseToPost, setResponseToPost] = useState("");

  useEffect(() => {
    callApi();
  });

  const callApi = () => {
    props.getData("/api/hello");
  };

  const handleSubmit = () => {
    props.sendData("/api/data", { post: post });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <p>{props.getDataFromBackend.express}</p>
      <div>
        <p>
          <strong>Post to Server:</strong>
        </p>
        <input
          type="text"
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <p style={{ color: "blue" }}>
        <b>{props.dataFromBackend.data}</b>
      </p>
    </div>
  );
};
//React Redux connecting code

function mapStateToProps(state) {
  return {
    dataFromBackend: state.dashboardReducer.dataFromBackend,
    getDataFromBackend: state.dashboardReducer.getDataFromBackend,
  };
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      sendData,
      getData,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(App);
