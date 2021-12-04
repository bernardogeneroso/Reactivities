import React, { ButtonHTMLAttributes } from "react";

import { Container } from "./styles";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  positive?: boolean;
};

export default function Button({ children, positive, ...props }: ButtonProps) {
  const bgColor = positive ? "#198754" : "#f94d6a";

  return (
    <Container {...{ bgColor }} {...props}>
      {children}
    </Container>
  );
}
