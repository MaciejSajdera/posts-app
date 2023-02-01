import React, { createContext, useContext, useReducer } from "react";
import {
  DialogActions,
  TDialogActionDelete,
  TDialogDeletePostContext,
  TDialogDeletePostState,
} from "./types";

export const initialDialogState: TDialogDeletePostState = {
  dialogOpen: false,
};

export const openDeletePostDialogAction = (): TDialogActionDelete => ({
  type: DialogActions.OPEN_MODAL,
  payload: true,
});

export const closeDeletePostDialogAction = (
  event?: object,
  reason?: string
): TDialogActionDelete => ({
  type: DialogActions.CLOSE_MODAL,
  payload: false,
});

export const DeletePostDialogContext = createContext<TDialogDeletePostContext>({
  state: initialDialogState,
  dispatch: openDeletePostDialogAction,
});

function dialogReducer(
  state: TDialogDeletePostState,
  action: TDialogActionDelete
) {
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

const DeletePostDialogContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(dialogReducer, initialDialogState);

  return (
    <DeletePostDialogContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </DeletePostDialogContext.Provider>
  );
};

export const useDeletePostDialogContext = () =>
  useContext(DeletePostDialogContext);

export default DeletePostDialogContextProvider;
