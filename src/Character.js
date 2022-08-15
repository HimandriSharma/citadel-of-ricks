import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchData } from "./redux";

function Character({ fetchData, apiData }) {
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return apiData.loading ? (
    <h2>Loading</h2>
  ) : apiData.error ? (
    <h2>{apiData.error.message}</h2>
  ) : (
    <div>
      {apiData.characters &&
        apiData.characters.results &&
        apiData.characters.results.map((char) => <p>{char.name}</p>)}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    apiData: state.api,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(fetchData()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Character);
