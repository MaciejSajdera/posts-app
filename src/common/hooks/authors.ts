import { useQuery } from "react-query";
import {
  fetchAuthorsAvatar,
  fetchAllAuthors,
  fetchSingleAuthor,
} from "../queries/authors";
import { TAuthor, TAuthorsAvatar } from "../contexts/authors/types";

export function useAllAuthorsQuery(limit: number) {
  return useQuery<TAuthor[], Error>({
    queryKey: ["authors", limit] as const,
    queryFn: () => fetchAllAuthors(limit),
  });
}

export function useSingleAuthorQuery(userId: number) {
  return useQuery<TAuthor, Error>({
    queryKey: ["author", userId] as const,
    queryFn: () => fetchSingleAuthor(userId),
  });
}

export function useAuthorImagesQuery(userId: number, limit: number) {
  return useQuery<TAuthorsAvatar, Error>({
    queryKey: ["userImages", userId, limit] as const,
    queryFn: () => fetchAuthorsAvatar(userId, limit),
  });
}
