import {
  closeDeletePostDialogAction,
  useDeletePostDialogContext,
} from "@/common/contexts/dialog/DeletePost";
import { TPost } from "@/common/contexts/posts/types";
import { deletePost, fetchSinglePostById } from "@/common/queries/posts";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import DialogMUI from "../../ui/Dialog";
import SaveIcon from "@mui/icons-material/Save";

import {
  deletePostAction,
  useSingleAuthorsPostsContext,
} from "@/common/contexts/posts/authorsPosts";
import theme from "@/styles/theme";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { capitalizeFirstLetter } from "@/common/utils/helpers";

type TDeletePostDialogProps = {
  postToDelete: TPost;
} & React.HTMLAttributes<HTMLElement>;

export default function DeletePostDialog({
  postToDelete,
  ...rest
}: TDeletePostDialogProps): JSX.Element {
  const [submitting, setSubmitting] = useState(false);
  const { state: modalState, dispatch: dispatchDialog } =
    useDeletePostDialogContext();
  const { dispatch: postsDispatch } = useSingleAuthorsPostsContext();

  const handleCloseDialog = (e: object) => {
    dispatchDialog(closeDeletePostDialogAction(e, "backdropClick"));
  };

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async () => {
    console.log("submitting");
    setSubmitting(true);

    const res = await deletePost(postToDelete);

    if (res.status === 200) {
      postsDispatch(deletePostAction(postToDelete));
      setSubmitting(false);
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
                mb={theme.spacing(2)}
                variant="h5"
                component="p"
                sx={{ fontWeight: "bold" }}
              >
                Are you sure you want to delete this post?
              </Typography>
              <Typography
                variant="h6"
                component="p"
                sx={{ fontWeight: "bold" }}
              >
                {capitalizeFirstLetter(postToDelete?.title)}
              </Typography>
            </Grid>
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <LoadingButton
                loading={submitting}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                color="error"
                type="submit"
              >
                Remove
              </LoadingButton>
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
