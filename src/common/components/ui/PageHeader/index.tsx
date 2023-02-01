import { useSingleAuthorContext } from "@/common/contexts/authors/SingleAuthor";
import theme from "@/styles/theme";
import { Box, IconButton, Typography, Button } from "@mui/material";
import Link from "next/link";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  useAddPostDialogContext,
  openAddPostDialogAction,
} from "@/common/contexts/dialog/AddPost";
import { TAuthor } from "@/common/contexts/authors/types";
import PostAddIcon from "@mui/icons-material/PostAdd";

type TPageHeader = {
  variant: "author" | "post";
} & React.HtmlHTMLAttributes<HTMLDivElement>;

function renderBackLink(
  variant: TPageHeader["variant"],
  authorId: TAuthor["id"]
) {
  switch (variant) {
    case "author":
      return "/";
    case "post":
      return `/user/${authorId}`;
    default:
      return "/";
  }
}

export default function SinglePageHeader({
  variant,
  ...rest
}: TPageHeader): JSX.Element {
  const { dispatch } = useAddPostDialogContext();
  const { author } = useSingleAuthorContext();

  return (
    <Box
      mt={theme.spacing(8)}
      mb={theme.spacing(8)}
      ml={"auto"}
      mr={"auto"}
      sx={{ maxWidth: 1200 }}
      {...rest}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          position: "relative",
        }}
      >
        <Link
          href={renderBackLink(variant, author.id)}
          style={{ textDecoration: "none", justifySelf: "flex-start" }}
        >
          <IconButton>
            <ArrowBackIcon />
          </IconButton>
        </Link>
        <Box flex={"100%"}>
          <Typography
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%) translateY(-50%)",
              top: "50%",
            }}
            lineHeight={0.8}
            variant={variant === "author" ? "h3" : "h3"}
            component={variant === "post" ? "h2" : "h1"}
            textAlign={"center"}
          >
            {author?.name}
          </Typography>
        </Box>
        {variant === "author" ? (
          <Box>
            <Button
              variant="contained"
              onClick={(e) => dispatch(openAddPostDialogAction())}
              sx={{
                borderRadius: "100%",
                width: "70px",
                height: "70px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PostAddIcon fontSize="large" />
            </Button>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
