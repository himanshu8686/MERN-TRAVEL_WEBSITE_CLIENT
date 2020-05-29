import React, { useEffect, useState } from 'react';
import Axios from 'axios';

function Dashboard() {

    const [Products, setProducts]= useState([])
    const [Skip,setSkip] = useState(0)
    const [Limit,setLimit] = useState(3) //initially i just want to show 3 cards
    const [PostSize,setPostSize]= useState(0)

    /**
     * useEffect is short for ‘use side effect’. Effects are when our application reacts with the outside world,
     * like working with an API. It allows us to run a function based on whether something changed.
     * useEffect also allows us to combine componentDidMount and componentDidUpdate.
     */
    useEffect(()=>{
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event){
            window.history.pushState(null, document.title,  window.location.href);
        });
        
        const variables ={
            skip:Skip,
            limit:Limit,
            
        }
      getProducts(variables)
    },[])

    /**
     * 
     */
    const getProducts=(variables)=>{
        Axios.post("http://localhost:4000/api/product/getProducts",variables)
        .then(response=>{
            if (response.data.success)
            {
                setProducts(Products.concat(response.data.results))
                setPostSize(response.data.total_results)
            }else{
                alert('Failed to fetch product data')
            }
        })
    }

    /**
     * 
     */
    const onLoadMore=()=>{
        let skip= Skip + Limit;

        const variables ={
            skip:skip,
            limit:Limit,

        }
        getProducts(variables)
        setSkip(skip)
    }


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
                    <br></br>

                    {
                        PostSize >= Limit && 
                        <div className="text-center">
                        <button className="btn btn-outline-secondary" onClick={onLoadMore}>Load more</button>
                        </div>
                    }
                    
                </div>

                <div className="col-md-1"></div>
            </div>
        </div>
    );
}

export default Dashboard;