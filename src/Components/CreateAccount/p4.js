import React from "react";
import "./p4.css";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import Select from "react-select";

const categories = [
  { value: "a", label: "abcd" },
  { value: "b", label: "bcde" },
  { value: "c", label: "cdef" },
  { value: "d", label: "defg" },
  { value: "e", label: "efgh" },
  { value: "f", label: "fghi" },
  { value: "g", label: "ghij" },
  { value: "h", label: "hijk" },
  { value: "i", label: "ijkl" },
  { value: "j", label: "jklm" },
  { value: "k", label: "klmn" },
  { value: "l", label: "lnop" },
];

function App() {
  const history = useHistory();

  function Next() {
      history.push('/createaccount5')
  }

  return (
    <>
      <div className="App">
        <div className="wrappercreateaccount4">
          <h1>Sign Up</h1>
          <h3>Select 3 Categories</h3>
          <Select
            options={categories}
            closeMenuOnSelect={false}
            isMulti
            className="select"
            
          />
          <button className="btn" onClick={Next} >Next</button>
          <span>or</span>
          <div className="afteror">
            <Link to={"/signin"} className="new">
              Already have an account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCategories: (data) => {
      dispatch({
        type: "SET_CATEGORIES",
        categories: data,
      });
    },
  };
};

export default connect(undefined, mapDispatchToProps)(App);
