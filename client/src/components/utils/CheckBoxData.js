import React, { useState } from 'react';

const continents=[
    {"_id":1,"name" : "Africa"},
    {"_id":2,"name":"Asia"},
    {"_id":3,"name":"Europe"},
    {"_id":4,"name":"North America"},
    {"_id":5,"name":"South America"},
    {"_id":6,"name":"Australia"},
    {"_id":7,"name":"Antartica"}
]

function CheckBoxData(props) {

    const [Checked,setChecked] = useState([])

    const handleToggle=(value)=>{
        const currentIndex = Checked.indexOf(value);  // -1 for unchecked and 1 for checked
        const newChecked = [...Checked]; // newChecked contains the index of checkboxes
        if (currentIndex === -1) {
            newChecked.push(value)
            console.log("checked",newChecked)
        }
        else{
            newChecked.splice(currentIndex,1)
            console.log("new checked",newChecked) // newChecked is filters in Dashboard's CheckBoxData parent component
        }

        setChecked(newChecked)
         //  update this checked information into parent component
        props.handleFilters(newChecked)
    }
    
const renderCheckBoxlists =() => continents.map((value,index)=>(
    <div className="form-check-inline">
        <label className="form-check-label">
            <input type="checkbox" 
            onChange={()=>handleToggle(value._id)}
            className="form-check-input" 
            value=""/>{value.name}
        </label>
    </div>
    ))

    return (
        <div id="accordion">
                        <div className="card">
                            <div className="card-header">
                                <a className="card-link" data-toggle="collapse" href="#collapseOne">
                                    <i className="fas fa-chevron-circle-down"></i> Continents Kind
                                </a>
                            </div>
                            <div id="collapseOne" className="collapse show" data-parent="#accordion">
                                <div className="card-body">
                                    {
                                        renderCheckBoxlists()
                                    }
                                    
                                </div>
                            </div>
                        </div>
                    </div>
    );
}

export default CheckBoxData;