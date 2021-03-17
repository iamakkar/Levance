import React from "react";
import "./p4.css";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import Select from "react-select";
import Swal from 'sweetalert2';
import Navbar from '../Home/navbar';

const categories = [
  { value: "Beauty", label: "Beauty" },
  { value: "Fashion", label: "Fashion" },
  { value: "Fitness", label: "Fitness" },
  { value: "Lifestyle", label: "Lifestyle" },
  { value: "Food", label: "Food" },
  { value: "Travel", label: "Travel" },
  { value: "Tech", label: "Tech" },
  { value: "Wedding", label: "Wedding" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "Decor", label: "Decor" },
  { value: "Parenting", label: "Parenting" },
  { value: "Photography", label: "Photography" },
  { value: "Design", label: "Design" },
  { value: "Luxury", label: "Luxury" },
  { value: "DIY", label: "DIY" },
  { value: "Repost", label: "Repost" },
  {value: "Organic/Gardening", label: "Organic/Gardening"}
];

var x = [];
var y = [];

function App(props) {
  const history = useHistory();

  function Next() {
    y=[]
    x.forEach(item => {
      y.push(item.value);
    });
    x = [];
    if (y.length > 3 || y.length === 0) {
      return Swal.fire({
        title: 'Wrong no. of Categories',
        text: 'Select 1 to 3 categories!',
        icon: 'warning',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Okay',
      })
    } else {
      props.setCategories(y);
    history.push('/createaccount5');
    
    }
  }

  function selection(e) {

    x = e;
  }

  return (
    <>
    <Navbar/>
      <div className="appcreateaccount1 container-fluid">
        <div className="row">
          <div className="col s12 m12">
            
        <div className="wrappercreateaccount1">
          <h1 style={{marginTop:"10px"}}>Sign Up</h1>
          <h4 className="center-align">Select 1 to 3 categories</h4>
          <Select
            options={categories}
            closeMenuOnSelect={false}
            isMulti
            className="select"
            onChange={val => selection(val)}
          />
          <button className="buttn" onClick={Next} id="submit">Next</button>
          <span>or</span>
          <div className="afteror">
            <Link to={"/signin"} className="new">
              Already have an account
            </Link>
          </div>
        </div>
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
