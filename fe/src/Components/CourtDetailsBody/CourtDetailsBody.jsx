import React, { useState,useEffect } from "react";
import "./CourtDetailsBody.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import IMG from "../../Assets/download.jpeg";
import edit from "../../Assets/edit.svg";
import files from "../../Assets/files.svg";
import add from "../../Assets/add.svg";
import Modal from "../Common/Modal/Modal";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Calendar, DateRange } from "react-date-range";
import calender from "../../Assets/calender.svg";
import close from '../../Assets/close.svg'
import forward from '../../Assets/forward.svg'
import Custominput from "Components/Common/Custominput/Custominput";
import { useParams } from "react-router-dom";
import AxiosInstance from "Config/apicalls";
import { TIMINGS } from "Constant/Constant";
import { Errortoast, Successtoast } from "plugin/Toast/Toast";
import { ToastContainer } from "react-toastify";
import { showhideLoader } from '../../Redux/generalSlice';
import { useDispatch } from "react-redux";



function CourtDetailsBody() {
  const {id} = useParams()
  const[slotData,setSlotData]=useState([])
  const[selectedDate,setSelectedDate] = useState(new Date().toISOString().substring(0,10))
  const[bookingModal,setBookingModal] = useState(false)
  const[filteredTimings,setFilteredTimings]= useState(TIMINGS)
  const[selectedSlots,setSelectedSlots] = useState([])
  const[opend,setOpend]= useState(false)
  const [calenderOpen, setCalenderOpen] = useState(false);
  const [openTimeslot, setTimeslot] = useState(false);
  const [singleCourtData,setSingleCourtData] = useState({})
  const[bookedSlots,setBookedSlots] = useState([])
  const[cost,setCost] = useState('')
  const dispatch = useDispatch()
  useEffect(()=>{
   getSingleCourtData()
 
  },[])
  useEffect(()=>{
    getSlotdata()
  
   },[selectedDate])

   const getSingleCourtData = ()=>{
    dispatch(showhideLoader(true))
    AxiosInstance.get('users/getsinglecourtdata',{params:{courtId:id}}).then((res)=>{
setSingleCourtData(res.data)
dispatch(showhideLoader(false))
    }).catch((err)=>{
  console.log(err);
  dispatch(showhideLoader(false))
  Errortoast('something went wrong')
    })
  }

  const getSlotdata = ()=>{
    dispatch(showhideLoader(true))
    AxiosInstance.get('users/getslotdata',{params:{courtId:id,date:selectedDate}}).then((res) => {
      setSlotData(res.data)
      dispatch(showhideLoader(false))
    }).catch((err)=>{
      console.log(err);
      Errortoast('Something went wrong')
      dispatch(showhideLoader(false))
    })
  }

   async function initiatefunction() {

         
    const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
        Errortoast("Razorpay SDK failed to load. Are you online?");
        return;
    }

    const slotIds = bookedSlots.map(ele=>{return ele._id})

    const result = await AxiosInstance.post("/payments/orders",{courtId:id,slotIds:slotIds});

    if (!result) {
        Errortoast("Server error. Are you online?");
        return;
    }

    
    const { amount, id: order_id, currency,receipt } = result.data;

    const options = {
        key: process.env.REACT_APP_RP_KEY_ID, 
        amount: amount.toString(),
        currency: currency,
        name: "Green Grid pvt.ltd",
        description: "booking payments",
        image: null,
        order_id: order_id,
        handler: async function (response) {
            const data = {
                orderCreationId: order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                receipt,
                slotIds,
                courtId:id,
                date:selectedDate
            };

            const result = await AxiosInstance.post("/payments/verify", data);
            setBookingModal(false)
            getSlotdata()
            Successtoast('Booking Completed')
        },
        prefill: {
            name: "Soumya Dey",
            email: "SoumyaDey@example.com",
            contact: "9999999999",
        },
        notes: {
            address: "Soumya Dey Corporate Office",
        },
        theme: {
            color: "#61dafb",
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}


  function loadScript(src) {
      return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = () => {
              resolve(true);
          };
          script.onerror = () => {
              resolve(false);
          };
          document.body.appendChild(script);
      });}
  

   const setorDeSelectSlot = (slot)=>{
        if(bookedSlots.find((ele)=>ele._id===slot._id)){
         const temp = bookedSlots.filter(ele=>ele._id!==slot._id)
         setBookedSlots(temp)
        }else{
          setBookedSlots([...bookedSlots,slot])
        }
   }



  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
    key: "selection",
  });
  const selectSlot =(e,slot)=>{
     e.stopPropagation()
     setOpend(false)
     setSelectedSlots([...selectedSlots,slot])
     const newFilter = filteredTimings.filter(element=>element.id!==slot.id)
     setFilteredTimings(newFilter)
  }
const createCourtSchedule = ()=>{
  dispatch(showhideLoader(true))
  AxiosInstance({
    url:'/admin/createschedules',
    method:'post',
    data:{
      startDate:dateRange.startDate,
      endDate:dateRange.endDate,
      cost:cost,
      selectedSlots:selectedSlots,
      courtId:id
    }
  }).then((res)=>{
    Successtoast('court created successfully')
    dispatch(showhideLoader(false))
    setTimeslot(false)
  }).catch((err)=>{
  // console.log(err);
  Errortoast('court creation failed')
  dispatch(showhideLoader(false))
  
  })
}

  return (
    
    <div className="details-page">
      <ToastContainer />
      <div className="details-image-box">
        <img className="details-image" src={IMG} alt="" />
        <div className="details-image-content">
          <div className="d-flex justify-content-center d-column">
            <div className="text-white mx-5">
              <h3>{singleCourtData.name}</h3>
            </div>
            <div className="text-white mx-5">
              <p>{singleCourtData.location}</p>
            </div>
            <div className="d-flex align-self-end gap-3 mx-3">
              <button onClick={()=>setBookingModal(true)}>
                <img src="" alt="" height={"20px"} />
                BOOK
              </button>
              <button>
                <img src={edit} alt="" height={"20px"} />
              </button>
              <button>
                <img src={files} alt="" height={"20px"} />
              </button>
              <button onClick={() => setTimeslot(true)}>
                <img src={add} alt="" height={"20px"} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <ReactQuill readOnly={true} theme="bubble" className="" value={singleCourtData.description} />
      {openTimeslot && (
        <Modal
          heading={"Adding New Time Slot Data"}
          closeModal={() => setTimeslot(false)}
        >
          <div className="time-slot-select-modal p-3">
            <label htmlFor="">Select date range</label>
            <img
              src={calender}
              alt=""
              height={"20px"}
              onClick={() => {
                setCalenderOpen(true);
              }}
              className="m-2"
            />
                     <div className="d-flex gap-2 align-items-center">
                               <div className="timeslot-date flex-grow-1 border border-1 rounded-2 p-2"> {new Date(dateRange.startDate).toLocaleDateString()}</div>
                               <img src={forward} alt="" height={'20px'}/>
                               <div  className="timeslot-date flex-grow-1 border border-1 rounded-2 p-2">  {new Date(dateRange.endDate).toLocaleDateString()} </div>
                     </div>
            {calenderOpen && (
              <div className="calender-box">
                  <img
                  src={close}
                  alt=" "
                  height={"30px"}
                  className="modal-close-icon"
                  onClick={()=>{setCalenderOpen(false)}}
                />
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setDateRange(item.selection)}
                  moveRangeOnFirstSelection={false}
                  ranges={[dateRange]}
                />

              

                <div className="d-flex justify-content-end mt-2 gap-3 p-2">
                  <button className="common-button bg-black text-white" onClick={()=>setCalenderOpen(false)}>
                    Cancel
                  </button>
                  <button className="common-button" onClick={()=>setCalenderOpen(false)}>Select</button>
                </div>
              </div>
            )}
            <div className="mt-2">
                <Custominput name={'cost'} label={'Cost'} value={cost} onchange={(e)=>setCost(e.target.value)} />
            </div>
            <div className="range-label position-relative mt-3 p-2" onClick={()=>{setOpend(true)}}>
                Select Slots
               {opend && <ul className="slot-list">
                {filteredTimings.map((slot)=><li onClick={(e)=>{selectSlot(e,slot)}}>{slot.name}</li>)}
                </ul>}
                <div className="d-flex gap-2 mt-2">
                  {selectedSlots.map((slot)=><span className="border border-1 rounded-2 px-2 py-1 mt-2">{slot.name}</span>)}
                </div>
            </div>
            <div className="d-flex justify-content-end mt-2 gap-3 p-2">
            <button className="common-button bg-black text-white">
                    Cancel
                  </button>
                  <button className="common-button" onClick={createCourtSchedule}>Create</button>
                </div>
            </div>
          
        </Modal>
      )}

      {bookingModal && <Modal heading={"Booking Slots"}
          closeModal={() => setBookingModal(false)}>

            <div className="time-slot-select-modal p-3 h-100 d-flex flex-column">
            <label htmlFor="" className="mt-1">Start Date :</label>
            <input type="date" className="p- px-2 mx-2 border rounded-1" value={selectedDate} min={new Date().toISOString().substring(0,10)}
              onChange={(e)=>setSelectedDate(e.target.value)}
            />
            <label htmlFor="">Available Slots</label>
            <div className="d-flex flex-wrap gap-2 mt-1">
              {slotData.map((slot)=> <span className={`${
                bookedSlots.find(ele=>ele._id===slot._id)?'bg-info-subtle':
                slot.bookedBy ? 'notavailable': 'availableslots'} px-2 py-1 mt-2`}
              onClick={()=>!slot.bookedBy&&setorDeSelectSlot(slot)}
              >{slot.slot.name}
              </span>)}
                
            </div>
            <div className="d-flex justify-content-end mt-2 gap-3 p-2">
            <button className="common-button bg-black text-white">
                    Cancel
                  </button>
                  <button className="common-button" onClick={initiatefunction}>Book</button>
                </div>

            </div>
        
        </Modal>}
    </div>
  );
}

export default CourtDetailsBody;
