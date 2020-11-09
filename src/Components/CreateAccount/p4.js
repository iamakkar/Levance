import React from "react";
import "./p4.css";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import Select from "react-select";
import Swal from 'sweetalert2';

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

var x = [];
var y = [];

function App(props) {
  const history = useHistory();

  function Next() {
    x.forEach(item => {
      y.push(item.value);
    });
    x = [];
    if (y.length > 3) {
      return Swal.fire({
        title: 'Excess Categories',
        text: 'Please select 3 categories!',
        icon: 'warning',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Okay',
      })
    } else {
      props.setCategories(y);
    history.push('/createaccount5');
    console.log(props.categories)
    }
  }

  function selection(e) {
    console.log(e)
    x = e;
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
            onChange={val => selection(val)}
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

const mapStateToProps = state => {
  return {
    categories: state.userDetails.categories
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
