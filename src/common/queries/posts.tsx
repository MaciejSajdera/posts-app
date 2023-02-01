import axios from "axios";
import { TComment, TPost } from "../contexts/posts/types";
import { TAuthor } from "../contexts/authors/types";
import { baseApiUrl } from "../lib/constans";

export async function fetchPostsByAuthorId(
  id: TAuthor["id"]
): Promise<TPost[]> {
  const res = await axios.get(`${baseApiUrl}/posts?userId=${id}`);
  return res.data;
}

export default async function addPost(data: TPost) {
  const res = await axios.post(`${baseApiUrl}/posts`, {
    data,
  });
  return res;
}

export async function deletePost(data: TPost) {
  const res = await axios.delete(`${baseApiUrl}/posts/${data.id}`);
  return res;
}

export async function fetchPostById(id: TPost["id"]): Promise<TPost> {
  const res = await axios.get(`${baseApiUrl}/posts?id=${id}`);
  return res.data[0];
}

export async function fetchCommentsByPostId(
  id: TPost["id"]
): Promise<TComment[]> {
  const res = await axios.get(`${baseApiUrl}/comments/?postId=${id}`);
  return res.data;
}
