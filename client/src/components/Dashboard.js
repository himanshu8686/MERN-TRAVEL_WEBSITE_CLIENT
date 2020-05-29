import React, { useEffect, useState } from 'react';
import Axios from 'axios';

function Dashboard() {

    const [Products, setProducts]= useState([])

    /**
     * useEffect is short for ‘use side effect’. Effects are when our application reacts with the outside world,
     * like working with an API. It allows us to run a function based on whether something changed.
     * useEffect also allows us to combine componentDidMount and componentDidUpdate.
     */
    useEffect(()=>{
        Axios.post("http://localhost:4000/api/product/getProducts")
        .then(response=>{
            if (response.data.success)
            {
                setProducts(response.data.results)
                console.log(response.data.results)
            }else{
                alert('Failed to fetch product data')
            }
        })
    },[])

const renderCards = Products.map((product,index)=>{
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

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10">

                    <h3 className="text-center">Lets TRAVEL <i className="fas fa-suitcase-rolling"></i></h3>
                    <br></br>

                    {/* filter  */}
                    {/* search */}

                            {
                                Products.length === 0 ? 
                                <div className="text-center">No Products to display! </div>
                                :
                                <div className="row">
                                   {renderCards}
                                </div>
                            }

                    <div className="text-center">
                        <button className="btn btn-outline-secondary">Load more</button>
                        </div>
                </div>

                <div className="col-md-1"></div>
            </div>
        </div>
    );
}

export default Dashboard;