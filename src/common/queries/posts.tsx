import axios from "axios";
import { TComment, TPost } from "../contexts/posts/types";
import { TAuthor } from "../contexts/authors/types";
import { baseUrl } from "../lib/constans";

export async function fetchPostsByAuthorId(
  id: TAuthor["id"]
): Promise<TPost[]> {
  const res = await axios.get(`${baseUrl}/posts?userId=${id}`);
  return res.data;
}

export default async function addPost(data: TPost) {
  const res = await axios.post(`${baseUrl}/posts`, {
    data,
  });
  return res;
}

export async function deletePost(data: TPost) {
  const res = await axios.delete(`${baseUrl}/posts/${data.id}`);
  return res;
}

export async function fetchPostById(id: TPost["id"]): Promise<TPost> {
  const res = await axios.get(`${baseUrl}/posts?id=${id}`);
  return res.data[0];
}

export async function fetchCommentsByPostId(
  id: TPost["id"]
): Promise<TComment[]> {
  const res = await axios.get(`${baseUrl}/comments/?postId=${id}`);
  return res.data;
}
