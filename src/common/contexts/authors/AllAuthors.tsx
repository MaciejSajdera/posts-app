import React, { createContext, useContext } from "react";
import { useAllAuthorsQuery } from "../../hooks/authors";
import { TAuthor, TAllAuthorsContext } from "./types";

const initialAuthors: TAuthor[] = [];

export const AllAuthorsData = createContext<TAllAuthorsContext>({
  authors: initialAuthors,
  isLoading: false,
  error: null,
});

const AllAuthorsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isLoading, error, data: authors = [] } = useAllAuthorsQuery(8);

  return (
    <AllAuthorsData.Provider value={{ authors, isLoading, error }}>
      {children}
    </AllAuthorsData.Provider>
  );
};

export const useAllAuthorsContext = () => useContext(AllAuthorsData);

export default AllAuthorsContextProvider;
