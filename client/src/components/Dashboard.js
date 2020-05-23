import React, { Component } from 'react';
import {connect} from 'react-redux';

class Dashboard extends Component {
    constructor(props){
        super(props)
    }

    /**
     *  disable back routing after entering on dashboard page
     */
    componentDidMount() {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event){
            window.history.pushState(null, document.title,  window.location.href);
        });
    }

    render() {
        const{userLoginDetails}=this.props.userFromCombineReducer;
        const {currentUserDetails}=this.props.userFromCombineReducer;
        return (
            <div>
              
                <h1>Dashboard</h1>
                {userLoginDetails.message}
              
            </div>
        );
    }
}
const mapStateToProps = state=>({
    error:state.error,
    userFromCombineReducer:state.userFromCombineReducer // user is from combine reducer
});

export default connect(mapStateToProps)(Dashboard);