import {ChangeEvent, FormEvent, useState} from "react";
import {AxiosError} from "axios";
import {api, TCreatePostPayload, TValidationError} from "../../../../shared/api/api.ts";
import Error from "../../../../shared/components/Error/Error.tsx";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const initialState = {
  title: ''
}

export default function AddPostPage() {
  const [formState, setFormState] = useState<Partial<TCreatePostPayload>>({})
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof TCreatePostPayload, string>>>({})

  const navigate = useNavigate();

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
      if (res.status !== 201) {
        throw res;
      }

      toast.success("Объявление создано");
      setIsLoading(false);
      navigate('/posts')
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
      <h1>Создание объявления</h1>

      <div className="inputBx">
        <label htmlFor="title">Название объявления</label>
        <input id={"title"} name={"title"} placeholder={"Название объявления"} onChange={onChange} type="title" className="input"/>
        <Error>{errors.title}</Error>
      </div>

      <button disabled={isLoading} className={"btn"}>
        {isLoading ? "Создаём..." : "Создать"}
      </button>
    </form>
  );
}