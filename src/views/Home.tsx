import { useEffect, useState } from "react";
import { EMPTY, IMG_BASE_URL } from "../constants";
import { iMultiSearch, iSliderCardData } from "../interfaces";
import Vertical from "../components/core/Vertical";
import { useFormatDate } from "../app/customHooks/useFormatDate";
import Slider from "../components/layout/Slider";
import { H2 } from "../components/core/Titles";
import List from "../components/layout/List";
import {
  ListAction,
  TrendingMedia,
  DiscoverSortMovie,
  DiscoverSortTv,
} from "../Enums";
import Horizontal from "../components/core/Horizontal";
import {
  useFetchDiscoverMovieQuery,
  useFetchDiscoverTvQuery,
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

function trendingRow(el:iMultiSearch) {
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
  const [sliderData, setSliderData] = useState(new Array<iSliderCardData>());
  const [TrendingRequestData, setTrendingRequestData] = useState({
    mediaType: "movie",
    timeWindow: "week",
    page: 1,
  });
  const { data: trending = EMPTY } = useFetchTrendingQuery(TrendingRequestData);
  const { data: discoverMovies = EMPTY } = useFetchDiscoverMovieQuery({
    sort_by: DiscoverSortMovie.Popularity,
  });
  const { data: discoverTv = EMPTY } = useFetchDiscoverTvQuery({
    sort_by: DiscoverSortTv.AirDate,
  });

  // Transform data from request to component props
  useEffect(() => {
    if (upcoming) {
      const upComingProps = upcoming.results.map((el) => {
        return {
          title: el.title,
          subtitle: el.vote_average,
          imgSrc: IMG_BASE_URL + el.poster_path,
        };
      });
      setSliderData(upComingProps);
    }
  }, [upcoming]);

  function handleTrendingListPageChange(currentPage: number) {
    let args = {
      mediaType: TrendingRequestData.mediaType,
      timeWindow: "week",
      page: currentPage,
    };
    setTrendingRequestData(args);
  }

  function handleTrendingListChange(activeMedia: TrendingMedia) {
    let args = {
      timeWindow: "week",
      mediaType: activeMedia === TrendingMedia.Movies ? "movie" : "tv",
      page: 1,
    };
    setTrendingRequestData(args);
  }

  return (
    <div>
      <section title="upcomming">
        <H2>Upcomming</H2>
        {sliderData.length > 0 ? (
          <Slider cardData={sliderData} width={200}></Slider>
        ) : null}
      </section>

      <Horizontal>
        <section title="Trending">
          <H2>Trending</H2>
          <List
            data={trending}
            handleListSelected={handleTrendingListChange}
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
        </section>
      </Horizontal>
    </div>
  );
}
