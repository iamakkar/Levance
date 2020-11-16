import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import {connect} from 'react-redux';

class ProtectedRoute extends React.Component {
    render() {
        
        const {component: Component, ...props} = this.props;
        console.log(props.isAuthenticated,'Apoorv')
        return (
            <Route {...props} render={props => (this.props.isAuthenticated ? <Component {...props} /> : <Redirect to='/signin' />)} />
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.userDetails.authDone
    }
}

export default connect(mapStateToProps, undefined)(ProtectedRoute);