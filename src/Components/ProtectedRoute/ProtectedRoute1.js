import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';

class ProtectedRoute extends React.Component {
    render() {
        const Component = this.props.component;
        const {isAuthenticated} = this.props;

        return isAuthenticated ? ( //change heree
            <Component /> 
        ) : (
            <Redirect to={{pathname: '/signin'}} />
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.userDetails.authDone
    }
}

export default connect(mapStateToProps, undefined)(ProtectedRoute);