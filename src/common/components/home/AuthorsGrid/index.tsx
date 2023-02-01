import SingleAuthorContextProvider from "@/common/contexts/authors/SingleAuthor";
import { Grid } from "@mui/material";
import React from "react";
import AuthorsCard from "../../ui/Cards/AuthorsCard";
import { useAllAuthorsContext } from "@/common/contexts/authors/AllAuthors";
import SingleAuthorsAvatarContextProvider from "@/common/contexts/authors/SingleAuthorAvatar";

type Props = {};

export default function AuthorsGrid({}: Props) {
  const allAuthorsContext = useAllAuthorsContext();

  return (
    <div>
      {allAuthorsContext.error ? (
        <div>Error: {allAuthorsContext.error.message}</div>
      ) : null}
      {allAuthorsContext?.authors?.length > 0 &&
      !allAuthorsContext.isLoading ? (
        <Grid
          container
          justifyContent={"center"}
          spacing={{ xs: 2, md: 4 }}
          columns={{ xs: 5, sm: 8, md: 20 }}
        >
          {allAuthorsContext.authors.map((author) =>
            author && author.id ? (
              <Grid item key={`${author.email}_${author.id}`} xs={5}>
                <SingleAuthorContextProvider id={Number(author.id)}>
                  <SingleAuthorsAvatarContextProvider id={Number(author.id)}>
                    <AuthorsCard />
                  </SingleAuthorsAvatarContextProvider>
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
    </div>
  );
}
