import React, { useRef, useState } from "react";
import "./Newcourt.css";
import Custominput from "Components/Common/Custominput/Custominput";
import addicon from '../../Assets/add_icon.svg'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AxiosInstance from "Config/apicalls";
import { ToastContainer } from "react-toastify";
import { Errortoast,Successtoast } from 'plugin/Toast/Toast'
import { useNavigate } from "react-router-dom";
function Newcourt() 
{
    const[courtData,setCourtData] = useState({})
    const[selectedFiles,setSelectedFiles] = useState([])
    const navigate = useNavigate()
    const handleChange = (e)=>{
           setCourtData({...courtData,[e.target.name]:e.target.value})
    }
    const fileinputRef = useRef()

    const handleInputfileChange = (e)=>{
       
        const files = Array.from(e.target.files)
        const validfiles = files.filter((file)=>{return file.type.startsWith('image/') || file.type.startswith('video/')})

        setSelectedFiles(prevState=>[...prevState,...validfiles])
    }

    const handleAddiconClick = ()=>{
        fileinputRef.current.click()
    }
    const handleDescriptionChange = (e)=>{
        setCourtData({...courtData,description:e})
    }

    const handleCreateCourt=()=>{
        const formDatatoSend = new FormData()
        selectedFiles.forEach((file)=>{
            formDatatoSend.append('files',file)
        })

        Object.entries(courtData).forEach(([key,value])=>{
            formDatatoSend.append(key,value)
        })

        AxiosInstance({
            url:'/admin/createnewcourt',
            method:'post',
            data:formDatatoSend,
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }).then((res)=>{
           Successtoast('New court added successfully')
          //  navigate('/home')
        }).catch((err)=>{
           Errortoast('Something went wrong')
        })
    }
  return (
    <>
    <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="d-flex justify-content-between gap-3 px-3 mt-2">
            <h3>Add New Court</h3>

            <span className="d-flex mt-2">
              <button className="common-button bg-black text-white mx-2">
                Cancel
              </button>
              <button className="common-button" onClick={handleCreateCourt}>Create</button>
            </span>
          </div>
          <div className="col-lg-4 col-md-6 mt-3">
            <Custominput label={'Name'} type={'Text'} name={'name'} value={courtData.name} onchange={handleChange} />
          </div>

          <div className="col-lg-4 col-md-6 mt-3">
            <Custominput label={'Location'} type={'Text'} name={'location'} value={courtData.location} onchange={handleChange} />
          </div>

          <div className="col-lg-4 col-md-6 mt-3">
            <Custominput label={'Type'} type={'Text'} name={'type'} value={courtData.type} onchange={handleChange} />
          </div>

          <div className="col-lg-4 col-md-6 mt-3">
            <Custominput label={'Address Line 1'} type={'Text'} name={'address1'} value={courtData.address1} onchange={handleChange} />
          </div>

          <div className="col-lg-4 col-md-6 mt-3">
            <Custominput label={'Address Line 2'} type={'Text'} name={'address2'} value={courtData.address2} onchange={handleChange} />
          </div>

          <div className="col-lg-4 col-md-6 mt-3">
            <Custominput label={'Address Line 3'} type={'Text'} name={'address3'} value={courtData.address3} onchange={handleChange} />
          </div>

          <div className="col-lg-4 col-md-6 mt-3">
            <Custominput label={'landMark'} type={'Text'} name={'landmark'} value={courtData.landmark} onchange={handleChange} />
          </div>

          <div className="col-lg-4 col-md-6 mt-3">
            <Custominput label={'Pincode'} type={'Text'} name={'pincode'} value={courtData.pincode} onchange={handleChange} />
          </div>

          <div className="col-lg-4 col-md-6 mt-3">
            <Custominput label={'Number'} type={'number '} name={'number'} value={courtData.number} onchange={handleChange} />
          </div>

             <div className="mt-2 d-flex flex-wrap gap-2">
                {selectedFiles.map((file,index)=>
                <>
                {file.type.startsWith('image/') && <img src={URL.createObjectURL(file)} height={150} width={150}/>}
                {file.type.startsWith('video/') && <video src={URL.createObjectURL(file)} height={150} width={150} />}
                </>
            )}
                <div>
                <input type="file"
                ref={fileinputRef}
                onChange={handleInputfileChange}
                multiple
                accept="image/*, video/*"
                style={{display:'none'}}
                />
                <img src={addicon} alt="" height={'150px'} width={'120px'} onClick={handleAddiconClick}/>
                </div>
             </div>
             <ReactQuill className="mt-3 mb-3"style={{height:'230px'}} theme="snow" value={courtData.description} onChange={handleDescriptionChange} />
        </div>
      </div>
    </>
  );
}

export default Newcourt;
