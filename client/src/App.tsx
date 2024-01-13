import React from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/index';
import { ToastContainer } from 'react-toastify';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
  clientId: "AVWo4--8AE8spDHW4T7Q0o9NGH4yvtyCq3mcdsBoA82LEt30_WmbTtjjrMGjsC8ewQS3ZVF6-UGGCDeg",
  currency: "USD",
  intent: "capture",
};

function App() {
  return (
    <>
      <ToastContainer />
      <PayPalScriptProvider options={initialOptions}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </>
  )
}

export default App;
