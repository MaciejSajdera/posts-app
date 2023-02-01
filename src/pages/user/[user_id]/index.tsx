import AddPostDialog from "@/common/components/singleAuthorsPage/AddPostDialog";
import PostsList from "@/common/components/singleAuthorsPage/PostsList";
import PaddingBox from "@/common/components/ui/PaddingBox";
import SingleAuthorsPageHeader from "@/common/components/ui/PageHeader";
import SingleAuthorContextProvider from "@/common/contexts/authors/SingleAuthor";
import SingleAuthorsPostsContextProvider from "@/common/contexts/posts/authorsPosts";
import { TPost } from "@/common/contexts/posts/types";
import { NextPageWithLayout } from "@/common/global-types/next-components";
import { useSingleAuthorQuery } from "@/common/hooks/authors";
import useSingleAuthorsPostsQuery from "@/common/hooks/posts";
import { fetchSingleAuthor } from "@/common/queries/authors";
import { fetchPostsByAuthorId } from "@/common/queries/posts";
import RootLayout from "@/layouts/root";
import { Grid } from "@mui/material";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";

const SingleAuthorPage: NextPageWithLayout = () => {
  const router = useRouter();

  const { user_id } = router.query;

  const { data: author } = useSingleAuthorQuery(Number(user_id));
  const [postToDelete, setPostToDelete] = useState<TPost>({
    id: 0,
    title: "",
    body: "",
    userId: 0,
  });

  return (
    <SingleAuthorContextProvider id={Number(user_id)}>
      <SingleAuthorsPostsContextProvider id={Number(user_id)}>
        <SingleAuthorsPageHeader variant="author" />
        <Head>
          <title>{author?.name}</title>
        </Head>
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
            <PostsList
              postToDelete={postToDelete || {}}
              setPostToDelete={setPostToDelete || {}}
            />
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
