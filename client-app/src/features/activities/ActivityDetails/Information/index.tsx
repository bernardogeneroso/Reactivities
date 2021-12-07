import { FiInfo, FiCalendar, FiMapPin } from "react-icons/fi";

import { Container } from "./styles";

export default function Information() {
  return (
    <Container>
      <div className="content">
        <FiInfo />
        Test
      </div>
      <div className="content">
        <FiCalendar />
        2021-01-10
      </div>
      <div className="content">
        <FiMapPin />
        Test,Test
      </div>
    </Container>
  );
}
