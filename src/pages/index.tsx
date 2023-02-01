import AuthorsCard from "@/common/components/ui/Cards/AuthorsCard";
import PaddingBox from "@/common/components/ui/PaddingBox";
import { useAllAuthorsContext } from "@/common/contexts/authors/AllAuthors";
import SingleAuthorContextProvider from "@/common/contexts/authors/SingleAuthor";
import { NextPageWithLayout } from "@/common/global-types/next-components";
import RootLayout from "@/layouts/root";
import { Box, Grid, Typography } from "@mui/material";
import { ReactElement } from "react";

const title = "Home";
const description = "Authors Grid";

const Home: NextPageWithLayout = () => {
  const allAuthorsContext = useAllAuthorsContext();

  return (
    <PaddingBox>
      {allAuthorsContext.isLoading ? <Typography>Loading...</Typography> : null}
      {allAuthorsContext.error ? (
        <div>Error: {allAuthorsContext.error.message}</div>
      ) : null}
      {allAuthorsContext?.authors?.length > 0 ? (
        <Grid
          container
          spacing={{ xs: 2, md: 4 }}
          columns={{ xs: 4, sm: 8, md: 16 }}
        >
          {allAuthorsContext.authors.map((author) =>
            author && author.id ? (
              <Grid item key={`${author.email}_${author.id}`} xs={4}>
                <SingleAuthorContextProvider id={Number(author.id)}>
                  <AuthorsCard />
                </SingleAuthorContextProvider>
              </Grid>
            ) : null
          )}
        </Grid>
      ) : null}
      {!allAuthorsContext?.isLoading &&
      allAuthorsContext?.authors?.length === 0 ? (
        <div>No authors found</div>
      ) : null}
    </PaddingBox>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <RootLayout title={title} description={description}>
      {page}
    </RootLayout>
  );
};

export default Home;
