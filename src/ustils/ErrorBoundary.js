import React,{Component} from 'react';
import {toast} from "react-toastify";
//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

// const ToastMessage = ({message}) => <div><FontAwesomeIcon icon={faExclamationCircle}/><span style={{marginLeft:"10px"}}>{message}</span></div>;
class ErrorBoundary extends Component {
   constructor(props) {
      super(props);
      this.state = { error: null, errorInfo: null };
   }
   static getDerivedStateFromError(error) {
      /*toast.error(<ToastMessage message={error}/>,{
         position: "top-right",
         autoClose: 3500,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: false
      });*/
      return { hasError: true };
   }

   componentDidCatch(error, errorInfo) {
      this.setState({
         error: error,
         errorInfo: errorInfo
      })
   }

   render() {
      if (this.state.errorInfo) {
         return (
            <div>
               <h2>Something went wrong.</h2>
               <details style={{ whiteSpace: 'pre-wrap' }}>
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
               </details>
            </div>
         );
      }
      // Normally, just render children
      return this.props.children;
   }
}
export default ErrorBoundary;



