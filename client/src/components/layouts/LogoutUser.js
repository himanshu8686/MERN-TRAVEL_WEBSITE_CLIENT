import {connect} from 'react-redux';
import {userLogoutRequest} from '../../actions/userActionCreators';
import React, { Component } from 'react';

class LogoutUser extends Component {
    constructor(props){
        super(props)
            this.props.userLogoutRequest(this.props.history)
    }
    render() {
        return (
            <div>
                
            </div>
        );
    }
}
const mapStateToProps = state=>({
    error:state.error,
    userFromCombineReducer:state.userFromCombineReducer // user is from combine reducer
});
export default connect(mapStateToProps,{userLogoutRequest})(LogoutUser);


