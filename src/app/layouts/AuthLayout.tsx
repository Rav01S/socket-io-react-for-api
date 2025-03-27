import {Navigate, Outlet} from "react-router-dom";
import Header from "../../widgets/Header";
import {initializeSocket} from "../../socketIO.ts";
import {useEffect} from "react";
import {toast, ToastContainer} from "react-toastify";

export default function AuthLayout() {
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      const socket = initializeSocket(token);
      socket.connect();

      socket.on('yourPostResponded', (data) => {
        toast.success(data.message);
      })

      return () => {
        socket.disconnect();
      };
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/login"/>;
  }

  return (
    <>
      <Header/>
      <main>
        <div className="container">
          <Outlet/>
        </div>
        <ToastContainer/>
      </main>
    </>
  );
}