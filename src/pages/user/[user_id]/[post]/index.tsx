import PostDetails from "@/common/components/singlePostPage/PostDetails";
import CommentSection from "@/common/components/singlePostPage/PostDetails/CommentSection";
import PaddingBox from "@/common/components/ui/PaddingBox";
import SingleAuthorsPageHeader from "@/common/components/ui/PageHeader";
import SingleAuthorContextProvider from "@/common/contexts/authors/SingleAuthor";
import { TAuthor } from "@/common/contexts/authors/types";
import SingleAuthorsPostsContextProvider from "@/common/contexts/posts/authorsPosts";
import { TPost } from "@/common/contexts/posts/types";
import { NextPageWithLayout } from "@/common/global-types/next-components";
import { fetchSingleAuthor } from "@/common/queries/authors";
import { fetchPostById } from "@/common/queries/posts";
import RootLayout from "@/layouts/root";
import theme from "@/styles/theme";
import { Grid } from "@mui/material";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { ReactElement } from "react";

const SinglePostPage: NextPageWithLayout<{
  author: TAuthor;
  post: TPost;
}> = ({ post, author }) => {
  return (
    <SingleAuthorContextProvider id={Number(author.id)}>
      <SingleAuthorsPostsContextProvider id={Number(author.id)}>
        <Head>
          <title>{post?.title}</title>
        </Head>

        <SingleAuthorsPageHeader variant="post" />

        <Grid
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PaddingBox>
            <Grid container justifyContent={"center"}>
              <Grid item width={"100%"} mb={theme.spacing(4)}>
                <PostDetails post={post} />
              </Grid>

              <Grid item maxWidth={440}>
                <CommentSection postId={post?.id} />
              </Grid>
            </Grid>
          </PaddingBox>
        </Grid>
      </SingleAuthorsPostsContextProvider>
    </SingleAuthorContextProvider>
  );
};

SinglePostPage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default SinglePostPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = Number(context?.query?.user_id) || null;
  const postId = Number(context?.query?.post) || null;

  let author = null;
  let post = null;

  if (userId && postId) {
    author = (await fetchSingleAuthor(userId)) || null;
    post = (await fetchPostById(postId)) || null;
  }

  return {
    props: {
      author,
      post,
    },
  };
};
