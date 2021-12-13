import { InputHTMLAttributes } from "react";
import { Select } from "semantic-ui-react";
import { useField } from "formik";

import { Container } from "./styles";

interface SelectInputProps extends InputHTMLAttributes<HTMLSelectElement> {
  name: string;
  placeholder: string;
  options: any;
  label?: string;
}

export default function SelectInput(props: SelectInputProps) {
  const [field, meta, helpers] = useField(props.name);

  return (
    <Container error={meta.touched && !!meta.error}>
      <label htmlFor="">{props.label}</label>
      <Select
        clearable
        options={props.options}
        value={field.value || null}
        onChange={(e, d) => helpers.setValue(d.value)}
        onBlur={() => helpers.setTouched(true)}
        placeholder={props.placeholder}
      />
      {meta.touched && meta.error ? <span>{meta.error}</span> : null}
    </Container>
  );
}
