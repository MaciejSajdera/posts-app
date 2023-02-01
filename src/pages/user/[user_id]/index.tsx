import AddPostDialog from "@/common/components/singleAuthorsPage/AddPostDialog";
import PostsList from "@/common/components/singleAuthorsPage/PostsList";
import PaddingBox from "@/common/components/ui/PaddingBox";
import SingleAuthorsPageHeader from "@/common/components/ui/PageHeader";
import SingleAuthorContextProvider from "@/common/contexts/authors/SingleAuthor";
import { TAuthor } from "@/common/contexts/authors/types";
import SingleAuthorsPostsContextProvider from "@/common/contexts/posts/authorsPosts";
import { TPost } from "@/common/contexts/posts/types";

import { NextPageWithLayout } from "@/common/global-types/next-components";
import { fetchSingleAuthor } from "@/common/queries/authors";
import { fetchPostsByAuthorId } from "@/common/queries/posts";
import RootLayout from "@/layouts/root";
import { Box, Grid } from "@mui/material";

import { GetServerSideProps } from "next";
import Head from "next/head";
import { ReactElement } from "react";

const SingleAuthorPage: NextPageWithLayout<{
  author: TAuthor;
  initialPosts: TPost[];
}> = ({ author, initialPosts }) => {
  return (
    <SingleAuthorContextProvider id={Number(author.id)}>
      <SingleAuthorsPostsContextProvider id={Number(author.id)}>
        <Head>
          <title>{author.name}</title>
        </Head>

        <SingleAuthorsPageHeader variant="author" />
        <Grid
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AddPostDialog />
          <PaddingBox>
            <PostsList initialPosts={initialPosts} />
          </PaddingBox>
        </Grid>
      </SingleAuthorsPostsContextProvider>
    </SingleAuthorContextProvider>
  );
};

SingleAuthorPage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default SingleAuthorPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = Number(context.query?.user_id);

  const author = await fetchSingleAuthor(userId);

  const initialPosts = await fetchPostsByAuthorId(userId);

  return {
    props: {
      author,
      initialPosts,
    },
  };
};
