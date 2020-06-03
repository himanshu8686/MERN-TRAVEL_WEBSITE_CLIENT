import React, { useState } from 'react';

function RadioBoxPrice(props) {
    const [Checked,setChecked] = useState('0')

    const renderRadioBox = () => props.list && props.list.map((value,index)=>(
            <div className="form-check form-check-inline">
                <input className="form-check-input" 
                type="radio" 
                name="inlineRadioOptions" 
                id="inlineRadio1"
                key={value._id}
                value={`${value._id}`}></input>
                <label className="form-check-label" for="inlineRadio1">{value.name}</label>
            </div>
        
        ))
    
        const handleChange = (event) =>{
               // console.log(event.target.value);
                setChecked(event.target.value);
                props.handleFilters(event.target.value)

            //  update this checked information into parent component
           
        }

    return (
        <div id="accordion">
        <div className="card">
            <div className="card-header">
                <a className="card-link" data-toggle="collapse" href="#collapseTwo">
                    <i className="fas fa-chevron-circle-down"></i> Sort by Price
                </a>
            </div>
            <div id="collapseTwo" className="collapse show" data-parent="#accordion">
                <div className="card-body"> 
                     <div className="form-group" onChange={handleChange} value={Checked}> 
                     {
                         renderRadioBox()
                     }
                    
                     </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default RadioBoxPrice;