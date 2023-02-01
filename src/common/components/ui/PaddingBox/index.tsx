import theme from "@/styles/theme";
import { Box } from "@mui/material";
import React from "react";

type Props = {
  children: React.ReactNode;
} & React.HtmlHTMLAttributes<HTMLDivElement>;

export default function PaddingBox({ children, ...rest }: Props): JSX.Element {
  return (
    <Box
      {...rest}
      sx={{
        width: "100%",
        padding: "4rem 5%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </Box>
  );
}
