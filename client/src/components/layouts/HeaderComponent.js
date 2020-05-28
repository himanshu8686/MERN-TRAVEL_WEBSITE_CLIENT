import React, { Component } from 'react';
import {connect} from 'react-redux';

class HeaderComponent extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const isAuthenticated=localStorage.getItem('isAuthenticated')
        const userLinks =(
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav">
                    <a href="/dashboard" className="nav-item nav-link active"><i className="fas fa-home"></i>Dashboard</a>
                </div>

                <div className="navbar-nav ml-auto">
                    <a type="button" href="/upload" className="nav-item nav-link"><i className="fas fa-upload"></i>Upload
                    </a>
                    <a type="button" href="/logout" className="nav-item nav-link"><i className="fas fa-power-off"></i>
                        Logout</a>
                </div>
            </div>
        );

        const guestLinks = (
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav">
                    <a href="/" className="nav-item nav-link active"><i className="fas fa-home"></i>Home</a>
                </div>
                <div className="navbar-nav ml-auto">
                    <a href="/login" className="nav-item nav-link"><i className="fas fa-sign-in-alt"></i> Login</a>
                    <a href="/register" className="nav-item nav-link"><i className="fas fa-user-plus"></i> Register</a>
                </div>
            </div>
        );
        return (
            <div className="top-nav">
                <nav className="navbar navbar-expand-md navbar-light bg-light">
                    <a href="/home" className="navbar-brand">Travel <i className="fab fa-telegram-plane"></i></a>
                    <button type="button" className="navbar-toggler" data-toggle="collapse"
                        data-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {isAuthenticated ? userLinks : guestLinks}
                </nav>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    error: state.error,
    userFromCombineReducer: state.userFromCombineReducer // user is from combine reducer
});
export default connect(mapStateToProps)(HeaderComponent);