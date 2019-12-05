import React,{Fragment} from 'react'
import Navbar from '../Navbar/Navbar';

const Layout = (props) =>{
   return(
      <Fragment>
         <Navbar/>
         <main>
            <div className="container">
               {props.children}
            </div>
         </main>
      </Fragment>
   )
}
export default Layout;