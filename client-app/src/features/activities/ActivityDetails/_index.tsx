import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import Loading from "../../../app/components/Loading";
import useStore from "../../../app/stores/useStore";

import { Container } from "./styles";

interface ActivityDetailsParams {
  id: string;
}

export default observer(function ActivityDetails() {
  const { activityStore } = useStore();
  const {
    selectedActivity: activity,
    loadActivity,
    loadingInitial,
  } = activityStore;
  const { id } = useParams<ActivityDetailsParams>();

  useEffect(() => {
    if (id) loadActivity(id);
  }, [id, loadActivity]);

  if (loadingInitial || !activity) return <Loading />;

  return (
    <Container>
      <img
        src={`/assets/categoryImages/${activity.category}.jpg`}
        alt={activity.category}
      />

      <div className="content">
        <h3>{activity.title}</h3>
        <span className="date">{activity.date}</span>

        <span className="releaseDate">{activity.description}</span>
      </div>

      <div className="footer">
        <Link to={`/manage/${activity.id}`}>
          <button>Edit</button>
        </Link>
        <Link to={`/activities`}>
          <button>Cancel</button>
        </Link>
      </div>
    </Container>
  );
});
