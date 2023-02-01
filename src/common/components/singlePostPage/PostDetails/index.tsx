import { useSingleAuthorContext } from "@/common/contexts/authors/SingleAuthor";
import { useSingleAuthorsPostsContext } from "@/common/contexts/posts/authorsPosts";
import { TPost } from "@/common/contexts/posts/types";
import { capitalizeFirstLetter } from "@/common/utils/helpers";
import { Grid, Typography } from "@mui/material";
import React from "react";

type Props = {
  post: TPost;
} & React.HTMLAttributes<HTMLDivElement>;

export default function PostDetails({ post }: Props): JSX.Element {
  return (
    <Grid
      container
      width={"100%"}
      justifyContent={"center"}
      gap={4}
      flexDirection="column"
    >
      <Grid item>
        <Typography
          textAlign={"center"}
          variant="h4"
          component="h1"
          gutterBottom
          fontWeight={"bold"}
        >
          {capitalizeFirstLetter(post?.title)}
        </Typography>
      </Grid>
      <Grid item>
        <Typography textAlign={"left"} variant="h5" component="p" gutterBottom>
          {capitalizeFirstLetter(post?.body)}
        </Typography>
      </Grid>
    </Grid>
  );
}
