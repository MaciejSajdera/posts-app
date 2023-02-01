import { useSingleAuthorContext } from "@/common/contexts/authors/SingleAuthor";
import { CardActionArea, CardActions } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import * as React from "react";

import Link from "@/common/components/ui/MyNextLink";
import theme from "@/styles/theme";

export type TAuthorsCard = React.HTMLAttributes<HTMLElement>;

export default function AuthorsCard({ ...props }: TAuthorsCard): JSX.Element {
  const { author: author, authorsAvatar } = useSingleAuthorContext();

  const hasImage = authorsAvatar && authorsAvatar?.url;
  const hasAlt = authorsAvatar && authorsAvatar?.alt;

  return (
    <Card {...props}>
      <Link href={`/user/${author.id}`} style={{ textDecoration: "none" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="120"
            image={hasImage ? authorsAvatar?.url : "./avatar-placeholder.png"}
            alt={hasAlt ? authorsAvatar?.alt : "alt text"}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              whiteSpace={"nowrap"}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
            >
              {author?.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {author?.username}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {author?.phone}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {author?.email}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {author?.company?.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {author?.company?.catchPhrase}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {author?.company?.bs}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardContent>
        <CardActions>
          <a
            href={`https://${author?.website}`}
            target={"_blank"}
            rel="noreferrer"
            style={{ color: theme.palette.primary.main }}
          >
            {author?.website}
          </a>
        </CardActions>
      </CardContent>
    </Card>
  );
}
