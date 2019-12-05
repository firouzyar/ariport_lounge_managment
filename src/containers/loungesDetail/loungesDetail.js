import React, {useState, useEffect, Fragment} from "react";
import apiService from "../../ustils/apiRequests";
import {useSelector} from "react-redux";

//component
import Button from "../../components/Buttons/Button";
import Loader from 'react-loader-spinner';
import Flatpickr from 'react-flatpickr';
import StringField from "../../components/Inputs/stringField";
import {toast} from "react-toastify";
//style
import "./loungesDetail.scss";
import 'flatpickr/dist/themes/material_red.css'
//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';




function Detail (props) {
   const user = useSelector(state => state.user);
   const [lounge, setLounge] = useState({});
   const [loader, setLoader] = useState(true);
   const [extraInfo, setExtraInfo] = useState({ gym: false, massageRoom: false,meetingRoom:false});
   const id = props.match.params.id;
   const {image_url,name,info,price,available,airport,max_capacity} = lounge;
   const ToastMessage = ({message}) => <div><FontAwesomeIcon icon={faCheck}/><span style={{marginLeft:"10px"}}>{message}</span></div>;
   // get detail data
   useEffect( () =>{
      apiService.get(`/api/v1/lounges/${id}`)
         .then(response =>{
            setLounge(response.data);
            setLoader(false);
         }).catch(error =>{
         //TODO add error handler for 403 session expired
      });
   },[id]);

   //delete lounge if the user is admin
   const deleteLoungeHandler = () =>{
      apiService.delete(`/api/v1/admin/lounges/${id}`)
         .then(response =>{
            toast.success(<ToastMessage message={response.data.message}/>,{
               position: "top-right",
               autoClose: 3500,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: false
            });
            props.history.push('/landing');
         }).catch(reason =>{
            toast.success(<ToastMessage message={reason.data.message}/>,{
               position: "top-right",
               autoClose: 3500,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: false
            });
         });
   };
   //set extra info for lounges
   const setExtraHandler = (e) =>{
      setExtraInfo({
         ...extraInfo,
         [e.target.name]: e.target.checked
      });
   }
   //Book lounge
   const bookLoungeHandler = () =>{
      let matches = document.querySelector(".flatpickr-input");
      if(matches.value){
         matches.classList.remove('error');
         let date_time = matches.value.split(" ");
         let data = {
            "booking_date": date_time[0],
            "booking_hour": date_time[1],
            extra_services:extraInfo
         }
         apiService.post(`/api/v1/lounges/${id}/book`,data)
            .then(response =>{
               toast.success(<ToastMessage message={`${name} has booked successfully`}/>,{
                  position: "top-right",
                  autoClose: 3500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: false
               });
            }).catch(error =>{
            console.log(error)
         });
      }
      else{
         matches.classList.add('error');
      }
   };

   //check if image url is valid or not
   const validUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(image_url);
   const booking = (available) ?
      <div className="box booking-box">
         <h3>this Lounge is available for booking</h3>
         <div className="booking-info">
            <Flatpickr data-enable-time placeholder="please select date and time"/>
            <StringField
               id="gym"
               name="gym"
               label="gym"
               type="checkbox"
               onChange={setExtraHandler}
            />
            <StringField
               id="massageRoom"
               name="massageRoom"
               label="massage room"
               type="checkbox"
               onChange={setExtraHandler}
            />
            <StringField
               id="meetingRoom"
               name="meetingRoom"
               label="meeting room"
               type="checkbox"
               onChange={setExtraHandler}
            />

         </div>
         <Button type="button" customClass="primary-btn" click={bookLoungeHandler}>Book</Button>
      </div> :
      <div className="no-available-wrapper">This Lounge is not available right now</div>;
   return(
      <div className="detail-wrapper">
         <Loader
            type="Oval"
            color="#00BFFF"
            height={45}
            width={45}
            visible={loader}
            className="loader"
         />
         {!loader &&
         <Fragment>
            {user.user.role === "admin" &&
            <div className="delete-wrapper">
               <Button type="button" customClass="danger-btn" click={deleteLoungeHandler}>delete</Button>
            </div>
            }
            <h1 className="page-title">{name}</h1>
            <div className="detail-content">
               <div className="img-wrapper">
                  <img src={(image_url && validUrl)? image_url: "https://placehold.co/200x200/d82e2f/white"} alt={name}/>
               </div>
               <div className="info-wrapper">
                  <p className="info-descr">{info}</p>
                  <div className="extra-info">
                     <span className="price">Price: {price}</span>
                     <span >Capacity: {max_capacity}</span>
                     <span >Airport: {airport}</span>
                  </div>
                  {booking}
               </div>
            </div>
         </Fragment>
         }
      </div>
   )
}
export default Detail;