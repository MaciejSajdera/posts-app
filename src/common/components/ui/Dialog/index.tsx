import Dialog from "@mui/material/Dialog";

export type TSimpleDialogProps = {
  open: boolean;
  maxWidth: false | "xs" | "sm" | "md" | "lg" | "xl";
  onClose: (event: object, reason: string) => void;
  children: React.ReactNode;
} & React.HtmlHTMLAttributes<HTMLDivElement>;

export default function DialogMUI(props: TSimpleDialogProps): JSX.Element {
  const { open, maxWidth, onClose, children, ...rest } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={true}
      maxWidth={maxWidth}
      PaperProps={{
        sx: {
          padding: "40px 80px",
        },
      }}
      {...rest}
    >
      {children}
    </Dialog>
  );
}
