export default function validation(values) {
   let errors = {};
   debugger;
   if (values.hasOwnProperty('email') && values.email === "") {
      errors.email = "Email is required";
   } else if (values.hasOwnProperty('email') && !/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
   }
   if (values.hasOwnProperty('airport') && values.airport === "") {
      errors.airport = "Airport is required";
   }
   if(values.hasOwnProperty('name') && values.name === ""){
      errors.name = "Name is required";
   }
   if(values.hasOwnProperty('price') && values.price === 0){
      errors.price = "Price is required";
   }
   else if (values.hasOwnProperty('price') && values.price <= 0) {
      errors.price = "Price should be greater than 0";
   }
   if(values.hasOwnProperty('image_url') && values.image_url === ""){
      errors.imageUrl = "Image url is required";
   }else if (values.hasOwnProperty('imageUrl') && !/((ftp|https?):\/\/)?(www\.)?[a-z0-9\-\.]{3,}\.[a-z]{3}$/.test(values.imageUrl)) {
      errors.imageUrl = "Image url address is invalid";
   }
   if(values.hasOwnProperty('max_capacity') && values.max_capacity === 0){
      errors.maxCapacity = "max capacity is required";
   }else if (values.hasOwnProperty('maxCapacity') && values.maxCapacity <= 0) {
      errors.maxCapacity = "max capacity shouldn't be less than 0";
   }
   return errors;
}