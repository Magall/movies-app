import { useCallback, useMemo, useState } from "react";
import { EMPTY, IMG_BASE_URL } from "../constants";
import {
  iDiscoverRequest,
  iMultiSearch,
  iMultiSearchResponse,
} from "../interfaces";
import Vertical from "../components/core/Vertical";
import { useFormatDate } from "../app/hooks/useFormatDate";
import Slider from "../components/layout/Slider";
import { H2 } from "../components/core/Titles";
import List from "../components/layout/List";
import { MediaType, DiscoverSortMovie, DiscoverSortTv } from "../Enums";
import Horizontal from "../components/core/Horizontal";
import {
  useFetchDiscoveryQuery,
  useFetchUpcomingMoviesQuery,
  useFetchTrendingQuery,
} from "../features/api.slice";
import styled from "styled-components";
import Text from "../components/core/Text";

const Row = styled.div`
  padding: 4px;
`;

const Img = styled.img`
  border-radius: 8px;
`;

const TextContainer = styled.div`
  margin-left: 12px;
`;

function trendingRow(el: iMultiSearch) {
  return (
    <Row key={el.id}>
      <Horizontal color="white" key={el.id}>
        <Img src={IMG_BASE_URL + el.backdrop_path} alt="Movie poster" />
        <TextContainer>
          <Vertical>
            <Text color="white" fontWeight="800" margin="8px 0px">
              {el.title || el.name}
            </Text>
            <Text color="white" fontWeight="800" margin="8px 0px">
              Vote average {el.vote_average}
            </Text>
            <Text color="white" fontWeight="800" margin="4px 0px">
              {useFormatDate(el.release_date) ||
                useFormatDate(el.first_air_date)}
            </Text>
          </Vertical>
        </TextContainer>
      </Horizontal>
    </Row>
  );
}

export default function Home() {
  const { data: upcoming } = useFetchUpcomingMoviesQuery(1);
  const [TrendingRequestData, setTrendingRequestData] = useState({
    mediaType: "movie",
    timeWindow: "week",
    page: 1,
  });
  const { data: trending = EMPTY } = useFetchTrendingQuery(TrendingRequestData);
  const [discoverParams, setDiscoverParams] = useState<iDiscoverRequest>({
    media_type: MediaType.Movies,
    sort_by: DiscoverSortMovie.Popularity,
    page: 1,
  });
  const { data: discover = EMPTY } = useFetchDiscoveryQuery(discoverParams);

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
  const sliderData = useMemo(() => formatDataToSlider(upcoming), [upcoming]);

  function handleTrendingListPageChange(currentPage: number) {
    let args = {
      mediaType: TrendingRequestData.mediaType,
      timeWindow: "week",
      page: currentPage,
    };
    setTrendingRequestData(args);
  }

  function handleTrendingListChange(activeMedia: MediaType) {
    let args = {
      timeWindow: "week",
      mediaType: activeMedia === MediaType.Movies ? "movie" : "tv",
      page: 1,
    };
    setTrendingRequestData(args);
  }

  function handleDiscoverListChange(activeMedia: MediaType) {
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

  return (
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
            data={trending}
            handleListSelected={useCallback(handleTrendingListChange, [])}
            handlePageChange={handleTrendingListPageChange}
            rowComponent={trendingRow}
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
            handleListSelected={useCallback(handleDiscoverListChange, [])}
            handlePageChange={handleDiscoverListPageChange}
            rowComponent={trendingRow}
            radioElements={[
              { id: 0, text: "Movies" },
              { id: 1, text: "TV" },
            ]}
          />
        </section>
      </Horizontal>
    </div>
  );
}
