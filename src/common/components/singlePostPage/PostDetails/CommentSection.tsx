import { TPost } from "@/common/contexts/posts/types";
import { usePostsCommentsQuery } from "@/common/hooks/posts";
import { capitalizeFirstLetter } from "@/common/utils/helpers";
import theme from "@/styles/theme";
import { List, ListItem, Grid, Typography, Box, Button } from "@mui/material";
import React, { useState } from "react";
import { Divider } from "@mui/material";

type Props = {
  postId: TPost["id"];
};

export default function CommentSection({ postId, ...rest }: Props) {
  const [showComments, setShowComments] = useState(false);
  const {
    data: listItems,
    error,
    isLoading,
  } = usePostsCommentsQuery(postId, { enabled: !!showComments });

  return (
    <Box sx={{ height: "100%" }}>
      <Box
        mb={theme.spacing(4)}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Button
          variant={"contained"}
          color={showComments ? "error" : "info"}
          onClick={() => setShowComments((prev) => !prev)}
        >
          {showComments ? "Hide comments" : "Show comments"}
        </Button>
      </Box>

      <Grid container>
        <Grid item>
          {error && <div>{error.message}</div>}
          {listItems && listItems?.length === 0 && <div>No comments yet</div>}
          {listItems && listItems?.length > 0 && showComments ? (
            <List
              {...rest}
              dense
              sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}
            >
              {listItems?.map((item, i) => {
                return (
                  <div key={`list-item-${item.id}`}>
                    <Divider />
                    <ListItem>
                      <Grid container>
                        <Grid
                          mb={theme.spacing(2)}
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                          }}
                        >
                          <Grid item xs={12}>
                            <Typography
                              variant="body1"
                              component="h5"
                              lineHeight={1.2}
                              textTransform={"capitalize"}
                            >
                              {item.name}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography
                              variant="body1"
                              component="p"
                              lineHeight={1.2}
                              textTransform={"lowercase"}
                              textAlign={"right"}
                            >
                              {item.email}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid
                          sx={{ display: "flex", alignItems: "flex-start" }}
                        >
                          <Grid item xs={12}>
                            <Typography
                              variant="body1"
                              component="p"
                              lineHeight={1.2}
                            >
                              {item.body}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </ListItem>
                  </div>
                );
              })}
            </List>
          ) : null}
        </Grid>
      </Grid>
    </Box>
  );

  return <></>;
}
