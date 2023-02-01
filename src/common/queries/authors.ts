import axios from "axios";
import { TAuthor, TAuthorsAvatar } from "../contexts/authors/types";
import { baseUrl } from "../lib/constans";

export async function fetchAllAuthors(limit: number): Promise<TAuthor[]> {
  const res = await axios.get(`${baseUrl}/users?&_limit=${limit}`);

  if (res.status !== 200) {
    throw new Error("Error fetching authors");
  }

  return res.data;
}

export async function fetchSingleAuthor(userId: number): Promise<TAuthor> {
  const res = await axios.get(`${baseUrl}/users/${userId}`);

  if (res.status !== 200) {
    throw new Error("Error fetching single author");
  }
  return res.data;
}

export async function fetchAuthorsAvatar(
  userId: number,
  limit: number
): Promise<TAuthorsAvatar> {
  const res = await axios.get(`${baseUrl}/photos?albumId=${userId}&_limit=1`);

  if (res.status !== 200) {
    throw new Error("Error fetching author picture");
  }

  const authorsAvatar = res.data[0];

  return authorsAvatar;
}
