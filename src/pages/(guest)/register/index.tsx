import {ChangeEvent, FormEvent, useState} from "react";
import {api, TRegisterPayload, TValidationError} from "../../../shared/api/api.ts";
import {AxiosError} from "axios";
import Error from "../../../shared/components/Error/Error.tsx";

const initialState = {
  email: '',
  password: '',
  name: ''
}

export default function RegisterPage() {
  const [formState, setFormState] = useState<Partial<TRegisterPayload>>({})
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof TRegisterPayload, string>>>({})

  const formData = {
    ...initialState,
    ...formState
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      const res = await api.register(formData)
      if (res.status !== 201) {
        throw res;
      }

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      window.location.reload();
      setIsLoading(false);
    } catch (e) {
      if (e instanceof AxiosError && e.status === 422) {
        const err = e.response?.data as TValidationError;
        setErrors({...errors, ...err.errors});
      }
      setIsLoading(false);
    }
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormState({...formState, [name]: value})
  }

  return (
    <form className={"form"} onSubmit={onSubmit}>
      <h1>Регистрация</h1>

      <div className="inputBx">
        <label htmlFor="name">Имя</label>
        <input id={"name"} name={"name"} placeholder={"Имя"} onChange={onChange} type="text" className="input"/>
        <Error>{errors.name}</Error>
      </div>
      <div className="inputBx">
        <label htmlFor="email">Email</label>
        <input id={"email"} name={"email"} placeholder={"Email"} onChange={onChange} type="email" className="input"/>
        <Error>{errors.email}</Error>
      </div>
      <div className="inputBx">
        <label htmlFor="password">Пароль</label>
        <input id={"password"} name={"password"} placeholder={"Пароль"} onChange={onChange} type="password"
               className="input"/>
        <Error>{errors.password}</Error>
      </div>

      <button disabled={isLoading} className={"btn"}>
        {isLoading ? "Регистрируемся..." : "Зарегистрироваться"}
      </button>
    </form>
  );
}