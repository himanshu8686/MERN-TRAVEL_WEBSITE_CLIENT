import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Axios from 'axios';

const imageMaxSize=1024*1024*8; // 8 mb

class FileUpload extends Component {

   constructor(props)
   {
       super(props)
       this.state={
           Images:[]
       }
      
   }
   onDrop=(acceptedFiles,rejectedFiles)=>{
    console.log("accepted files",acceptedFiles)
    console.log("rejected files",rejectedFiles)
    

    if (rejectedFiles && rejectedFiles.length > 0) {
        const currentRejectFile = rejectedFiles[0]
        const currentRejectFileSize = currentRejectFile.file.size
        console.log('size', currentRejectFileSize)
        if (currentRejectFileSize > imageMaxSize) {
            alert('This file is too big try less than 5 mb');
        }
    }
    
    if (acceptedFiles && acceptedFiles.length > 0) {
        const currentAcceptFile = acceptedFiles[0]
        const currentAcceptFileSize = currentAcceptFile.size
        console.log('size', currentAcceptFileSize)
        if (currentAcceptFileSize < imageMaxSize) {
            const data = new FormData()
            data.append('file', acceptedFiles[0]) 
            {/**save the image we chose inside node api  */ }

            Axios.post('http://localhost:4000/api/product/uploadImage', data)
                .then(response => {
                    if (response.data.success) {
                        console.log(response.data)
                        this.setState({
                            Images: this.state.Images.concat(response.data.image)
                        }) // ['uploads\img1',uplaods\img2]
                        this.props.refreshFxn({
                            Images: this.state.Images
                        })
                    } else {
                        alert('Failed to save the Image in server')
                    }
                }).catch(error => {
                    console.log(error)
                    alert(error.message);
                })
        }
    }
}

    render() {
        const{refreshFxn}=this.props;
        return (
            <div className="image-upload mt-5">
                <div className="row">
                    <Dropzone
                        onDrop={this.onDrop}
                        multiple={false}
                        maxSize={imageMaxSize}
                    >
                    {({ getRootProps, getInputProps}) =>(
                        <div className="col-md-6" {...getRootProps()}>
                            <input {...getInputProps()} />

                                <div className="icon-plus text-center">
                                <div className="inner-content">
                                <p>Click/Drag to drop an Image to upload</p>
                                <i className="fas fa-plus text-secondary"></i>
                                </div>

                        </div>
                         </div>
                    )}
                        
                    </Dropzone>
                        {/** Render the image after droping in dropzone */}
                    <div className="col-md-6 custom-img-view">
                    { this.state.Images.map((image,index)=>(
                            <img key={index} src={`http://localhost:4000/${image}`}
                             alt={`productImg-${index}`} ></img>
                    ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default FileUpload;