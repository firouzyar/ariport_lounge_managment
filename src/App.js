import React, {Fragment} from 'react';
import Route from './Route/index';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
      <Fragment>
          <Route/>
          <ToastContainer />
      </Fragment>
  );
}

export default App;
