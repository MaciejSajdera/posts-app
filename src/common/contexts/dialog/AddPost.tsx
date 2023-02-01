import React, { createContext, useContext, useReducer } from "react";
import {
  DialogActions,
  TDialogActionAdd,
  TDialogAddPostContext,
  TDialogAddPostState,
} from "./types";

export const initialDialogState: TDialogAddPostState = {
  dialogOpen: false,
};

export const closeAddPostDialogAction = (
  event?: object,
  reason?: string
): TDialogActionAdd => ({
  type: DialogActions.CLOSE_MODAL,
  payload: false,
});

export const openAddPostDialogAction = (): TDialogActionAdd => ({
  type: DialogActions.OPEN_MODAL,
  payload: true,
});

export const AddPostDialogContext = createContext<TDialogAddPostContext>({
  state: initialDialogState,
  dispatch: openAddPostDialogAction,
});

function dialogReducer(state: TDialogAddPostState, action: TDialogActionAdd) {
  const { type, payload } = action;

  switch (type) {
    case DialogActions.CLOSE_MODAL: {
      return { ...state, dialogOpen: payload };
    }
    case DialogActions.OPEN_MODAL: {
      return { ...state, dialogOpen: payload };
    }
    default:
      return state;
  }
}

const AddPostDialogContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(dialogReducer, {
    ...initialDialogState,
  });

  return (
    <AddPostDialogContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AddPostDialogContext.Provider>
  );
};

export const useAddPostDialogContext = () => useContext(AddPostDialogContext);

export default AddPostDialogContextProvider;
