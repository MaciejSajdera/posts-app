import PostDetails from "@/common/components/singlePostPage/PostDetails";
import CommentSection from "@/common/components/singlePostPage/PostDetails/CommentSection";
import PaddingBox from "@/common/components/ui/PaddingBox";
import SingleAuthorsPageHeader from "@/common/components/ui/PageHeader";
import SingleAuthorContextProvider from "@/common/contexts/authors/SingleAuthor";
import SingleAuthorsPostsContextProvider from "@/common/contexts/posts/authorsPosts";
import { NextPageWithLayout } from "@/common/global-types/next-components";
import { useSinglePostByIdQuery } from "@/common/hooks/posts";
import RootLayout from "@/layouts/root";
import theme from "@/styles/theme";
import { Grid } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const SinglePostPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { user_id, post } = router.query;

  const { data: postData } = useSinglePostByIdQuery(Number(post));

  return (
    <SingleAuthorContextProvider id={Number(user_id)}>
      <SingleAuthorsPostsContextProvider id={Number(user_id)}>
        <Head>
          <title>{postData?.title}</title>
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
                {postData && <PostDetails post={postData} />}
              </Grid>

              <Grid item maxWidth={440}>
                {postData && <CommentSection postId={postData?.id} />}
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
