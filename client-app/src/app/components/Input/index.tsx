import { InputHTMLAttributes } from "react";
import { useField } from "formik";

import { Container } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder: string;
  label?: string;
}

export default function Input(props: InputProps) {
  const [field, meta] = useField(props.name);

  return (
    <Container error={meta.touched && !!meta.error}>
      <label htmlFor="">{props.label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? <span>{meta.error}</span> : null}
    </Container>
  );
}
