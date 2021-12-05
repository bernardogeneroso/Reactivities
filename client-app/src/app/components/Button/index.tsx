import React, { ButtonHTMLAttributes } from "react";
import Loader from "react-loader-spinner";

import { Container } from "./styles";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  situation: "positive" | "negative" | "none" | "default";
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
