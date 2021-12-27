import { observer } from "mobx-react-lite";
import Calendar from "react-calendar";
import { FiFilter } from "react-icons/fi";

import useStore from "../../../app/stores/useStore";

import { Container, Filter } from "./styles";

export default observer(function ActivityFilters() {
  const { activityStore } = useStore();
  const { predicate, setPredicate } = activityStore;

  return (
    <Container>
      <div className="content">
        <header>
          <FiFilter /> Filters
        </header>

        <div className="container-filters">
          <Filter
            activated={!!predicate.has("all")}
            onClick={() => setPredicate("all", "true")}
          >
            All activities
          </Filter>
          <Filter
            activated={predicate.has("isGoing")}
            onClick={() => setPredicate("isGoing", "true")}
          >
            I'm going
          </Filter>
          <Filter
            activated={predicate.has("isHost")}
            onClick={() => setPredicate("isHost", "true")}
          >
            I'm hosting
          </Filter>
        </div>
      </div>

      <Calendar
        onChange={(date: any) => setPredicate("startDate", date)}
        value={predicate.get("startDate") || new Date()}
      />
    </Container>
  );
});
