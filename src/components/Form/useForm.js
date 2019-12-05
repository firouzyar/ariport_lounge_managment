import { useState, useEffect } from "react";

const useForm = (callback, initialState = {}, validate) => {
   const [values, setValues] = useState(initialState);
   const [errors, setErrors] = useState({});
   const [isSubmitting, setIsSubmitting] = useState(false);

   const handleChange = event => {
      const { name, value, type, checked} = event.target;
      //check if type is text set the value of target(string)
      if(type === "text" || type === "textarea" || type === "radio" || type === "select" || type === "number"){
         setValues({
            ...values,
            [name]: value
         });
      }
      //check if type is checkbox set the check status of target(boolean)
      else if(type === "checkbox"){
         setValues({
            ...values,
            [name]: checked
         });
      }

   };

   const handleSubmit = event => {
      event.preventDefault();
      setErrors(validate(values));
      setIsSubmitting(true);
   };

   useEffect(() => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
         callback();
      }
   }, [errors]);

   return {
      handleChange,
      handleSubmit,
      values,
      errors
   };
};

export default useForm;