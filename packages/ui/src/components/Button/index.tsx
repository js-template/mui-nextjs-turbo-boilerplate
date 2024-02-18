import { Button as MuiButton } from "@mui/material";

// mui button props
type MuiButtonProps = {
  children: React.ReactNode;
} & React.ComponentProps<typeof MuiButton>;

export const Button = (props: MuiButtonProps) => {
  return <MuiButton {...props}>{props.children}</MuiButton>;
};
