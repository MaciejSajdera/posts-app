import React, { createContext, useContext, useReducer } from "react";
import {
  PostActions,
  TPost,
  TPostAction,
  TSingleAuthorsPostsContext,
} from "./types";

const initialAuthorsPosts: TPost[] = [];

export function setPostsAction<T>(data: T) {
  return {
    type: PostActions.SET_POSTS,
    payload: data,
  };
}

export function addPostAction<T>(data: T) {
  return {
    type: PostActions.ADD_POST,
    payload: data,
  };
}

export function deletePostAction<T>(data: T) {
  return {
    type: PostActions.DELETE_POST,
    payload: data,
  };
}

export function postsReducer(state: TPost[], action: TPostAction) {
  const { type, payload } = action;

  if (payload instanceof Array) {
    return payload;
  } else {
    switch (type) {
      case PostActions.ADD_POST: {
        return [...state, payload];
      }

      case PostActions.DELETE_POST: {
        const updatedArray = state.filter((post) => post.id !== payload.id);
        console.log(updatedArray);
        return state.filter((post) => post.id !== payload.id);
      }

      default:
        return state;
    }
  }
}

export const SingleAuthorsPostsData = createContext<TSingleAuthorsPostsContext>(
  {
    state: initialAuthorsPosts,
    dispatch: setPostsAction,
  }
);

/* TODO: Persist posts state in localStorage/cookie */

// const StoredPostsContext = createContext<TPost[]>([]);
// const SetStoredPostsContext = createContext<
//   React.Dispatch<React.SetStateAction<TPost[]>>
// >((value) => {
//   console.log("default function:", value);
// });

// export function useStoredPostsContext() {
//   return useContext(StoredPostsContext);
// }

// export function useSetStoredPostsContext() {
//   return useContext(SetStoredPostsContext);
// }

// export function StoredPostsContextProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [storedPosts, setStoredPosts] = usePostsStorage();

//   return (
//     <StoredPostsContext.Provider value={storedPosts}>
//       <SetStoredPostsContext.Provider value={setStoredPosts}>
//         {children}
//       </SetStoredPostsContext.Provider>
//     </StoredPostsContext.Provider>
//   );
// }

const SingleAuthorsPostsContextProvider = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: number;
}) => {
  const [state, dispatch] = useReducer(postsReducer, initialAuthorsPosts);
  //   const [posts, setPosts] = usePostsStorage();

  return (
    <SingleAuthorsPostsData.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </SingleAuthorsPostsData.Provider>
  );
};

export const useSingleAuthorsPostsContext = () =>
  useContext(SingleAuthorsPostsData);

export default SingleAuthorsPostsContextProvider;
