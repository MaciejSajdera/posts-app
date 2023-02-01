import { AppPropsWithLayout } from "@/common/global-types/next-components";
import "@/styles/globals.css";
import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/styles/theme";
import AllAuthorsContextProvider from "@/common/contexts/authors/AllAuthors";

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient());

  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <QueryClientProvider client={queryClient}>
      <AllAuthorsContextProvider>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </AllAuthorsContextProvider>
    </QueryClientProvider>
  );
}
