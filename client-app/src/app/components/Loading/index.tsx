import { Dimmer, Loader } from "semantic-ui-react";

interface LoadingProp {
  inverted?: boolean;
  content?: string;
}

export default function Loading({
  inverted = true,
  content = "Loading...",
}: LoadingProp) {
  return (
    <Dimmer active={true} inverted={inverted}>
      <Loader content={content} />
    </Dimmer>
  );
}
