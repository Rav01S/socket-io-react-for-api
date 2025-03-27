import {ChangeEvent, FormEvent, useState} from "react";
import {AxiosError} from "axios";
import {api, TCreatePostPayload, TValidationError} from "../../../../shared/api/api.ts";

const initialState = {
  title: ''
}

export default function AddPostPage() {
  const [formState, setFormState] = useState<Partial<TCreatePostPayload>>({})
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof TCreatePostPayload, string>>>({})

  const formData = {
    ...initialState,
    ...formState
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      const res = await api.createPost(formData)
      if (res.status !== 200) {
        throw res;
      }

      setIsLoading(false);
    } catch (e) {
      if (e instanceof AxiosError && e.status === 422) {
        const err = e.response?.data as TValidationError;
        setErrors({...errors, ...err.errors});
      }
      if (e instanceof AxiosError && e.status === 401) {
        setErrors({...errors, email: "Неверный email или пароль"});
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
      <h1>Вход</h1>

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
        {isLoading ? "Входим..." : "Войти"}
      </button>
    </form>
  );
}