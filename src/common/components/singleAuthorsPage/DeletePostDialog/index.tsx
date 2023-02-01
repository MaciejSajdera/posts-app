import {
  closeDeletePostDialogAction,
  useDeletePostDialogContext,
} from "@/common/contexts/dialog/DeletePost";
import { TPost } from "@/common/contexts/posts/types";
import { deletePost, fetchPostById } from "@/common/queries/posts";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import DialogMUI from "../../ui/Dialog";

import { useSingleAuthorContext } from "@/common/contexts/authors/SingleAuthor";
import {
  deletePostAction,
  useSingleAuthorsPostsContext,
} from "@/common/contexts/posts/authorsPosts";
import theme from "@/styles/theme";

type TDeletePostDialogProps = {
  postToDelete: TPost;
} & React.HTMLAttributes<HTMLElement>;

export default function DeletePostDialog({
  postToDelete,
  ...rest
}: TDeletePostDialogProps): JSX.Element {
  const { state: modalState, dispatch: dispatchDialog } =
    useDeletePostDialogContext();
  const { dispatch: postsDispatch } = useSingleAuthorsPostsContext();
  const { author } = useSingleAuthorContext();

  const handleCloseDialog = (e: object) => {
    dispatchDialog(closeDeletePostDialogAction(e, "backdropClick"));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async () => {
    console.log("submitting");

    const res = await deletePost(postToDelete);

    if (res.status === 200) {
      postsDispatch(deletePostAction(postToDelete));
      dispatchDialog(closeDeletePostDialogAction());
      reset();
    }
  };

  return (
    <DialogMUI
      open={modalState.dialogOpen}
      onClose={(e) => handleCloseDialog(e)}
      maxWidth={"md"}
      {...rest}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          rowSpacing={4}
          direction="column"
          columns={1}
          sx={{ display: "flex" }}
        >
          <Grid item xs={4}>
            <Grid item mb={theme.spacing(4)}>
              <Typography
                variant="h6"
                component="p"
                sx={{ fontWeight: "bold" }}
              >
                Are you sure you want to delete this post: {postToDelete?.title}
                ?
              </Typography>
            </Grid>
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Button variant="contained" color="error" type="submit">
                Remove
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={(e) => handleCloseDialog(e)}
              >
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </DialogMUI>
  );
}
