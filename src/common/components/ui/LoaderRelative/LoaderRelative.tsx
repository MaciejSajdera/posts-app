import { Box, CircularProgress, useTheme } from "@mui/material";

const LoaderRelative = () => {
  const theme = useTheme();

  return (
    <Box
      className={"absolute flex items-center content-center"}
      sx={{
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",

        zIndex: 2,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoaderRelative;
