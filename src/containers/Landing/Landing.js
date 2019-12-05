import React, {useState, useEffect, Fragment} from 'react';
//components
import Card from "../../components/card/card";
import Loader from "react-loader-spinner";
//utils
import apiService from "../../ustils/apiRequests";
//style
import "./landing.scss";
//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheck, faThList,faThLarge} from '@fortawesome/free-solid-svg-icons';
import {toast} from "react-toastify";




function Landing() {
   const ToastMessage = ({message}) => <div><FontAwesomeIcon icon={faCheck}/><span style={{marginLeft:"10px"}}>{message}</span></div>;
   const [lounges, setLounges] = useState([]);
   const [layout, setLayout] = useState("list-view");
   const [loader, setLoader] = useState(true);
   //get data for list of Lounges
   useEffect( () =>{
        apiService.get("/api/v1/lounges")
           .then(response =>{
              setLounges(response.data.lounges);
              setLoader(false);
           }).catch(reason =>{
              toast.error(<ToastMessage message={reason.response}/>,{
                 position: "top-right",
                 autoClose: 3500,
                 hideProgressBar: false,
                 closeOnClick: true,
                 pauseOnHover: true,
                 draggable: false
              });
        });
   },[]);
   //change layout style
   const changeLayout = (event,layout) =>{
      let matches = document.querySelectorAll(".layout.active");
      matches[0].classList.remove('active');
      event.currentTarget.classList.add("active");
      setLayout(layout);
   };
    return (
        <div className="landing-wrapper">
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
                 <h1 className="page-title">Available Lounges</h1>
                 <div className="chose-layout-wrapper">
                 <span onClick={(e) => changeLayout(e,"list-view")} className="layout active"  >
                    <FontAwesomeIcon  icon={faThList} />
                 </span>
                    <span onClick={(e) => changeLayout(e,"grid-view")}  className="layout">
                    <FontAwesomeIcon  icon={faThLarge} />
                 </span>
                 </div>
                 <div className={`lounges-wrapper ${layout}-wrapper`}>
                    {lounges.map((item,index) =>{
                       return <Card key={item.id} layout={layout} id={item.id} path="/detail">
                          {layout ==="list-view" && <div className="row-number">{index+1}</div>}
                          <img src={(item.image_url && /^(ftp|http|https):\/\/[^ "]+$/.test(item.image_url))? item.image_url: "https://placehold.co/200x200/d82e2f/white"} alt={item.name}/>
                          <div className="card-info">
                             <div className="info-wrapper">
                                <span><strong>{item.airport}</strong></span>
                                <span>Lounge: {item.name}</span>
                                <span>size: {item.max_capacity}</span>
                                <span className={item.available===true ? "available" : "not-available"}>{item.available===true ? "available" : "not available" }</span>
                                <span className="price">price: {item.price}</span>
                             </div>
                             <div className="description">
                                <p>
                                   {item.info}
                                </p>
                             </div>
                          </div>
                       </Card>
                    })}
                 </div>
              </Fragment>
           }
        </div>
    );
}

export default Landing;