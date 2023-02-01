import { TAuthor } from "../contexts/authors/types";
import { TPost } from "../contexts/posts/types";
import { NextPageWithLayout } from "./next-components";

export type TNextPageWithLayoutAndSSRProps = NextPageWithLayout<{
  author: TAuthor;
  initialPosts: TPost[];
}>;
