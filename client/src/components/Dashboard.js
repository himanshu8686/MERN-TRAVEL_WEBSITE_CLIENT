import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import CheckBoxData from './utils/CheckBoxData';

function Dashboard() {

    const [Products, setProducts]= useState([])
    const [Skip,setSkip] = useState(0)
    const [Limit,setLimit] = useState(3) //initially i just want to show 3 cards
    const [PostSize,setPostSize]= useState(0)
    const [Filters,setFilters] = useState({
        continents:[],
        price:[]
    })

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
     * gettig products from db
     */
    const getProducts=(variables)=>{
        Axios.post("http://localhost:4000/api/product/getProducts",variables)
        .then(response=>{
            if (response.data.success)
            {
                if (variables.loadMore) {
                    setProducts(Products.concat(response.data.results))
                }else{
                    setProducts(response.data.results)
                }
                // setProducts(Products.concat(response.data.results))
                setPostSize(response.data.total_results)
            }
        }).catch(error=>{
            alert('No products related to selected continents')
        })
    }

    /**
     * on load button function
     */
    const onLoadMore=()=>{
        let skip= Skip + Limit;

        const variables ={
            skip:skip,
            limit:Limit,
            loadMore:true
        }
        getProducts(variables)
        setSkip(skip)
    }

/**
 *  responsible for rendering cards
 */
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

    /**
     * handleFilters is responsible for giving back value to parent component i.e from CheckBoxData to Dashboard
     * @param {*} filters are key values of checked box i.e [1,2,3 ..]
     * @param {*} category contains {continents[], price[]}
     */
    const handleFilters=(filters,category)=>{
        // console.log('filters',filters)
        const newFilters = { ...Filters}
        newFilters[category] = filters
        // console.log('new filters',newFilters)

        if (category === "price") {
            
        }

        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

     /**
     * filtering on the basis of handle filters and after fetching filter wise set skip to 0
     * @param {*} filters 
     */
    const showFilteredResults=(filters)=>{
        const variables = {
            skip : 0,
            limit : Limit,
            filters:filters
        }

        getProducts(variables)
        setSkip(0)
    }
    
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-1"></div>
                    <div className="col-md-10">

                        <h3 className="text-center">Lets TRAVEL <i className="fas fa-suitcase-rolling"></i></h3>

                        <div className="row">
                            <div className="col-md-6">
                                <CheckBoxData handleFilters={filters=> handleFilters(filters,"continents")}></CheckBoxData>
                            </div>
                        <div className="col-md-6 bg-secondary">
                            {/* search */}
                        </div>
                        </div>
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