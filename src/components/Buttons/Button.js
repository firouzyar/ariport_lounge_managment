import React,{Fragment} from 'react';
import {Link} from "react-router-dom";

// styles
import './button.scss';


const Button = (props) => {
    const {type,customClass,path,isDisabled,click,value} = props;
    return (
        <Fragment>
            {type === "button" && <button className={`c-btn ${customClass}`} disabled={isDisabled} onClick={click}>{props.children}</button> }
            {type === "link" && <Link to={path} className={`c-btn ${customClass}`} disabled={isDisabled} onClick={click}>{props.children}</Link> }
            {type === "submit" && <input type={type} className={`c-btn ${customClass}`} value={value} disabled={isDisabled} /> }
        </Fragment>
    );
};

export default Button;