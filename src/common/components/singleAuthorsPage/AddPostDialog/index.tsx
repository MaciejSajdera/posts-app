import { TPost } from "@/common/contexts/posts/types";
import addPost from "@/common/queries/posts";
import { Box, Button, Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import DialogMUI from "../../ui/Dialog";
import { useAddPostDialogContext } from "@/common/contexts/dialog/AddPost";
import { closeAddPostDialogAction } from "@/common/contexts/dialog/AddPost";
import {
  addPostAction,
  useSingleAuthorsPostsContext,
} from "@/common/contexts/posts/authorsPosts";
import { useSingleAuthorContext } from "@/common/contexts/authors/SingleAuthor";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";

type TAddPostDialogProps = React.HTMLAttributes<HTMLElement>;

export default function AddPostDialog({
  ...rest
}: TAddPostDialogProps): JSX.Element {
  const [submitting, setSubmitting] = useState(false);
  const { state: modalState, dispatch: dispatchDialog } =
    useAddPostDialogContext();
  const { state: postsState, dispatch: postsDispatch } =
    useSingleAuthorsPostsContext();

  const { author } = useSingleAuthorContext();

  const handleCloseDialog = (e: object) => {
    dispatchDialog(closeAddPostDialogAction(e, "backdropClick"));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TPost>();

  const onSubmit = async (data: TPost) => {
    console.log("submitting");
    setSubmitting(true);

    const res = await addPost(data);

    const postData: TPost = {
      id: postsState.length + 1,
      title: res.data.data.title,
      userId: author.id,
      body: res.data.data.body,
    };

    if (res.status === 201) {
      postsDispatch(addPostAction(postData));
      setSubmitting(false);
      dispatchDialog(closeAddPostDialogAction());
      reset();
    }
  };

  console.log(errors);

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
          <Grid item xs={4} sx={{ width: "100%" }}>
            <TextField
              id="title"
              label="Title"
              variant="outlined"
              fullWidth
              {...register("title", { required: true })}
              error={!!errors.title}
              helperText={errors.title ? "This field is required" : ""}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="body"
              label="Content"
              variant="outlined"
              multiline
              minRows={10}
              fullWidth
              {...register("body", { required: true })}
              error={!!errors.body}
              helperText={errors.body ? "This field is required" : ""}
            />
          </Grid>

          <Grid item xs={4}>
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <LoadingButton
                loading={submitting}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                color="primary"
                variant="contained"
                type="submit"
              >
                Add Post
              </LoadingButton>
              <Button
                variant="contained"
                color="error"
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
