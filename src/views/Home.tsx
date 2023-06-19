import { useCallback, useMemo, useState } from "react";
import {
  EMPTY,
  IMG_BASE_URL,
  SORT_DISCOVER_MOVIES,
  SORT_DISCOVER_TV,
} from "../constants";
import { iDiscoverRequest, iMultiSearchResponse } from "../interfaces";
import Slider from "../components/layout/Slider";
import { H2 } from "../components/core/Titles";
import List from "../components/layout/List";
import { DiscoverSortMovie, MediaType } from "../Enums";
import Horizontal from "../components/core/Horizontal";
import { useGetUpCommingMovies } from "../hooks/api/UpComming";
import { useGetTrending } from "../hooks/api/Trending";
import { useGetDiscover } from "../hooks/api/Discover";
import { SimpleListRow } from "../components/layout/SimpleListRow";
import AuthorizationWrapper from "../components/core/AuthorizationWrapper";
import { useAppSelector } from "../hooks";
import {useAppDispatch} from "../hooks";

export default function Home() {
  const listsActiveMediaType = useAppSelector((state) => state.activeList);
  const dispatch = useAppDispatch();
  const { data: upcoming } = useGetUpCommingMovies(1);
  const [TrendingRequestData, setTrendingRequestData] = useState({
    mediaType: listsActiveMediaType.trending,
    timeWindow: "week",
    page: 1,
  });

  const { data: trending = EMPTY, isSuccess: trendingSuccess } =
    useGetTrending(TrendingRequestData);
  const [discoverParams, setDiscoverParams] = useState<iDiscoverRequest>({
    media_type: listsActiveMediaType.discover,
    sort_by: DiscoverSortMovie.Popularity,
    page: 1,
  });
  const { data: discover = EMPTY, isSuccess: discoverSuccess } =
    useGetDiscover(discoverParams);
  const sortOptions = useMemo(() => {
    if (discoverParams.media_type === MediaType.Movies) {
      return SORT_DISCOVER_MOVIES;
    }

    if (discoverParams.media_type === MediaType.TV) {
      return SORT_DISCOVER_TV;
    }

    return [];
  }, [discoverParams.media_type]);

  const sliderData = useMemo(() => formatDataToSlider(upcoming), [upcoming]);

  function formatDataToSlider(rawData: iMultiSearchResponse = EMPTY) {
    const upComingProps = rawData.results.map((el) => {
      return {
        title: el.title,
        subtitle: el.vote_average,
        imgSrc: IMG_BASE_URL + el.poster_path,
      };
    });
    return upComingProps;
  }

  function handleTrendingListPageChange(currentPage: number) {
    let args = {
      mediaType: TrendingRequestData.mediaType,
      timeWindow: "week",
      page: currentPage,
    };
    setTrendingRequestData(args);
    if (trendingSuccess) {

    }
  }

  function handleTrendingMotionChange(activeMedia: MediaType) {
    let args = {
      timeWindow: "week",
      mediaType:
        activeMedia === MediaType.Movies ? MediaType.Movies : MediaType.TV,
      page: 1,
    };
    setTrendingRequestData(args);
  }

  function handleDiscoverMotionChange(activeMedia: MediaType) {
    let args = { ...discoverParams };
    args.media_type = activeMedia;
    args.page = 1;
    setDiscoverParams(args);
  }

  function handleDiscoverListPageChange(currentPage: number) {
    let args = { ...discoverParams };
    args.page = currentPage;
    setDiscoverParams(args);
  }

  function handleSort(selectEvent: any) {
    let args = { ...discoverParams };
    args.sort_by = selectEvent.target.value;
    args.page = 1;
    setDiscoverParams(args);
  }

  return (
    <AuthorizationWrapper>
      <div>
        <section title="upcomming">
          <H2>Upcomming</H2>
          {sliderData.length > 1 ? (
            <Slider cardData={sliderData} width={200}></Slider>
          ) : null}
        </section>

        <Horizontal>
          <section title="Trending">
            <H2>Trending</H2>
            <List
              key={"trending"}
              data={trending}
              handleActiveListChange={useCallback(
                handleTrendingMotionChange,
                []
              )}
              handlePageChange={handleTrendingListPageChange}
              rowComponent={SimpleListRow}
              radioElements={[
                { id: 0, text: "Movies" },
                { id: 1, text: "TV" },
              ]}
            />
          </section>

          <section title="Discover">
            <H2>Discover</H2>
            <List
              data={discover}
              key={"discover"}
              handleActiveListChange={useCallback(
                handleDiscoverMotionChange,
                []
              )}
              handlePageChange={handleDiscoverListPageChange}
              handleSort={handleSort}
              rowComponent={SimpleListRow}
              radioElements={[
                { id: 0, text: "Movies" },
                { id: 1, text: "TV" },
              ]}
              sortOptions={sortOptions}
            />
          </section>
        </Horizontal>
      </div>
    </AuthorizationWrapper>
  );
}
