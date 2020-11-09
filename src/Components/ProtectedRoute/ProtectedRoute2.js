import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';

class ProtectedRoute extends React.Component {
    render() {
        const Component = this.props.component;
        const {isAuthenticated} = this.props;
        console.log(isAuthenticated)

        return isAuthenticated ? (
            <Redirect to={{pathname: '/dashboard'}} /> 
        ) : (
            <Component />
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.userDetails.authDone
    }
}

export default connect(mapStateToProps, undefined)(ProtectedRoute);