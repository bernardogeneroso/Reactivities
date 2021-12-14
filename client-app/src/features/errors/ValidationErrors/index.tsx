import { Message } from "semantic-ui-react";

interface ValidationErrorsProps {
  errors: any;
}

export default function ValidationErrors({ errors }: ValidationErrorsProps) {
  return (
    <Message error>
      <Message.List>
        {errors.map((error: any, i: any) => (
          <Message.Item key={i}>{error}</Message.Item>
        ))}
      </Message.List>
    </Message>
  );
}
