import { useSingleAuthorContext } from "@/common/contexts/authors/SingleAuthor";
import {
  setPostsAction,
  useSingleAuthorsPostsContext,
} from "@/common/contexts/posts/authorsPosts";
import { TPost } from "@/common/contexts/posts/types";
import {
  Box,
  Button,
  Divider,
  Grid,
  ListItem,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import MyNextLink from "../../ui/MyNextLink";
import { baseUrl } from "@/common/lib/constans";
import { capitalizeFirstLetter } from "@/common/utils/helpers";
import theme from "@/styles/theme";
import DeletePostDialog from "../DeletePostDialog";
import {
  openDeletePostDialogAction,
  useDeletePostDialogContext,
} from "@/common/contexts/dialog/DeletePost";

export type TPostListProps = {
  initialPosts: TPost[];
  postToDelete: TPost;
  setPostToDelete: React.Dispatch<React.SetStateAction<TPost>>;
} & React.HtmlHTMLAttributes<HTMLDivElement>;

export default function PostsList({
  initialPosts,
  postToDelete,
  setPostToDelete,
  ...rest
}: TPostListProps): JSX.Element {
  const { state: modalState, dispatch: dispatchDialog } =
    useDeletePostDialogContext();
  const { state: postsState, dispatch: dispatchPosts } =
    useSingleAuthorsPostsContext();

  const { isLoading: isAuthorLoading, author } = useSingleAuthorContext();

  const setInitialPosts = useCallback(() => {
    if (initialPosts) {
      dispatchPosts(setPostsAction(initialPosts));
    }
  }, [initialPosts, dispatchPosts]);

  useEffect(() => {
    setInitialPosts();
  }, [setInitialPosts]);

  if (isAuthorLoading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (postsState.length === 0) {
    return <Typography variant="h6">No posts yet</Typography>;
  }

  if (postsState.length > 0) {
    return (
      <Box {...rest}>
        {<DeletePostDialog postToDelete={postToDelete} />}

        {postsState?.map((post, i) => (
          <div key={`posts-list-item-${post.id}`}>
            <Divider />
            <ListItem sx={{ padding: theme.spacing(2) }}>
              <Grid
                container
                gap={theme.spacing(4)}
                item
                key={`${post?.title}_${i}`}
              >
                <Grid item>
                  <Button
                    variant="contained"
                    color="error"
                    type="button"
                    onClick={(e) => {
                      dispatchDialog(openDeletePostDialogAction());
                      setPostToDelete(post);
                    }}
                  >
                    Delete
                  </Button>
                </Grid>
                <Grid item>
                  <MyNextLink href={`${baseUrl}/user/${author.id}/${post.id}`}>
                    <Typography variant="h6" component="h2">
                      {capitalizeFirstLetter(
                        post?.title?.substring(0, 50).trim()
                      )}
                    </Typography>
                  </MyNextLink>
                </Grid>
              </Grid>
            </ListItem>
          </div>
        ))}
      </Box>
    );
  }

  return <></>;
}
