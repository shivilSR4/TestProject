import React, { useEffect, useState } from 'react'
import Cards from '../Cards/Cards'
import AxiosInstance from 'Config/apicalls'
import { Errortoast } from 'plugin/Toast/Toast'
import { ToastContainer } from 'react-toastify'

function CourtListBody() {
  const[courtData,setCourtData]=useState([])
  useEffect(()=>{
    getAllCourtData()
  },[])
  const getAllCourtData = ()=>{
    AxiosInstance.get('/users/getallcourtdata').then((res)=>{
          setCourtData(res.data)
    }).catch((err)=>{
   console.log(err);
   Errortoast('Something Went Wrong')
    })
  }
  return (
    <div className='cout_list_body  d-flex flex-wrap flex-row gap-3 justify-content-center my-3 p-2'>
       <ToastContainer />
        {courtData.map((court)=> <Cards court={court}/>)}
        
    </div>
  )
}

export default CourtListBody