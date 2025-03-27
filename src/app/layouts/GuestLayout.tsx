import {Navigate, Outlet} from "react-router-dom";
import Header from "../../widgets/Header";
import {ToastContainer} from "react-toastify";

export default function GuestLayout() {
  const token = !!localStorage.getItem('token');
  if (token) {
    return <Navigate to={"/posts"}/>
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