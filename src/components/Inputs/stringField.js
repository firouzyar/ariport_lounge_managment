import React from "react";
import Input from "./Text/index";
import TextArea from "./TextArea/index";
//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStarOfLife} from '@fortawesome/free-solid-svg-icons';
import "./stringField.scss";

const stringField = ({ label,required, ...inputProps }) =>{
    return (
        <div className={`formBlock form-floating-label ${inputProps.type}`}>
           {inputProps.type === "textarea" ? <TextArea { ...inputProps }/>: <Input  { ...inputProps } />}
            {label &&
            <label className="input_label" htmlFor={inputProps.id}>
                {label} {required &&  <FontAwesomeIcon className="requiredIcon" icon={faStarOfLife} />}
            </label>
            }

        </div>
    );
}
export default stringField;
