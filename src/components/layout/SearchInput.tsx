import styled from "styled-components";
import { useEffect,useMemo, useRef, useState } from "react";
import { usePopper } from "react-popper";
import { useNavigate } from "react-router-dom";
import { IMG_BASE_URL } from "../../constants";
import Input from "../core/Input";
import { iMultiSearch, iMultiSearchResponse } from "../../interfaces";
import Vertical from "../core/Vertical";
import Horizontal from "../core/Horizontal";

const PopperRow = styled.div`
  padding: 8px;
  box-sizing: border-box;
`;

const TextLine = styled.div`
  margin-bottom: 4px;
`;

const PopperContainer = styled.div`
  border: 1px solid black;
  background: white;
  width: 500px;
  box-sizing: border-box;
  color: rebeccapurple;
  display: flex;
  flex-direction: column;
`;

const RightButton = styled.span`
  align-self: flex-end;
  margin-right: 8px;
  margin-bottom: 8px;
  cursor: pointer;
`;

const Image = styled.img`
  margin-right: 8px;
`;

interface iSearchInput {
  setSearchQuery: Function;
  searchQuery: string;
  searchResult: iMultiSearchResponse | undefined;
  isSuccess: boolean;
}

export default function SearchInput(props: iSearchInput) {
  const [showPopper, setShowPopper] = useState(false);
  const buttonRef = useRef(null);
  const popperRef = useRef(null);
  const navigate = useNavigate();
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(
    buttonRef.current,
    popperRef.current,
    {
      modifiers: [
        { name: "arrow", options: { element: arrowElement } },
        { name: "offset", options: { offset: [0, 0] } },
      ],
      placement: "bottom-start",
    }
  );

  useMemo(() => {
    setShowPopper(props.searchQuery.length > 2 && props.isSuccess);
  }, [props]);

  function renderSeeMore() {
    if (
      props.searchResult?.total_results &&
      props.searchResult.total_results > 4
    ) {
      return (
        <RightButton onClick={() => navigate("/result")}>See all</RightButton>
      );
    }
  }

  function renderResults() {
    if (props.searchResult) {
      const transformed = props.searchResult.results.slice(0, 4);

      const resp = transformed.map((el: iMultiSearch, i: number) => {
        return el.title ? (
          <PopperRow key={i}>
            <Horizontal>
              <Image src={IMG_BASE_URL + el.backdrop_path} alt="" />
              <Vertical justifyContent="center">
                <TextLine>
                  <span>Title: </span>
                  <span>{el.title}</span>
                </TextLine>
                <TextLine>
                  <span>Vote Average: </span>
                  <span>{el.vote_average}</span>
                </TextLine>
                <TextLine>
                  <span>Vote count: </span>
                  <span>{el.vote_count}</span>
                </TextLine>
              </Vertical>
            </Horizontal>
          </PopperRow>
        ) : null;
      });
      return resp;
    }
  }

  function handleClick() {
    if (props.searchResult && props.searchResult.results.length > 0) {
      setShowPopper(true);
    }
  }

  return (
    <div onBlur={() => setShowPopper(false)} onClick={handleClick}>
      <Input
        placeholder="Search for a TV show, movie or actor"
        margin="0px"
        onChange={(event) => props.setSearchQuery(event.target.value)}
        ref={buttonRef}
      />
      {showPopper ? (
        <PopperContainer
          ref={popperRef}
          style={styles.popper}
          {...attributes.popper}
        >
          {renderResults()}

          <div ref={setArrowElement} style={styles.arrow} />
          {renderSeeMore()}
        </PopperContainer>
      ) : null}
    </div>
  );
}
