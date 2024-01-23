import React from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/index';
import { ToastContainer } from 'react-toastify';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { GoogleOAuthProvider } from '@react-oauth/google';

const initialOptions = {
  clientId: "AVWo4--8AE8spDHW4T7Q0o9NGH4yvtyCq3mcdsBoA82LEt30_WmbTtjjrMGjsC8ewQS3ZVF6-UGGCDeg",
  currency: "USD",
  intent: "capture",
};

function App() {
  return (
    <>

      <GoogleOAuthProvider clientId="497434339860-7jd9opimsf3jfqmn4nig8d7dklhkud4h.apps.googleusercontent.com">
        <ToastContainer />
        <PayPalScriptProvider options={initialOptions}>
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      </GoogleOAuthProvider>
    </>
  )
}

export default App;
