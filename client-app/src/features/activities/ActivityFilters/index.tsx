import { FiFilter } from "react-icons/fi";

import { Container, Filter } from "./styles";

import Calendar from "react-calendar";

export default function ActivityFilters() {
  return (
    <Container>
      <div className="content">
        <header>
          <FiFilter /> Filters
        </header>

        <div className="container-filters">
          <Filter activated>All activities</Filter>
          <Filter>I'm going</Filter>
          <Filter>I'm hosting</Filter>
        </div>
      </div>

      <Calendar />
    </Container>
  );
}
