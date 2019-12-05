import React, {Fragment, useEffect, useState} from 'react'
//components
import Loader from "react-loader-spinner";
import StringField from "../../components/Inputs/stringField";
import Button from "../../components/Buttons/Button";
import useForm from "../../components/Form/useForm";
//styles
import "./addLounges.scss"
//utils
import validate from "../../ustils/validation";
import apiService from "../../ustils/apiRequests";
import {toast} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

function AddLounges (props){
   const ToastMessage = ({message}) => <div><FontAwesomeIcon icon={faCheck}/><span style={{marginLeft:"10px"}}>{message}</span></div>;
   const { handleChange, handleSubmit, values, errors } = useForm(
      handleAddLounge,
      {
         airport: '',
         name: '',
         price:0,
         info: '',
         max_capacity: 0,
         available: false,
         image_url:""
      },
      validate
   );
   const [loader, setLoader] = useState(true);
   useEffect( () =>{
      setLoader(false);
   },[]);


   function handleAddLounge() {
      apiService.post("/api/v1/admin/lounges",JSON.stringify(values))
         .then( response => {
            toast.success(<ToastMessage message={response.data.message}/>,{
               position: "top-right",
               autoClose: 3500,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: false
            });
            props.history.push('/landing')
         })
         .catch(reason =>{
            toast.success(<ToastMessage message={reason.data.message}/>,{
               position: "top-right",
               autoClose: 3500,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: false
            });
         })
   }
   return(
      <div className="add-lounge-wrapper">
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
            <h1 className="page-title">Add Lounges</h1>
            <div className="box add-lounge-box">
               <h2>Please fill all the inputs to add new lounge</h2>
               <form onSubmit={handleSubmit} noValidate>
                  <div className="addLoungeInputWrapper">
                     <StringField
                        value={values.airport}
                        id="airport"
                        name="airport"
                        placeholder="Airport Name"
                        label="Airport"
                        type="text"
                        onChange={handleChange}
                        required={true}
                     />
                     {errors.airport && <span className="error">{errors.airport}</span>}
                  </div>
                  <div className="addLoungeInputWrapper">
                     <StringField
                        value={values.name}
                        id="name"
                        name="name"
                        placeholder="Lounge Name"
                        label="lounge name"
                        type="text"
                        onChange={handleChange}
                        required={true}
                     />
                     {errors.name && <span className="error">{errors.name}</span>}
                  </div>
                  <div className="addLoungeInputWrapper">
                     <StringField
                        id="price"
                        name="price"
                        placeholder="Price"
                        label="Price"
                        type="number"
                        onChange={handleChange}
                        required={true}
                     />
                     {errors.price && <span className="error">{errors.price}</span>}
                  </div>
                  <div className="addLoungeInputWrapper">
                     <StringField
                        value={values.imageUrl}
                        id="image_url"
                        name="image_url"
                        placeholder="image url"
                        label="image"
                        type="text"
                        onChange={handleChange}
                        required={true}
                     />
                     {errors.imageUrl && <span className="error">{errors.imageUrl}</span>}
                  </div>
                  <div className="addLoungeInputWrapper">
                     <StringField

                        id="max_capacity"
                        name="max_capacity"
                        placeholder="max capacity"
                        label="max capacity"
                        type="number"
                        onChange={handleChange}
                        required={true}
                     />
                     {errors.maxCapacity && <span className="error">{errors.maxCapacity}</span>}
                  </div>
                  <div className="addLoungeInputWrapper">
                     <StringField
                        value={values.info}
                        id="info"
                        name="info"
                        placeholder="Lounge info"
                        label="info"
                        type="textarea"
                        onChange={handleChange}
                     />
                  </div>
                  <div className="addLoungeInputWrapper">
                     <StringField
                        id="available"
                        name="available"
                        label="available"
                        type="checkbox"
                        onChange={handleChange}
                     />
                  </div>
                  <Button type="submit" customClass="primary-btn" value="Add Lounge"/>
               </form>
            </div>
         </Fragment>
         }
      </div>
   )
}
export default AddLounges;