import {useEffect, useState} from "react";
import {api, TGetPostsResponse} from "../../../shared/api/api.ts";
import {toast} from "react-toastify";
import {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";
import {getSocket} from "../../../socketIO.ts";

export default function Posts() {
  const [data, setData] = useState<null | TGetPostsResponse['posts']>(null)
  const socket = getSocket();
  const user = JSON.parse(localStorage.getItem('user') || "{}")

  const navigate = useNavigate()

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

    if (socket) {
      socket.on('newPost', (newPost) => {
        if (data)
          setData([...data, newPost]);
      })
    }
  }, [socket])

  const respond = async (id: number | string) => {
    try {
      const res = await api.respondPost(id)
      if (res.status !== 201) {
        throw res;
      }

      if (data) {
        const newData = [...data];
        const index = newData.findIndex(post => post.id === id);
        newData[index] = {...newData[index], isResponded: true};
        setData(newData);
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
      <button onClick={() => navigate('/posts/add')} className={"btn"}>Добавить</button>
      <div className="grid-container">
        {
          data !== null && data.map(post => (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>От: {post.author.name}</p>
              {
                post.author.id !== user?.id ?
                  <button disabled={post.isResponded}
                          className={"btn"}
                          onClick={() => respond(post.id)}>
                    {post.isResponded ? "Вы уже откликались" : "Откликнуться"}
                  </button>
                  :
                  <p>Это ваше объявление</p>
              }
            </div>
          ))
        }
      </div>
    </>
  );
}