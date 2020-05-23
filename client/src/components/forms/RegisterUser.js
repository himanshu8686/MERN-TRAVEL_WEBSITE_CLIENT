import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { userSignUpRequest } from '../../actions/userActionCreators'

class RegisterUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lastname: '',
            email: '',
            password: '',
            confirmPassword: ''
            // error:{}
        }
    }
    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmit=(event)=>{
        event.preventDefault();
        // console.log(this.state);

        const user={
            name:this.state.name,
            lastname:this.state.lastname,
            email:this.state.email,
            password:this.state.password,
            confirmPassword:this.state.confirmPassword
        };
        
    this.props.userSignUpRequest(user,this.props.history)
    
    }

    render() {
        const {error}=this.props;
        const{userFromCombineReducer}=this.props;
        console.log(this.props.error)
        console.log('details in RegisterUser page',this.props.userFromCombineReducer)
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <div className="account-wall mt-5">
                            <h2 className="text-center text-dark">SIGN UP</h2>

                            {error.message &&
                            <div className="alert alert-warning alert-dismissible">
                                <button type="button" className="close" data-dismiss="alert">&times;</button>
                                <strong>Error!</strong> {error.message}
                            </div>
                            }

                            <form onSubmit={this.onSubmit}>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <i className="fas fa-user"></i>
                                        </div>
                                    </div>
                                    <input type="text" name="name" value={this.state.name} onChange={this.onChange}
                                        className="form-control" placeholder="First name" required />
                                </div>

                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <i className="fas fa-user"></i>
                                        </div>
                                    </div>
                                    <input type="text" name="lastname" value={this.state.lastname}
                                        onChange={this.onChange} className="form-control" placeholder="Last name"
                                        required />
                                </div>

                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <i className="fas fa-envelope-open"></i>
                                        </div>
                                    </div>
                                    <input type="email" name="email" value={this.state.email} onChange={this.onChange}
                                        className="form-control" placeholder="email" required />
                                </div>

                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <i className="fas fa-lock"></i>
                                        </div>
                                    </div>
                                    <input type="password" name="password" value={this.state.password}
                                        onChange={this.onChange} className="form-control" placeholder="Password"
                                        required />
                                </div>


                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <i className="fas fa-lock"></i>
                                        </div>
                                    </div>
                                    <input type="password" name="confirmPassword" value={this.state.confirmPassword}
                                        onChange={this.onChange} className="form-control" placeholder="Confirm password"
                                        required />
                                </div>

                                <div className="text-center mt-3">
                                    <button type="submit" className="btn btn-secondary">Register</button>
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
RegisterUser.propType={
    userSignUpRequest:PropTypes.func.isRequired,
    error:PropTypes.object.isRequired
}

/**
 * mapStateToProps=> take state as aparameter and return the object
 */
const mapStateToProps = state=>({
    error:state.error,
    userDetails:state.userFromCombineReducer.userDetails // user is from combine reducer
});

export default connect(mapStateToProps,{userSignUpRequest})(RegisterUser);