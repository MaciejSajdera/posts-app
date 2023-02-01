import { QueryKey, UseQueryOptions, useQuery } from "react-query";
import {
  fetchCommentsByPostId,
  fetchPostsByAuthorId,
  fetchSinglePostById,
} from "../queries/posts";
import { TComment, TPost } from "../contexts/posts/types";
// import useLocalStorage from "./localStorage";

export default function useSingleAuthorsPostsQuery(
  userId: number,
  options?: UseQueryOptions<TPost[], Error, TPost[], QueryKey>
) {
  return useQuery<TPost[], Error>({
    queryKey: ["posts", userId] as const,
    queryFn: () => fetchPostsByAuthorId(userId),
    ...options,
  });
}

export function useSinglePostByIdQuery(
  id: number,
  options?: UseQueryOptions<TPost, Error, TPost, QueryKey>
) {
  return useQuery<TPost, Error>({
    queryKey: ["post", id] as const,
    queryFn: () => fetchSinglePostById(id),
    ...options,
  });
}

export function usePostsCommentsQuery(
  postId: number,
  options?: UseQueryOptions<TComment[], Error, TComment[], QueryKey>
) {
  return useQuery<TComment[], Error>({
    queryKey: ["comments", postId] as const,
    queryFn: () => fetchCommentsByPostId(postId),
    ...options,
  });
}

// export function usePostsStorage() {
//   return useLocalStorage<TPost[]>("posts", [
//     { id: 1, userId: 1, title: "title", body: "body" },
//   ]);
// }
