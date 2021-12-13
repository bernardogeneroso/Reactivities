import { useField } from "formik";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";

import { Container } from "./styles";

export default function DateInput(props: Partial<ReactDatePickerProps>) {
  const [field, meta, helpers] = useField(props.name!);

  return (
    <Container error={meta.touched && !!meta.error}>
      <DatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(date: Date) => helpers.setValue(date)}
      />
      {meta.touched && meta.error ? <span>{meta.error}</span> : null}
    </Container>
  );
}
