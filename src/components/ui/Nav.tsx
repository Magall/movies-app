import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchInput from "../layout/SearchInput";
import { useLazyFetchMoviesQuery } from "../../features/api";

const TopBar = styled.div`
  background: linear-gradient(#471f38, #b10240);
  color: white;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.span`
  font-family: Budmo Jiggler;
  color: gold;
  font-size: 40px;
`;

const Subtitle = styled.span`
  font-weight: 600;
  font-size: 16px;
  color: gold;
`;

export default function Nav() {
  const [movieQuery, setMovieQuery] = useState("");
  const [trigger, { data, isSuccess }] = useLazyFetchMoviesQuery();

  useEffect(() => {
    if (movieQuery.length > 2) {
      trigger(movieQuery);
    }
  },[movieQuery]);
  
  return (
    <div>
      <TopBar>
        <Title>Movies World</Title>
    
        <Subtitle>My Lists</Subtitle>
        <Subtitle>Exit</Subtitle>

        <SearchInput
          setSearchQuery={setMovieQuery}
          isSuccess={isSuccess}
          searchQuery={movieQuery}
          searchResult={data}
        />
      </TopBar>
    </div>
  );
}
// red b10240
// dark purple 471f38
