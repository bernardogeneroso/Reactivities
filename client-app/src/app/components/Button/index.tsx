import React, { ButtonHTMLAttributes } from "react";

import { Container } from "./styles";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  situation: "positive" | "negative" | "none" | "default";
};

export default function Button({
  children,
  situation = "default",
  ...props
}: ButtonProps) {
  return (
    <Container {...{ situation }} {...props}>
      {children}
    </Container>
  );
}
