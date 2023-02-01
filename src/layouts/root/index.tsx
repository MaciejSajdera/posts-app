import AddPostDialogContextProvider from "@/common/contexts/dialog/AddPost";
import theme from "@/styles/theme";
import { Box } from "@mui/material";
import Head from "next/head";
import { LayoutProps } from "../types";
import DeletePostDialogContextProvider from "@/common/contexts/dialog/DeletePost";

export default function RootLayout({
  title,
  description,
  children,
}: LayoutProps) {
  return (
    <>
      <Head>
        <Head>
          <meta name="theme-color" content={theme.palette.primary.light} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <AddPostDialogContextProvider>
        <DeletePostDialogContextProvider>
          <Box
            mt={6}
            component={"main"}
            maxWidth={"lg"}
            minHeight={"100vh"}
            margin={"auto"}
            paddingY={theme.spacing(2)}
          >
            <Box sx={{ width: "100%", height: "auto" }}>{children}</Box>
          </Box>
        </DeletePostDialogContextProvider>
      </AddPostDialogContextProvider>
    </>
  );
}
