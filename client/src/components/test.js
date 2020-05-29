import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getAllProductRequest} from '../actions/userActionCreators';

class Dashboard extends Component {
    
     /**
     *  disable back routing after entering on dashboard page
     */
    componentDidMount() {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event){
            window.history.pushState(null, document.title,  window.location.href);
        });

        this.props.getAllProductRequest();
    }

    /**
     *  this method render cardds is responsible for having card on dashboard
     */
    renderCards = this.props.userFromCombineReducer.products.results.map((product,index)=>{
        return <div className="col-lg-4 col-md-6 col-sm-12 my-3">
        <div className="card">
              <div className="image-content">
              {
                  product.Images.map((image,indexOfImage)=>(
                          <img key={indexOfImage} src={`http://localhost:4000/${image}`} alt={`productimage-${index}`}></img>
                  ))
              }
              </div>
              
                <div className="card-bottom">
                <h5 className="text-center">{product.productTitle}</h5>
                <p className="text-secondary">{`$${product.productPrice}`}</p>
                </div>
          </div>
    </div>
    })

    render() {
        const{products} =this.props.userFromCombineReducer
         const{results}=this.props.userFromCombineReducer.products
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-1"></div>
                        <div className="col-md-10">

                            <h3 className="text-center">Lets TRAVEL <i className="fas fa-suitcase-rolling"></i></h3>
                            
                            {/* Filter */}
                             {/* Search */}

                             {
                                products.total_results === 0 ? 
                                <div className="text-center">No Products to display! </div>
                                :
                                <div className="row">
                                   {this.renderCards}
                                </div>
                            }
                    <br></br>
                        </div>
                   
                    <div className="col-md-1"></div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state=>({
    error:state.error,
    userFromCombineReducer:state.userFromCombineReducer // user is from combine reducer
});
export default connect(mapStateToProps,{getAllProductRequest})(Dashboard)