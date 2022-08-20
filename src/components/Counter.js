import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { increment, decrement, setValue } from "../redux";
import store from "../redux/store";
import backendService from "../api/BackendService";

function Counter({ count }) {
  const [list, setList] = useState([]);
  const [next, setNext] = useState(false);
  //store.dispatch(setValue(localStorage.getItem('page')?localStorage.getItem('page'):1))
  useEffect(() => {
    localStorage.setItem('page',count.page)
    backendService
      .getCharacters(count.page)
      .then((res) => {
        setNext(res.data.info.next ? true : false);
        setList(res.data.results);
      })
      .catch((err) => console.log(err));
  }, [count]);
  return (
    <div>
      Counter
      <br />
      <button
        onClick={() => {
          store.dispatch(decrement());
        }}
      >
        decrement
      </button>
      <h3>{count.page}</h3>
      {next && (
        <button
          onClick={() => {
            store.dispatch(increment());
          }}
        >
          increment
        </button>
      )}
      {list.map((char) => (
        <p key={char.id}>{char.name}</p>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    count: state.counter,
  };
};

export default connect(mapStateToProps)(Counter);
