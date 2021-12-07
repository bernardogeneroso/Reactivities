import { ButtonHTMLAttributes, ReactNode } from "react";
import Loader from "react-loader-spinner";

import { Container } from "./styles";

export type Situations =
  | "master"
  | "positive"
  | "negative"
  | "none"
  | "default";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  situation: Situations;
  loading?: boolean;
};

export default function Button({
  children,
  situation = "default",
  loading = false,
  ...props
}: ButtonProps) {
  return (
    <Container {...{ situation }} {...props}>
      {loading ? (
        <Loader type="Oval" height={16} width={50} color="#fff" />
      ) : (
        children
      )}
    </Container>
  );
}
