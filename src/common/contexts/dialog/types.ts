import { TPost } from "../posts/types";

export type TDialogAddPostContext = {
  state: TDialogAddPostState;
  dispatch: React.Dispatch<TDialogActionAdd>;
};

export type TDialogDeletePostContext = {
  state: TDialogDeletePostState;
  dispatch: React.Dispatch<TDialogActionDelete>;
};

export type TDialogAddPostState = {
  dialogOpen: boolean;
};

export type TDialogDeletePostState = {
  dialogOpen: boolean;
};

export enum DialogActions {
  CLOSE_MODAL = "CLOSE_MODAL",
  OPEN_MODAL = "OPEN_MODAL",
}

export type TDialogActionAdd = {
  type: DialogActions;
  payload: boolean;
};

export type TDialogActionDelete = {
  type: DialogActions;
  payload: boolean;
};
