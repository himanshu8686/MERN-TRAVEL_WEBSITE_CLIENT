import React, { Component } from 'react';
import {connect} from 'react-redux';
import {userLoginRequest} from '../../actions/userActionCreators';


class LoginUser extends Component {
constructor(props){
super(props);

this.state = {
    email: '',
    password: ''
}
}

onChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    });
}

onSubmit = (event) => {
    event.preventDefault();
    const userToBeLogin = {
        email: this.state.email,
        password: this.state.password
    }

    this.props.userLoginRequest(userToBeLogin,this.props.history);
}
render() {

const {error}=this.props;
const{userDetails}=this.props.userFromCombineReducer;
const{userLogoutDetails}=this.props.userFromCombineReducer;
// console.log('error from login page',this.props.error)
console.log('details in LoginUser page',this.props.userFromCombineReducer)

const errorAlert =(
<div className="alert alert-warning alert-dismissible">
    <button type="button" className="close" data-dismiss="alert">&times;</button>
    <strong>Error!</strong> {error.message}
</div>

);

const successalert =(
<div className="alert alert-warning alert-dismissible">
    <button type="button" className="close" data-dismiss="alert">&times;</button>
    <strong>Hurray!</strong> {userDetails.message}
</div>
);
const logoutalert =(
    <div className="alert alert-warning alert-dismissible">
        <button type="button" className="close" data-dismiss="alert">&times;</button>
        <strong>Hurray!</strong> {userLogoutDetails.message}
    </div>
    );

return (
<div className="container">
    <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
            <div className="account-wall mt-5">
                <h2 className="text-center text-dark">LOG IN</h2>
                {
                error.message && (errorAlert)
                }
                {
                    userLogoutDetails && (logoutalert)
                }
                {/* {
                userDetails.message && (successalert)
                } */}
                <form onSubmit={this.onSubmit}>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <i className="fas fa-envelope-open"></i>
                            </div>
                        </div>
                        <input type="email" name="email" onChange={this.onChange} className="form-control"
                            placeholder="email" required />
                    </div>

                    <div className="input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <i className="fas fa-lock"></i>
                            </div>
                        </div>
                        <input type="password" name="password" onChange={this.onChange} className="form-control"
                            placeholder="Password" required />
                    </div>

                    <div className="text-center mt-3">
                        <button type="submit" className="btn btn-secondary">Login</button>
                    </div>

                </form>
            </div>
        </div>
        <div className="col-md-3"></div>
    </div>
</div>
);
}
}
/**
* mapStateToProps=> take state as aparameter and return the object
*/
const mapStateToProps = state=>({
error:state.error,
userFromCombineReducer:state.userFromCombineReducer // user is from combine reducer
});
export default connect(mapStateToProps,{userLoginRequest})(LoginUser);