import styled from "styled-components";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePopper } from "react-popper";
import { useNavigate } from "react-router-dom";
import { GOLD } from "../../constants";
import Input from "../core/Input";
import { iMultiSearch, iMultiSearchResponse } from "../../interfaces";
import { SimpleListRow } from "./SimpleListRow";

const PopperContainer = styled.div<any>`
  border: 1px solid black;
  background: #8c8888;
  width: 500px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 1px solid ${GOLD};
  z-index: 5;
  margin-top: 4px;
`;

const RightButton = styled.span`
  align-self: flex-end;
  margin-right: 8px;
  margin-bottom: 8px;
  cursor: pointer;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 2;
  overflow: hidden;
`;

interface iSearchInput {
  setSearchQuery: Function;
  searchQuery: string;
  searchResult: iMultiSearchResponse | undefined;
  isSuccess: boolean;
}

export default function SearchInput(props: iSearchInput) {
  const [showPopper, setShowPopper] = useState(false);
  const [focus, setFocus] = useState(true);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const buttonRef = useRef(null);
  const popperRef = useRef(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    setShowPopper(props.searchQuery.length > 2 && props.isSuccess && focus);
  }, [props.searchQuery, props.isSuccess, focus]);

  function handleSeeMoreClick() {
    setFocus(false);
    navigate("/results");
  }

  function renderSeeMore() {
    if (
      props.searchResult?.total_results &&
      props.searchResult.total_results > 4
    ) {
      return (
        <RightButton onClick={() => handleSeeMoreClick()}>See all</RightButton>
      );
    }
  }

  function renderResults() {
    if (props.searchResult) {
      const recordsToShow = props.searchResult.results.slice(0, 4);
      const resp = recordsToShow.map((el: iMultiSearch, i: number) => {
        return <SimpleListRow data={el} />
      });
      return resp;
    }
  }

  return (
    <div>
      <Input
        placeholder="Search for a TV show, movie or actor"
        margin="0px"
        onChange={(event) => props.setSearchQuery(event.target.value)}
        ref={buttonRef}
        onClick={() => setFocus(true)}
      />
      {showPopper && <Overlay onClick={() => setFocus(false)} />}
      {showPopper && (
        <div>
          <PopperContainer
            ref={popperRef}
            style={styles.popper}
            {...attributes.popper}
          >
            {renderResults()}

            <div ref={setArrowElement} style={styles.arrow} />
            {renderSeeMore()}
          </PopperContainer>
        </div>
      )}
    </div>
  );
}
