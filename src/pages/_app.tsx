import { AppPropsWithLayout } from "@/common/global-types/next-components";
import "@/styles/globals.css";
import theme from "@/styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient());

  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
