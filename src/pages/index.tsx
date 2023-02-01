import AuthorsGrid from "@/common/components/home/AuthorsGrid";
import AuthorsCard from "@/common/components/ui/Cards/AuthorsCard";
import PaddingBox from "@/common/components/ui/PaddingBox";
import AllAuthorsContextProvider, {
  useAllAuthorsContext,
} from "@/common/contexts/authors/AllAuthors";
import SingleAuthorContextProvider from "@/common/contexts/authors/SingleAuthor";
import { NextPageWithLayout } from "@/common/global-types/next-components";
import RootLayout from "@/layouts/root";
import { Grid } from "@mui/material";
import { ReactElement } from "react";

const title = "Home";
const description = "Authors Grid";

const Home: NextPageWithLayout = () => {
  return (
    <PaddingBox>
      <AllAuthorsContextProvider>
        <AuthorsGrid />
      </AllAuthorsContextProvider>
    </PaddingBox>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <RootLayout title={title} description={description}>
      {page}
    </RootLayout>
  );
};

export default Home;
