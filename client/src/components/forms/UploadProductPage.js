import React, { Component } from 'react';
import FileUpload from '../utils/FileUpload';
import Axios from 'axios';
import {connect} from 'react-redux';
const Continents = [
    {key:1,value : "Africa"},
    {key:2,value:"Asia"},
    {key:3,value:"Europe"},
    {key:4,value:"North America"},
    {key:5,value:"South America"},
    {key:6,value:"Australia"},
    {key:7,value:"Antartica"}
]
class UploadProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
           productTitle:'',
           productDescription:'',
           productPrice:'',
           continents:(1),
           Images:[]
        }
    }
    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    updateImage=(newImage)=>{
        this.setState(newImage);
    }

    onProductSubmit=(event)=>{
        event.preventDefault();

        const product={
            writer:this.props.userFromCombineReducer.currentUserDetails.userId,
            productTitle:this.state.productTitle,
            productDescription:this.state.productDescription,
            productPrice:this.state.productPrice,
            continents:this.state.continents,
            Images:this.state.Images
        }

        /**
         *  calling of end point api without redux 
         */
        Axios.post('http://localhost:4000/api/product/uploadProduct',product)
        .then(response=>{
            if (response.data.success) {
                console.log(response)
                alert('Product upload successfully')
                this.props.history.push('/dashboard')
            } else {
                alert('Failed to upload Product')
            }
        })
    }
    render() {
        const {currentUserDetails}=this.props.userFromCombineReducer
        // console.log("cuurent user",currentUserDetails);
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <div className="container">
                            <h1 className="text-center">Upload Travel product</h1>

                            <FileUpload refreshFxn={this.updateImage}></FileUpload>

                            <div className="upload-form my-5 ">
                                <form onSubmit={this.onProductSubmit}>
                                    <div className="form-group">
                                        <label>Title</label>
                                        <input type="text" className="form-control" onChange={this.onChange}
                                            name="title" name="productTitle" value={this.state.productTitle}
                                            placeholder="Enter title for product" required></input>
                                    </div>
                                
                                <div className="form-group">
                                    <label for="comment">Description</label>
                                    <textarea className="form-control" name="productDescription"
                                        onChange={this.onChange} value={this.state.productDescription} rows="5"
                                        id="comment" required></textarea>
                                </div>

                                <div className="form-group">
                                    <label for="comment">Price</label>
                                    <input type="number" name="productPrice" onChange={this.onChange}
                                        value={this.state.productPrice} className="form-control"
                                        placeholder="Enter Price" required></input>
                                </div>

                                <div className="form-group">
                                    <label for="cont">Select list (select one):</label>
                                    <select className="form-control" id="cont" name="continent"
                                        onChange={this.onChange}>

                                        {
                                        Continents.map(item =>
                                            (<option key={item.key} value={item.key}>{item.value}</option>)
                                            )   
                                        }
                                    </select>
                                </div>
    
                                <button type="submit" className="btn btn-primary">Submit</button>
                              </form>
                            </div>
                     </div>
                    </div>
                <div className="col-md-2"></div>
            </div>
        </div>
        );
    }
}
const mapStateToProps = state=>({
    error:state.error,
    userFromCombineReducer:state.userFromCombineReducer // user is from combine reducer
    });
export default connect(mapStateToProps)(UploadProductPage);
