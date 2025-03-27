import {useEffect, useState} from "react";
import {api, TGetPostsResponse} from "../../../shared/api/api.ts";
import {toast} from "react-toastify";
import {AxiosError} from "axios";

export default function Posts() {
  const [data, setData] = useState<null | TGetPostsResponse['posts']>(null)

  const getData = async () => {
    try {
      const res = await api.getPosts();
      setData(res.data.posts);
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error("Ошибка при получении постов");
      }
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const respond = async (id: number | string) => {
    try {
      const res = await api.respondPost(id)
      if (res.status !== 201) {
        throw res;
      }

      toast.success("Вы откликнулись на объявление!")
    } catch (e) {
      if (e instanceof AxiosError && e.status === 422) {
        toast.error(e.response?.data.message || "Ошибка при отклике")
      }
    }
  }

  return (
    <>
      <h1>Объявления</h1>
      <div className="grid-container">
        {
          data !== null && data.map(post => (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>От: {post.author.name}</p>
              <button className={"btn"} onClick={() => respond(post.id)}>Откликнуться</button>
            </div>
          ))
        }
      </div>
    </>
  );
}