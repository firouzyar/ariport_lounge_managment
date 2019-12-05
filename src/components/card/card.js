import React from "react";
import {Link} from 'react-router-dom';
//style
import "./card.scss"

 const Card = (props)=>{
   const {id,path,children,layout} = props;
    return(
          <Link
             to={{
                pathname:`${path}/${id}`,
             }}
             className="c-link-card"
          >
          <div className={`card ${layout}`}>
             {children}
          </div>
       </Link>
    )
}

export default Card;