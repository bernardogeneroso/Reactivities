import { TextareaHTMLAttributes } from "react";
import { useField } from "formik";

import { Container } from "./styles";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  placeholder: string;
  label?: string;
}

export default function Textarea(props: TextareaProps) {
  const [field, meta] = useField(props.name);

  return (
    <Container error={meta.touched && !!meta.error}>
      <label htmlFor="">{props.label}</label>
      <textarea {...field} {...props} />
      {meta.touched && meta.error ? <span>{meta.error}</span> : null}
    </Container>
  );
}
