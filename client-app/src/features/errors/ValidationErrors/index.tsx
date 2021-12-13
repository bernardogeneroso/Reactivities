import { Message } from "semantic-ui-react";

interface ValidationErrorsProps {
  errors: string[];
}

export default function ValidationErrors({ errors }: ValidationErrorsProps) {
  return (
    <Message error>
      <Message.List>
        {errors.map((error) => (
          <Message.Item key={error}>{error}</Message.Item>
        ))}
      </Message.List>
    </Message>
  );
}
