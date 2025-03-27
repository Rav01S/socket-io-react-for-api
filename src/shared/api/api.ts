import {axiosClient} from "../libs/axiosClient.ts";

export type TLoginPayload = {
  email: string;
  password: string;
}

export type TRegisterPayload = {
  email: string;
  password: string;
  name: string;
}

export type TCreatePostPayload = {
  title: string;
}

export type TValidationError = {
  message: string;
  errors: []
}

export const api = {
  login: (payload: TLoginPayload) =>
    axiosClient.post('/login', payload),

  register: (payload: TRegisterPayload) =>
    axiosClient.post('/register', payload),

  getPosts: () =>
    axiosClient.get<TGetPostsResponse>('/posts'),

  createPost: (payload: TCreatePostPayload) =>
    axiosClient.post('/posts', payload),

  respondPost: (id: string | number) =>
    axiosClient.post(`/posts/${id}`),
}

export type TGetPostsResponse = {
  message: string;
  posts: Array<{
    id: number, title: string, isResponded: boolean, author: {
      id: number;
      email: string;
      name: string;
    }
  }>
}