import {useEffect} from "react";
import {api} from "../../../shared/api/api.ts";
import {AxiosError} from "axios";
import {toast} from "react-toastify";

export default function LogoutPage() {
  const logout = async () => {
    try {
      const res = await api.logout();
      if (res.status !== 200) {
        throw res;
      }
      localStorage.clear();

      window.location.reload();
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(e.message);
      }
    }
  }

  useEffect(() => {
    logout()
  }, [])

  return (
    <>
      Выходим...
    </>
  );
}