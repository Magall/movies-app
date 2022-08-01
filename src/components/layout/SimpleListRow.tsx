import styled from "styled-components";
import { IMG_BASE_URL } from "../../constants";
import { useFormatDate } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { iMultiSearch } from "../../interfaces";
import Horizontal from "../core/Horizontal";
import { Image as Img } from "../core/Img";
import Vertical from "../core/Vertical";
import Text from "../core/Text";
import { useMemo } from "react";
import { MediaType } from "../../Enums";

const Row = styled.div`
  padding: 4px;
  cursor: pointer;
`;

const TextContainer = styled.div`
  margin-left: 12px;
`;

interface iSimpleRow {
  data: iMultiSearch;
}

export function SimpleListRow(props: iSimpleRow) {
  const navigate = useNavigate();
  const mediaType = useMemo(() => {
    return props.data.release_date ? MediaType.Movies : MediaType.TV;
  }, [props.data.release_date]);

  function handleNavigate() {
    navigate(`/${mediaType}/${props.data.id}`);
  }

  return (
    <Row key={props.data.id + mediaType} onClick={handleNavigate}>
      <Horizontal color="white" key={props.data.id}>
        <Img
          path={IMG_BASE_URL + props.data.backdrop_path}
          width="200px"
          height="113px"
        />

        <TextContainer>
          <Vertical>
            <Text color="white" fontWeight="800" margin="8px 0px">
              {props.data.title || props.data.name}
            </Text>
            <Text color="white" fontWeight="800" margin="8px 0px">
              Vote Average: {props.data.vote_average}
            </Text>
            <Text color="white" fontWeight="800" margin="4px 0px">
              {useFormatDate(props.data.release_date) ||
                useFormatDate(props.data.first_air_date)}
            </Text>
          </Vertical>
        </TextContainer>
      </Horizontal>
    </Row>
  );
}
