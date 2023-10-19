"use client"

import { Toaster } from 'react-hot-toast';


const ToastLayout = ({ children }) => {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      {children}
    </div>
  );
};

export default ToastLayout;