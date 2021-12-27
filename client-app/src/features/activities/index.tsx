import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Loader } from "semantic-ui-react";

import useStore from "../../app/stores/useStore";
import { PagingParams } from "../../app/models/pagination";

import ActivityListItemPlaceholder from "./ActivityListItemPlaceholder";
import ActivityList from "./ActivityList";
import ActivityFilters from "./ActivityFilters";

import { Container } from "./styles";

export default observer(function ActivityDashboard() {
  const { activityStore } = useStore();
  const {
    loadActivities,
    loadingInitial,
    activitiesRegister,
    setPagingParams,
    pagination,
  } = activityStore;

  const [loadingNext, setLoadingNext] = useState(false);

  useEffect(() => {
    if (activitiesRegister.size <= 1) loadActivities();
  }, [loadActivities, activitiesRegister.size]);

  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadActivities().then(() => setLoadingNext(false));
  }

  return (
    <Container>
      {loadingInitial && !loadingNext ? (
        <div
          style={{
            gridArea: "activityList",
          }}
        >
          <ActivityListItemPlaceholder />
          <ActivityListItemPlaceholder />
        </div>
      ) : (
        <div
          style={{
            gridArea: "activityList",
          }}
        >
          <InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={
              !loadingNext &&
              !!pagination &&
              pagination.currentPage < pagination.totalPages
            }
            initialLoad={false}
          >
            <ActivityList />
          </InfiniteScroll>

          <Loader active={loadingNext && !loadingInitial} />
        </div>
      )}

      <ActivityFilters />
    </Container>
  );
});
