import styled from "styled-components";
import { IMG_BASE_URL } from "../../constants";
import { useFormatDate } from "../../hooks";
import { iMultiSearch } from "../../interfaces";
import Horizontal from "../core/Horizontal";
import { Image as Img } from "../core/Img";
import Vertical from "../core/Vertical";
import Text from "../core/Text";

const Row = styled.div`
  padding: 4px;
`;

const TextContainer = styled.div`
  margin-left: 12px;
`;

export function SimpleListRow(props: iMultiSearch) {


  return (
    <Row key={props.id}>
      <Horizontal color="white" key={props.id}>
        <Img
          path={IMG_BASE_URL + props.backdrop_path}
          width="200px"
          height="113px"
        />

        <TextContainer>
          <Vertical>
            <Text color="white" fontWeight="800" margin="8px 0px">
              {props.title || props.name}
            </Text>
            <Text color="white" fontWeight="800" margin="8px 0px">
            Vote Average: {props.vote_average}
            </Text>
            <Text color="white" fontWeight="800" margin="4px 0px">
              {useFormatDate(props.release_date) ||
                useFormatDate(props.first_air_date)}
            </Text>
          </Vertical>
        </TextContainer>
      </Horizontal>
    </Row>
  );
}
